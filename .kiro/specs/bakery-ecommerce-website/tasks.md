# Implementation Plan: Bakery E-Commerce Website

## Overview

This plan implements a full-stack e-commerce website for a family bakery using Next.js 14 (App Router), TypeScript, React, Tailwind CSS, and PostgreSQL. The implementation focuses on Stage 1: shopping cart → database order → WhatsApp confirmation workflow. The design follows a warm editorial aesthetic with secure authentication, product catalog with variants, custom package builder, and admin dashboard.

## Tasks

- [ ] 1. Set up project structure and core configuration
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and App Router
    - Create Next.js project with `create-next-app` using TypeScript and App Router
    - Configure ESLint and Prettier
    - Set up folder structure (app, components, lib directories)
    - _Requirements: 20.1, 20.2_
  
  - [x] 1.2 Configure Tailwind CSS with custom theme
    - Install and configure Tailwind CSS
    - Set up custom color palette (cream, terracotta, espresso)
    - Configure custom fonts (Playfair Display for headings, Inter for body)
    - Create base styles and global CSS
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [x] 1.3 Set up PostgreSQL database and Prisma ORM
    - Install Prisma and PostgreSQL client
    - Initialize Prisma with PostgreSQL provider
    - Configure database connection string in environment variables
    - _Requirements: 20.1, 20.7_
  
  - [ ] 1.4 Define Prisma schema with all database tables
    - Create users table with role-based access
    - Create categories, products, product_variants, custom_package_flavors tables
    - Create cart_items, addresses tables
    - Create orders, order_items tables
    - Create newsletter_subscriptions table
    - Add indexes for optimized queries
    - _Requirements: 20.2, 20.3, 20.4, 20.5, 20.6, 20.7_
  
  - [ ] 1.5 Run database migrations
    - Generate and apply Prisma migrations
    - Verify all tables and indexes are created
    - _Requirements: 20.7_

- [ ] 2. Implement authentication system with NextAuth.js
  - [ ] 2.1 Install and configure NextAuth.js v5
    - Install NextAuth.js and bcrypt dependencies
    - Create NextAuth configuration with credentials provider
    - Set up JWT and session callbacks with role management
    - Configure sign-in and sign-out pages
    - _Requirements: 8.4, 8.6_
  
  - [ ] 2.2 Create password hashing utilities
    - Implement hashPassword function with bcrypt (12 salt rounds)
    - Implement verifyPassword function for login
    - _Requirements: 8.2_
  
  - [ ] 2.3 Build registration page and API
    - Create registration form with email, password, name, phone fields
    - Implement form validation with Zod and React Hook Form
    - Create server action to register user with hashed password
    - Validate unique email constraint
    - _Requirements: 8.1, 8.2, 8.3, 8.7_
  
  - [ ] 2.4 Build login page with NextAuth integration
    - Create login form with email and password fields
    - Integrate with NextAuth credentials provider
    - Implement password verification
    - Create secure session after successful login
    - _Requirements: 8.4, 8.5, 8.6_
  
  - [ ] 2.5 Create route protection helpers
    - Implement requireAuth middleware for protected routes
    - Implement requireAdmin middleware for admin-only routes
    - _Requirements: 13.2_
  
  - [ ]* 2.6 Write unit tests for authentication utilities
    - Test password hashing and verification
    - Test session creation and validation
    - Test route protection logic
    - _Requirements: 8.2, 8.5_

- [ ] 3. Build design system and layout components
  - [ ] 3.1 Create reusable UI components
    - Build Button component with variants (primary, secondary, outline, ghost) and sizes
    - Build Card component with variants (default, bordered, elevated)
    - Build Input component with label, error state, and validation
    - Build Badge component for stock status and stats
    - _Requirements: 15.7_
  
  - [ ] 3.2 Build navigation bar component
    - Create Navbar with bordered/boxed design
    - Display logo, navigation links (Home, Shop, Our Story)
    - Display cart icon with item count
    - Display authentication links (Login/Register or Account/Logout)
    - Implement mobile hamburger menu
    - _Requirements: 16.1, 16.2, 16.3, 16.4_
  
  - [ ] 3.3 Build footer component
    - Create multi-column footer layout
    - Display contact information and social media links
    - Integrate newsletter signup form
    - _Requirements: 16.6_
  
  - [ ] 3.4 Create root layout with fonts and providers
    - Set up Playfair Display and Inter fonts with CSS variables
    - Create root layout with navigation and footer
    - Apply cream background and typography styles
    - _Requirements: 15.4, 15.5, 15.1_

