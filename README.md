# Umi Ai's Bakery E-Commerce Website

A modern e-commerce website for a family home bakery built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Full e-commerce functionality with product catalog
- 🛒 Shopping cart with variant selection
- 📦 Custom package builder for product bundles
- 💳 Checkout with WhatsApp order confirmation
- 🔐 Secure authentication with NextAuth.js
- 👤 Customer account with order history
- 👨‍💼 Admin dashboard for product and order management
- 📱 Responsive design with warm editorial aesthetic
- 🎨 Custom Tailwind theme with cream, terracotta, and espresso colors

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL (planned)
- **ORM**: Prisma or Drizzle (planned)
- **Validation**: Zod + React Hook Form (planned)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # UI components (Button, Card, Input)
├── lib/                   # Utilities and helpers
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Design System

The website uses a warm editorial food-brand aesthetic:

- **Colors**:
  - Cream (#f5f1ea) - Primary background
  - Terracotta (#e07c4f) - Accent color
  - Espresso (#2b1a0f) - Dark sections

- **Typography**:
  - Display: Playfair Display (serif)
  - Body: Inter (sans-serif)

- **Components**:
  - Rounded pill-shaped buttons
  - Bordered navigation bar
  - Elevated cards for products

## Stage 1 Implementation

Current focus areas:
- [x] Project initialization and configuration
- [ ] Database setup and schema
- [ ] Authentication system
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] WhatsApp integration
- [ ] Admin dashboard

## License

Private project for Umi Ai's Bakery
"# E-commerce-UmiAis" 
