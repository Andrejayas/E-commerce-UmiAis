# Technical Design Document

## 1. System Architecture Overview

### 1.1 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with custom theme
- **Database**: PostgreSQL (Vercel Postgres or Supabase)
- **ORM**: Prisma or Drizzle ORM
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Password Hashing**: bcrypt
- **Form Validation**: Zod + React Hook Form
- **State Management**: React Context + Server Actions
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel

### 1.2 Architecture Patterns

- **Server-Side Rendering (SSR)**: Product pages, cart, checkout for SEO and performance
- **Server Components**: Default for data fetching and static content
- **Client Components**: Interactive elements (cart, forms, toggles)
- **API Routes**: RESTful endpoints for client-side operations
- **Server Actions**: Direct database mutations from forms

---

## 2. Database Schema

### 2.1 Entity Relationship Diagram

```
Users (1) ──< (N) Orders
Users (1) ──< (N) CartItems
Products (1) ──< (N) ProductVariants
Products (1) ──< (N) OrderItems
Products (1) ──< (N) CartItems
ProductVariants (1) ──< (N) OrderItems
ProductVariants (1) ──< (N) CartItems
Orders (1) ──< (N) OrderItems
Products (1) ──< (N) CustomPackageFlavors
```

### 2.2 Table Definitions

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

#### products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  is_custom_package BOOLEAN DEFAULT false,
  custom_package_base_quantity INTEGER,
  custom_package_base_price DECIMAL(10, 2),
  custom_package_extra_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
```

#### product_variants
```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- e.g., "Per Piece", "Per Box"
  price DECIMAL(10, 2) NOT NULL,
  quantity_label VARCHAR(50), -- e.g., "6 pieces", "1 box"
  stock_quantity INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);
```

#### custom_package_flavors
```sql
CREATE TABLE custom_package_flavors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  flavor_name VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_flavors_product ON custom_package_flavors(product_id);
```

#### cart_items
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  custom_package_selections JSONB, -- {"flavors": [{"id": "uuid", "name": "Chocolate", "quantity": 3}]}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cart_user ON cart_items(user_id);
```

#### addresses
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50), -- e.g., "Home", "Office"
  street_address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  province VARCHAR(100),
  phone VARCHAR(50) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_user ON addresses(user_id);
```

#### orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50) NOT NULL,
  delivery_method VARCHAR(20) NOT NULL CHECK (delivery_method IN ('delivery', 'pickup')),
  delivery_address TEXT,
  delivery_city VARCHAR(100),
  delivery_postal_code VARCHAR(20),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending_confirmation' CHECK (
    status IN ('pending_confirmation', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')
  ),
  notes TEXT,
  whatsapp_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

#### order_items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  variant_name VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  custom_package_selections JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
```

#### newsletter_subscriptions
```sql
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
```

---

## 3. Next.js App Router Structure

### 3.1 Directory Structure

```
app/
├── layout.tsx                      # Root layout with fonts, providers
├── page.tsx                        # Homepage (hero, highlights, products, story)
├── globals.css                     # Tailwind imports + custom styles
├── (shop)/                         # Shop route group
│   ├── shop/
│   │   └── page.tsx               # Product catalog with category filters
│   └── product/
│       └── [slug]/
│           └── page.tsx           # Product detail page
├── cart/
│   └── page.tsx                   # Shopping cart page
├── checkout/
│   └── page.tsx                   # Checkout form
├── order-confirmation/
│   └── [id]/
│       └── page.tsx               # Order success + WhatsApp link
├── (auth)/                        # Auth route group
│   ├── login/
│   │   └── page.tsx               # Login form
│   └── register/
│       └── page.tsx               # Registration form
├── account/                       # Protected customer routes
│   ├── layout.tsx                 # Account layout with sidebar
│   ├── profile/
│   │   └── page.tsx               # Profile editing
│   ├── orders/
│   │   ├── page.tsx               # Order history list
│   │   └── [id]/
│   │       └── page.tsx           # Order detail
│   └── addresses/
│       └── page.tsx               # Saved addresses
├── admin/                         # Protected admin routes
│   ├── layout.tsx                 # Admin layout with sidebar
│   ├── dashboard/
│   │   └── page.tsx               # Admin dashboard overview
│   ├── products/
│   │   ├── page.tsx               # Product list
│   │   ├── new/
│   │   │   └── page.tsx           # Create product
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx       # Edit product
│   ├── orders/
│   │   ├── page.tsx               # Order management list
│   │   └── [id]/
│   │       └── page.tsx           # Order detail + status update
│   └── categories/
│       └── page.tsx               # Category management
└── api/                           # API routes
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts           # NextAuth.js handlers
    ├── cart/
    │   ├── route.ts               # GET, POST cart
    │   └── [id]/
    │       └── route.ts           # PUT, DELETE cart item
    ├── orders/
    │   ├── route.ts               # POST create order
    │   └── [id]/
    │       └── route.ts           # GET order details
    ├── products/
    │   └── route.ts               # GET products
    ├── newsletter/
    │   └── route.ts               # POST subscribe
    └── admin/
        ├── products/
        │   └── route.ts           # Admin product CRUD
        └── orders/
            └── route.ts           # Admin order management
```