- [ ] 4. Implement product catalog and category management
  - [ ] 4.1 Create admin category management interface
    - Build category list page with create/edit/delete actions
    - Create category form with name, slug, description, display order
    - Implement server actions for category CRUD operations
    - _Requirements: 13.1, 13.4_
  
  - [ ] 4.2 Build product browsing page with category filters
    - Create shop page that fetches all active products from database
    - Display products grouped by category
    - Implement category filter sidebar/dropdown
    - Display product grid in 2-column layout (1-column on mobile)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ] 4.3 Create ProductCard component
    - Display product image with Next.js Image optimization
    - Display product name, description, and starting price
    - Show "Out of Stock" badge when stock is zero
    - Implement quick "Add to Cart" button
    - Handle click to navigate to product detail page
    - _Requirements: 3.2, 18.2, 15.8_
  
  - [ ]* 4.4 Write unit tests for product components
    - Test ProductCard rendering with different stock states
    - Test category filtering logic
    - _Requirements: 3.2, 18.2_

- [ ] 5. Build product detail page with variants and custom packages
  - [ ] 5.1 Create product detail page route
    - Implement dynamic route for /product/[slug]
    - Fetch product with variants and custom package flavors from database
    - Display large product images with optimization
    - Display product name, description
    - _Requirements: 3.2_
  
  - [ ] 5.2 Implement ProductVariantToggle component
    - Display toggle control for products with multiple variants
    - Update displayed price when variant changes
    - Update quantity selector to reflect variant
    - Persist selected variant in component state
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ] 5.3 Build CustomPackageBuilder component
    - Display flavor selection interface with checkboxes and quantity inputs
    - Show running count of selected items vs base quantity
    - Calculate and display extra cost when limit exceeded
    - Validate at least one flavor is selected
    - Return flavor selections in structured format
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 5.4 Implement quantity selector and add to cart button
    - Create quantity input with increment/decrement controls
    - Validate quantity against available stock
    - Implement add to cart action with selected variant and custom package selections
    - _Requirements: 6.1, 18.3_
  
  - [ ]* 5.5 Write integration tests for product detail interactions
    - Test variant toggle updates price correctly
    - Test custom package builder calculations
    - Test add to cart with different configurations
    - _Requirements: 4.2, 5.4_

- [ ] 6. Implement shopping cart functionality
  - [ ] 6.1 Create CartContext provider for state management
    - Implement client-side context for cart items
    - Create addItem, updateQuantity, removeItem, clearCart methods
    - Handle authenticated users (database) vs guests (localStorage)
    - Sync cart count across components
    - _Requirements: 6.1, 6.3, 6.4, 6.5_
  
  - [ ] 6.2 Build server actions for authenticated cart operations
    - Create addToCartAction for inserting into cart_items table
    - Create updateCartItemAction for quantity changes
    - Create removeCartItemAction for deletion
    - Create clearCartAction for checkout completion
    - _Requirements: 6.4_
  
  - [ ] 6.3 Implement cart merge logic for guest-to-authenticated transition
    - When user logs in, fetch localStorage cart
    - Merge localStorage items with database cart
    - Clear localStorage after successful merge
    - _Requirements: 6.4, 6.5_
  
  - [ ] 6.4 Create cart page with item list
    - Fetch cart items from database or localStorage
    - Build CartItem component with thumbnail, name, variant, price, quantity adjuster
    - Implement remove item button
    - Display empty cart message when no items
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6_
  
  - [ ] 6.5 Build CartSummary component
    - Calculate and display subtotal
    - Calculate and display tax (if applicable)
    - Display total amount
    - Add "Proceed to Checkout" button
    - _Requirements: 7.5_
  
  - [ ]* 6.6 Write unit tests for cart logic
    - Test cart item calculations
    - Test quantity validation
    - Test cart merge logic
    - _Requirements: 7.2, 7.3_