### 3.2 Key Pages and Components

#### Homepage (`app/page.tsx`)
- Hero section with asymmetric photo grid
- Floating stat badges
- Service highlights bar
- Featured products by category
- Our Story section with pull-quote overlay
- Newsletter signup footer

#### Product Catalog (`app/shop/page.tsx`)
- Category filter sidebar/dropdown
- Product grid (2-column on desktop, 1 on mobile)
- Product cards with image, name, description, price
- "Out of Stock" badges
- Quick add to cart buttons

#### Product Detail (`app/product/[slug]/page.tsx`)
- Large product images
- Product name, description, price
- Variant toggle (per piece / per box) when applicable
- Custom package builder interface for custom products
- Quantity selector
- Add to cart button
- Related products

#### Shopping Cart (`app/cart/page.tsx`)
- Cart item list with thumbnails
- Quantity adjusters
- Remove item buttons
- Subtotal calculation
- Continue shopping / Proceed to checkout CTAs

#### Checkout (`app/checkout/page.tsx`)
- Customer information form (name, email, phone)
- Delivery method selector (delivery / pickup)
- Address form (conditional on delivery method)
- Order summary sidebar
- Order notes textarea
- Submit order button

#### Order Confirmation (`app/order-confirmation/[id]/page.tsx`)
- Success message
- Order summary (items, total, delivery details)
- WhatsApp confirmation button (prominent CTA)
- Order number display
- View order history link (for authenticated users)

---

## 4. Component Architecture

### 4.1 Design System Components

#### Core UI Components (`components/ui/`)

```typescript
// Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  pill?: boolean; // Rounded pill shape
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Colors:
// primary: terracotta/orange
// secondary: espresso brown
// background: cream/off-white
```

```typescript
// Card.tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
```

```typescript
// Input.tsx
interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}
```

#### Layout Components (`components/layout/`)

```typescript
// Navbar.tsx
// Bordered/boxed container
// Logo, navigation links, cart icon with count, auth buttons
// Mobile hamburger menu
```

```typescript
// Footer.tsx
// Contact info, social links, newsletter signup
// Multi-column layout
```

### 4.2 Feature Components

#### Product Components (`components/product/`)

```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    defaultPrice: number;
    isActive: boolean;
    stockAvailable: boolean;
  };
}
// Displays: image, name, description, price, "Add to Cart" or "Out of Stock"
```

```typescript
// ProductVariantToggle.tsx
interface ProductVariantToggleProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
}
// Toggle between "Per Piece" and "Per Box"
// Updates displayed price
```

```typescript
// CustomPackageBuilder.tsx
interface CustomPackageBuilderProps {
  product: {
    baseQuantity: number;
    basePrice: number;
    extraPrice: number;
  };
  flavors: Flavor[];
  onSelectionChange: (selections: FlavorSelection[]) => void;
}
// Flavor checkboxes with quantity inputs
// Running count vs. base quantity
// Extra cost calculation display
```

#### Cart Components (`components/cart/`)

```typescript
// CartItem.tsx
interface CartItemProps {
  item: {
    id: string;
    product: Product;
    variant: ProductVariant;
    quantity: number;
    customPackageSelections?: FlavorSelection[];
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}
```