- [ ] 7. Build checkout flow and order creation
  - [ ] 7.1 Create checkout page with form
    - Fetch cart items from database or context
    - Pre-fill customer information for authenticated users
    - Build checkout form with name, email, phone fields
    - Add delivery method selector (delivery/pickup)
    - Add conditional address fields (street, city, postal code)
    - Add order notes textarea
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [ ] 7.2 Implement checkout form validation with Zod
    - Create checkoutSchema with field validations
    - Validate required fields based on delivery method
    - Validate email and phone formats
    - Integrate with React Hook Form
    - _Requirements: 9.4_
  
  - [ ] 7.3 Build OrderSummary sidebar component for checkout
    - Display cart items with quantities and prices
    - Calculate and display subtotal, delivery fee, total
    - _Requirements: 9.1_
  
  - [ ] 7.4 Implement createOrderAction server action
    - Generate unique order number (e.g., ORD-YYYYMMDD-NNN)
    - Calculate subtotal, delivery fee, and total
    - Validate stock availability before order creation
    - Create order record with status "pending_confirmation"
    - Create order_items records with product snapshot
    - Update product stock quantities
    - Clear customer's cart (database or trigger client-side clear)
    - Return created order
    - _Requirements: 9.5, 9.6, 9.7, 18.4, 18.5_
  
  - [ ]* 7.5 Write integration tests for order creation
    - Test order creation with valid data
    - Test stock validation during checkout
    - Test cart clearing after order creation
    - _Requirements: 9.5, 18.5_

- [ ] 8. Implement WhatsApp confirmation workflow
  - [ ] 8.1 Create WhatsApp link generation utility
    - Implement generateWhatsAppLink function
    - Format order details in Indonesian for WhatsApp message
    - Include order number, items with quantities and prices, totals, delivery details, customer contact
    - URL encode the message properly
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [ ] 8.2 Build order confirmation page
    - Create dynamic route for /order-confirmation/[id]
    - Fetch order details from database by ID
    - Display success message and order number
    - Generate and display WhatsApp link as prominent CTA button
    - Show complete order summary (items, delivery details, totals)
    - Add link to order history for authenticated users
    - _Requirements: 10.4, 10.5_
  
  - [ ]* 8.3 Write unit tests for WhatsApp link generation
    - Test message formatting with different order configurations
    - Test URL encoding
    - _Requirements: 10.2, 10.3_

- [ ] 9. Build customer account pages
  - [ ] 9.1 Create account layout with sidebar
    - Build account section layout with navigation sidebar
    - Add links to Profile, Order History, Saved Addresses
    - Protect routes with requireAuth middleware
    - _Requirements: 16.3_
  
  - [ ] 9.2 Build order history page
    - Fetch orders for authenticated customer from database
    - Display order list with order number, date, status, total
    - Sort orders by date (most recent first)
    - Show "no orders" message when list is empty
    - _Requirements: 11.1, 11.2, 11.4, 11.5_
  
  - [ ] 9.3 Create order detail page for customers
    - Fetch order by ID with order items
    - Display full order details including all items and delivery information
    - Display order status with color-coded badge
    - _Requirements: 11.3_
  
  - [ ] 9.4 Build profile editing page
    - Display form with name, email, phone fields pre-filled
    - Implement server action to update user profile
    - Add password change functionality
    - _Requirements: 8.1_
  
  - [ ]* 9.5 Write integration tests for customer account features
    - Test order history display and filtering
    - Test profile update functionality
    - _Requirements: 11.2_

- [ ] 10. Implement admin dashboard and product management
  - [ ] 10.1 Create admin layout with sidebar
    - Build admin section layout with navigation
    - Add links to Dashboard, Products, Orders, Categories
    - Protect routes with requireAdmin middleware
    - _Requirements: 13.1, 13.2_
  
  - [ ] 10.2 Build admin dashboard overview page
    - Display key metrics (total orders, pending orders, revenue)
    - Show recent orders list
    - Add quick action links
    - _Requirements: 13.1_
  
  - [ ] 10.3 Create product list page for admin
    - Fetch all products with variants from database
    - Display product table with name, category, price, stock status
    - Add action buttons for edit and delete
    - Implement active/inactive toggle
    - _Requirements: 13.3, 13.7_
  
  - [ ] 10.4 Build product creation and editing forms
    - Create form with name, slug, description, category selector
    - Add image upload field (or URL input)
    - Implement variant management (add/edit/remove variants with name, price, quantity)
    - Add custom package configuration (base quantity, base price, extra price)
    - Create server actions for product CRUD operations
    - _Requirements: 13.4, 13.5_
  
  - [ ] 10.5 Implement stock quantity management
    - Add inline stock editor in product list
    - Create server action to update stock quantities
    - Validate non-negative stock values
    - _Requirements: 13.6_
  
  - [ ]* 10.6 Write integration tests for product management
    - Test product creation with variants
    - Test stock updates
    - Test product activation/deactivation
    - _Requirements: 13.4, 13.6, 13.7_