```typescript
// CartSummary.tsx
interface CartSummaryProps {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}
```

#### Checkout Components (`components/checkout/`)

```typescript
// CheckoutForm.tsx
// Full checkout form with validation
// Integrates with React Hook Form + Zod
```

```typescript
// OrderSummary.tsx
// Read-only order summary for checkout sidebar
```

#### Admin Components (`components/admin/`)

```typescript
// ProductTable.tsx
// Product list with edit/delete actions
```

```typescript
// ProductForm.tsx
// Create/edit product form with variant management
```

```typescript
// OrderStatusBadge.tsx
// Color-coded order status display
```

```typescript
// OrderManagementTable.tsx
// Order list with filtering and status updates
```

---

## 5. Authentication & Authorization

### 5.1 NextAuth.js Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Query user from database by email
        // Verify password with bcrypt.compare()
        // Return user object or null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 5.2 Password Hashing

```typescript
// lib/auth.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### 5.3 Route Protection

```typescript
// lib/auth-helpers.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    redirect('/');
  }
  return session;
}
```

---

## 6. Stage 1 Implementation Details

### 6.1 Cart State Management

#### For Authenticated Users
- Cart items stored in `cart_items` database table
- Server Actions for add/update/remove operations
- Real-time sync between client and database

#### For Guest Users
- Cart stored in browser localStorage
- Client-side state management with React Context
- On login, merge localStorage cart with database cart

```typescript
// lib/cart-context.tsx (Client Component)
'use client';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export function CartProvider({ children, initialCart, userId }) {
  const [items, setItems] = useState(initialCart);
  
  const addItem = async (item) => {
    if (userId) {
      // Call Server Action to add to database
      await addToCartAction(item);
    } else {
      // Update localStorage
      const updatedCart = [...items, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setItems(updatedCart);
    }
  };
  
  // Similar for updateQuantity, removeItem, clearCart
  
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
```

### 6.2 Checkout Flow

```typescript
// app/checkout/page.tsx (Server Component)
export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  const cart = session 
    ? await getCartFromDB(session.user.id)
    : getCartFromLocalStorage(); // Passed via client component
  
  return <CheckoutForm cart={cart} user={session?.user} />;
}
```

```typescript
// components/checkout/CheckoutForm.tsx (Client Component)
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/lib/validations';

export function CheckoutForm({ cart, user }) {
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      deliveryMethod: 'delivery',
      address: '',
      city: '',
      postalCode: '',
      notes: ''
    }
  });
  
  const onSubmit = async (data) => {
    // Call Server Action to create order
    const order = await createOrderAction({
      ...data,
      userId: user?.id,
      cartItems: cart
    });
    
    // Redirect to order confirmation with WhatsApp link
    router.push(`/order-confirmation/${order.id}`);
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### 6.3 Order Creation (Server Action)

```typescript
// app/actions/order-actions.ts
'use server';

import { db } from '@/lib/db';
import { generateOrderNumber } from '@/lib/utils';

export async function createOrderAction(data) {
  // 1. Generate unique order number
  const orderNumber = generateOrderNumber(); // e.g., "ORD-20260815-001"
  
  // 2. Calculate totals
  const subtotal = calculateSubtotal(data.cartItems);
  const deliveryFee = data.deliveryMethod === 'delivery' ? 10000 : 0; // Example
  const total = subtotal + deliveryFee;
  
  // 3. Create order in database
  const order = await db.order.create({
    data: {
      orderNumber,
      userId: data.userId || null,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      deliveryMethod: data.deliveryMethod,
      deliveryAddress: data.address,
      deliveryCity: data.city,
      deliveryPostalCode: data.postalCode,
      subtotal,
      deliveryFee,
      total,
      status: 'pending_confirmation',
      notes: data.notes,
      orderItems: {
        create: data.cartItems.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          productName: item.product.name,
          variantName: item.variant.name,
          quantity: item.quantity,
          unitPrice: item.variant.price,
          subtotal: item.quantity * item.variant.price,
          customPackageSelections: item.customPackageSelections
        }))
      }
    },
    include: {
      orderItems: true
    }
  });
  
  // 4. Update product stock
  for (const item of data.cartItems) {
    await db.productVariant.update({
      where: { id: item.variantId },
      data: {
        stockQuantity: {
          decrement: item.quantity
        }
      }
    });
  }
  
  // 5. Clear user's cart
  if (data.userId) {
    await db.cartItem.deleteMany({
      where: { userId: data.userId }
    });
  }
  
  return order;
}
```

### 6.4 WhatsApp Link Generation

```typescript
// lib/whatsapp.ts
export function generateWhatsAppLink(order: Order): string {
  const BAKERY_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // e.g., "6281234567890"
  
  // Format order details for WhatsApp message
  const message = `
Halo! Saya ingin mengkonfirmasi pesanan:

*Order #${order.orderNumber}*

*Pesanan:*
${order.orderItems.map(item => 
  `- ${item.productName} (${item.variantName}) x${item.quantity} = Rp ${item.subtotal.toLocaleString()}`
).join('\n')}

*Subtotal:* Rp ${order.subtotal.toLocaleString()}
*Ongkir:* Rp ${order.deliveryFee.toLocaleString()}
*Total:* Rp ${order.total.toLocaleString()}

*Metode Pengiriman:* ${order.deliveryMethod === 'delivery' ? 'Diantar' : 'Ambil Sendiri'}
${order.deliveryMethod === 'delivery' ? `
*Alamat Pengiriman:*
${order.deliveryAddress}
${order.deliveryCity}, ${order.deliveryPostalCode}
` : ''}

*Kontak:*
Nama: ${order.customerName}
Telepon: ${order.customerPhone}

${order.notes ? `*Catatan:* ${order.notes}` : ''}

Terima kasih!
  `.trim();
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${BAKERY_PHONE}?text=${encodedMessage}`;
}
```

```typescript
// app/order-confirmation/[id]/page.tsx
export default async function OrderConfirmationPage({ params }) {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: { orderItems: true }
  });
  
  const whatsappLink = generateWhatsAppLink(order);
  
  return (
    <div>
      <h1>Pesanan Berhasil!</h1>
      <p>Order #{order.orderNumber}</p>
      
      {/* Order summary */}
      <OrderSummary order={order} />
      
      {/* Prominent WhatsApp CTA */}
      <Button 
        variant="primary" 
        size="lg" 
        pill
        href={whatsappLink}
        target="_blank"
      >
        Konfirmasi via WhatsApp
      </Button>
    </div>
  );
}
```

---

## 7. Tailwind CSS Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1ea',
          DEFAULT: '#f5f1ea', // Off-white background
        },
        terracotta: {
          400: '#e8956b',
          500: '#e07c4f', // Warm orange accent
          600: '#d16a3b',
        },
        espresso: {
          800: '#3d2817',
          900: '#2b1a0f', // Dark brown for contrasting sections
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      }
    },
  },
  plugins: [],
};
```

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream font-sans">
        {children}
      </body>
    </html>
  );
}
```

---

## 8. Data Flow Diagrams

### 8.1 Add to Cart Flow

```
Customer → Product Page (Client Component)
  ↓
  Select variant/custom package
  ↓
  Click "Add to Cart"
  ↓
  CartContext.addItem()
  ↓
  Is user authenticated?
  ├─ Yes → Server Action → Insert into cart_items table
  └─ No  → Update localStorage
  ↓
  Update cart count in navbar
```

### 8.2 Checkout & Order Creation Flow

```
Customer → Cart Page
  ↓
  Click "Checkout"
  ↓
  Checkout Page (Server Component)
  ├─ Fetch cart items (DB or localStorage)
  └─ Pre-fill user info if authenticated
  ↓
  Customer fills form
  ↓
  Submit form (Client Component)
  ↓
  createOrderAction (Server Action)
  ├─ Generate order number
  ├─ Calculate totals
  ├─ Create order + order_items in DB
  ├─ Update product stock
  └─ Clear cart (DB or localStorage)
  ↓
  Redirect to Order Confirmation
  ↓
  Generate WhatsApp link with order details
  ↓
  Display WhatsApp button
  ↓
  Customer clicks → Opens WhatsApp with pre-filled message
```

### 8.3 Admin Order Management Flow

```
Admin → Admin Dashboard
  ↓
  Navigate to Orders
  ↓
  View order list (filtered by status)
  ↓
  Click order to view details
  ↓
  Update order status
  ↓
  Server Action → Update orders table
  ↓
  Notify customer (future: email/SMS)
```

---

## 9. Security Considerations

### 9.1 Authentication Security

1. **Password Hashing**: All passwords hashed with bcrypt (12 salt rounds) before storage
2. **Session Management**: NextAuth.js handles secure session tokens (JWT)
3. **No Hardcoded Credentials**: All admin accounts created through secure registration with role assignment via database or admin panel
4. **HTTPS Only**: Enforce HTTPS in production for all traffic
5. **CSRF Protection**: NextAuth.js provides built-in CSRF tokens

### 9.2 API Route Protection

```typescript
// Example protected API route
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Proceed with authenticated logic
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Admin-only logic
}
```

### 9.3 Input Validation

```typescript
// lib/validations.ts
import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid').optional(),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, 'Nomor telepon tidak valid'),
  deliveryMethod: z.enum(['delivery', 'pickup']),
  address: z.string().min(10, 'Alamat minimal 10 karakter').optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
}).refine(data => {
  if (data.deliveryMethod === 'delivery') {
    return data.address && data.city;
  }
  return true;
}, {
  message: 'Alamat dan kota wajib diisi untuk pengiriman',
  path: ['address']
});