- [ ] 11. Implement admin order management
  - [ ] 11.1 Create order management list page
    - Fetch all orders from database with customer information
    - Display order table with number, customer name, date, status, total
    - Implement status filter dropdown
    - Add search by order number or customer name
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ] 11.2 Build order detail page for admin
    - Fetch order with all items and customer details
    - Display complete order information
    - Show delivery address and contact information
    - Display order timeline with status changes
    - _Requirements: 14.4_
  
  - [ ] 11.3 Implement order status management
    - Create status update dropdown with valid transitions
    - Implement server action to update order status
    - Record timestamp of status change
    - Display status badge with appropriate colors
    - _Requirements: 14.5, 14.6_
  
  - [ ]* 11.4 Write integration tests for order management
    - Test order filtering by status
    - Test status update workflow
    - _Requirements: 14.2, 14.5_

- [ ] 12. Build homepage with hero and content sections
  - [ ] 12.1 Create hero section component
    - Build asymmetric photo grid layout
    - Display bakery headline and description
    - Add "Shop Now" and "Our Story" CTA buttons with navigation
    - Create floating stat badge overlay
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 12.2 Build service highlights bar
    - Display three service options with icons (Delivery, Pickup, Custom Order)
    - Use warm editorial design styling
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ] 12.3 Create featured products section
    - Fetch featured products by category from database
    - Display products using ProductCard component
    - Add category headings
    - _Requirements: 3.1, 3.2_
  
  - [ ] 12.4 Build Our Story section
    - Create dark background section with contrast styling
    - Display large photograph with pull-quote overlay
    - Show trust statistics (years, customers, products)
    - Display family story narrative text
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ]* 12.5 Write integration tests for homepage
    - Test hero section navigation
    - Test featured products display
    - _Requirements: 1.3, 1.4_

- [ ] 13. Implement newsletter subscription
  - [ ] 13.1 Create newsletter signup form component
    - Build form with email input field
    - Implement email validation with Zod
    - Display in footer and optionally on homepage
    - _Requirements: 17.1, 17.2_
  
  - [ ] 13.2 Build newsletter subscription server action
    - Create server action to store email in newsletter_subscriptions table
    - Validate email format
    - Check for duplicate subscriptions
    - Return success/error message
    - _Requirements: 17.3, 17.4, 17.6_
  
  - [ ] 13.3 Display confirmation message after subscription
    - Show success message in UI after form submission
    - Clear form after successful subscription
    - _Requirements: 17.5_
  
  - [ ]* 13.4 Write unit tests for newsletter logic
    - Test email validation
    - Test duplicate prevention
    - _Requirements: 17.2, 17.6_

- [ ] 14. Implement responsive mobile design
  - [ ] 14.1 Optimize layouts for mobile devices
    - Implement responsive product grid (1-column on mobile)
    - Create mobile-friendly navigation with hamburger menu
    - Adjust form layouts for small screens
    - Ensure touch-friendly button and input sizes
    - _Requirements: 19.1, 19.2, 19.3, 19.4_
  
  - [ ] 14.2 Test readability and usability on mobile
    - Verify text readability on small screens
    - Test interactive elements on touch devices
    - Ensure proper spacing and padding
    - _Requirements: 19.5_

- [ ] 15. Seed database with initial data
  - [ ] 15.1 Create database seed script
    - Create categories (Breads, Cakes, Pastries)
    - Create sample products with variants
    - Create sample custom package flavors
    - Create initial admin user with hashed password
    - Run seed script
    - _Requirements: 20.2, 20.3, 8.2_