export const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung angka'),
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, 'Nomor telepon tidak valid').optional(),
});
```

### 9.4 SQL Injection Prevention

Using Prisma ORM provides automatic parameterization and SQL injection protection.

---

## 10. Performance Optimizations

### 10.1 Image Optimization

```typescript
// Use Next.js Image component for all product images
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.name}
  width={600}
  height={400}
  className="object-cover"
  placeholder="blur"
  blurDataURL={product.blurDataUrl}
/>
```

### 10.2 Database Indexing

- Indexes defined in schema for frequently queried fields
- Composite indexes for common filter combinations

### 10.3 Caching Strategy

```typescript
// Cache product catalog for 60 seconds
export const revalidate = 60;

export default async function ShopPage() {
  const products = await db.product.findMany({
    where: { isActive: true },
    include: { category: true, variants: true }
  });
  
  return <ProductGrid products={products} />;
}
```

---

## 11. Testing Strategy

### 11.1 Unit Tests
- Component rendering tests (React Testing Library)
- Utility function tests (validation, formatting)
- Authentication helper tests

### 11.2 Integration Tests
- API route tests
- Server Action tests
- Database operation tests

### 11.3 E2E Tests (Playwright)
- User registration and login flow
- Product browsing and cart operations
- Complete checkout flow
- Admin product and order management

---

## 12. Deployment Configuration

### 12.1 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generated-secret"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="6281234567890"

# Admin (for initial setup only)
INITIAL_ADMIN_EMAIL="admin@bakery.com"
INITIAL_ADMIN_PASSWORD="change-me-immediately"
```

### 12.2 Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set root directory: `/`
5. Auto-deploy on push to main branch

### 12.3 Database Migrations

```bash
# Using Prisma
npx prisma migrate deploy
```

---

## 13. Future Enhancements (Stage 2 & 3)

### Stage 2: Bank Transfer Upload
- Add `payment_proof_url` field to orders table
- File upload component in checkout
- Admin approval interface for payment proofs

### Stage 3: Payment Gateway Integration
- Integrate Midtrans/Xendit SDK
- Add payment status tracking
- Automatic order confirmation on successful payment
- Webhook handlers for payment notifications

---

## 14. Summary

This design provides a comprehensive technical blueprint for Stage 1 implementation of the family bakery e-commerce website. Key architectural decisions:

1. **Next.js App Router** with Server Components for optimal performance
2. **PostgreSQL database** via Prisma ORM for type-safe data access
3. **NextAuth.js** for secure authentication with bcrypt password hashing
4. **Hybrid cart storage** (database for authenticated, localStorage for guests)
5. **WhatsApp integration** for order confirmation in Stage 1
6. **Warm editorial design system** using Tailwind CSS custom theme
7. **No hardcoded credentials** - secure by design
8. **Scalable architecture** ready for Stage 2 and 3 enhancements

The implementation prioritizes security, user experience, and maintainability while delivering the requested Tokopedia-style e-commerce functionality adapted for a family bakery business.