- [ ] 16. Set up environment configuration and deployment
  - [ ] 16.1 Configure environment variables
    - Set up DATABASE_URL for PostgreSQL connection
    - Configure NEXTAUTH_URL and NEXTAUTH_SECRET
    - Set NEXT_PUBLIC_WHATSAPP_NUMBER for order confirmation
    - Document all required environment variables
    - _Requirements: 10.1_
  
  - [ ] 16.2 Prepare for Vercel deployment
    - Configure build settings for Next.js
    - Set up database migration strategy for deployment
    - Test production build locally
    - _Requirements: 20.1_
  
  - [ ]* 16.3 Write deployment documentation
    - Document deployment steps
    - Document environment variable setup
    - Document database migration process

- [ ] 17. Final checkpoint - End-to-end testing and polish
  - [ ] 17.1 Test complete user flows
    - Test guest browsing → cart → checkout → WhatsApp confirmation
    - Test user registration → login → shopping → order history
    - Test admin product management → order management workflows
    - _Requirements: All_
  
  - [ ] 17.2 Verify security and data integrity
    - Confirm no hardcoded credentials exist
    - Verify password hashing is working
    - Test route protection for admin pages
    - Validate database constraints are enforced
    - _Requirements: 8.7, 8.2, 13.2, 20.7_
  
  - [ ] 17.3 Polish UI and design consistency
    - Verify warm editorial aesthetic is consistent across all pages
    - Check responsive design on multiple device sizes
    - Ensure all buttons and interactive elements follow design system
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_
  
  - [ ] 17.4 Performance optimization
    - Verify images are optimized with Next.js Image
    - Check page load times and caching strategy
    - Test database query performance
    - _Requirements: 15.8_

- [ ] 18. Checkpoint - Ensure all tests pass and application is ready for deployment
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- The implementation uses TypeScript throughout for type safety
- Focus is on Stage 1: cart → database order → WhatsApp confirmation workflow
- Future stages will add bank transfer upload (Stage 2) and payment gateway (Stage 3)
- No hardcoded credentials - admin users must be created through secure registration or seed scripts
- All passwords are hashed with bcrypt before storage
- Authentication is handled by NextAuth.js with JWT sessions
- Cart storage is hybrid: database for authenticated users, localStorage for guests
- The design follows a warm editorial aesthetic with cream/terracotta color scheme
- Checkpoints ensure incremental validation and user feedback opportunities

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4"] },
    { "id": 3, "tasks": ["1.5", "2.1"] },
    { "id": 4, "tasks": ["2.2", "3.1"] },
    { "id": 5, "tasks": ["2.3", "2.4", "2.5", "3.2", "3.3"] },
    { "id": 6, "tasks": ["2.6", "3.4", "4.1"] },
    { "id": 7, "tasks": ["4.2", "4.3", "15.1"] },
    { "id": 8, "tasks": ["4.4", "5.1"] },
    { "id": 9, "tasks": ["5.2", "5.3", "5.4"] },
    { "id": 10, "tasks": ["5.5", "6.1"] },
    { "id": 11, "tasks": ["6.2", "6.3"] },
    { "id": 12, "tasks": ["6.4", "6.5"] },
    { "id": 13, "tasks": ["6.6", "7.1", "7.2", "7.3"] },
    { "id": 14, "tasks": ["7.4"] },
    { "id": 15, "tasks": ["7.5", "8.1"] },
    { "id": 16, "tasks": ["8.2"] },
    { "id": 17, "tasks": ["8.3", "9.1"] },
    { "id": 18, "tasks": ["9.2", "9.3", "9.4"] },
    { "id": 19, "tasks": ["9.5", "10.1"] },
    { "id": 20, "tasks": ["10.2", "10.3"] },
    { "id": 21, "tasks": ["10.4", "10.5"] },
    { "id": 22, "tasks": ["10.6", "11.1", "11.2"] },
    { "id": 23, "tasks": ["11.3"] },
    { "id": 24, "tasks": ["11.4", "12.1", "12.2"] },
    { "id": 25, "tasks": ["12.3", "12.4"] },
    { "id": 26, "tasks": ["12.5", "13.1", "13.2"] },
    { "id": 27, "tasks": ["13.3"] },
    { "id": 28, "tasks": ["13.4", "14.1", "14.2"] },
    { "id": 29, "tasks": ["16.1"] },
    { "id": 30, "tasks": ["16.2"] },
    { "id": 31, "tasks": ["16.3", "17.1"] },
    { "id": 32, "tasks": ["17.2", "17.3", "17.4"] }
  ]
}
```
