# Requirements Document

## Introduction

This document specifies the requirements for a full-stack e-commerce website for a family home bakery business. The system will be built using Next.js (App Router), React, and Tailwind CSS, with a warm editorial food-brand aesthetic inspired by "La Maison" restaurant template. The website will support browsing products, shopping cart functionality, checkout, and order management with a staged approach to payment processing. Stage 1 focuses on cart-to-database order storage with WhatsApp confirmation handoff.

## Glossary

- **System**: The bakery e-commerce web application
- **Customer**: A user browsing or purchasing bakery products
- **Authenticated_Customer**: A logged-in user with an account
- **Admin**: A privileged user who manages products, inventory, and orders
- **Product**: A bakery item available for purchase (bread, cake, pastry)
- **Product_Variant**: A specific pricing/quantity option for a product (per piece, per box)
- **Cart**: A temporary collection of products selected by a Customer
- **Order**: A confirmed purchase request stored in the database
- **Order_Status**: The current state of an Order (pending confirmation, confirmed, completed, cancelled)
- **Custom_Package**: A configurable product bundle where Customers select multiple flavors up to a set quantity
- **Database**: PostgreSQL database for persistent storage (via Vercel Postgres or Supabase)
- **WhatsApp_Link**: A wa.me deep link pre-filled with order details for manual confirmation
- **Authentication_System**: Secure user login system with password hashing
- **Category**: A product grouping (breads, cakes, pastries)

## Requirements

### Requirement 1: Display Homepage with Hero Section

**User Story:** As a Customer, I want to see an engaging homepage with product photography and clear calls-to-action, so that I understand what the bakery offers and can navigate easily.

#### Acceptance Criteria

1. THE System SHALL display a hero section with asymmetric product photography grid
2. THE System SHALL display a headline describing the bakery
3. THE System SHALL display a "Shop Now" button that navigates to the product catalog
4. THE System SHALL display an "Our Story" button that navigates to the story section
5. THE System SHALL display a floating stat badge overlay on the hero image

### Requirement 2: Display Service Highlights

**User Story:** As a Customer, I want to see available service options, so that I know delivery, pickup, and custom ordering are available.

#### Acceptance Criteria

1. THE System SHALL display a highlights bar with three service options
2. THE System SHALL display a "Delivery" service option with an icon
3. THE System SHALL display a "Pickup" service option with an icon
4. THE System SHALL display a "Custom Order" service option with an icon

### Requirement 3: Browse Products by Category

**User Story:** As a Customer, I want to browse bakery products organized by category, so that I can find items I'm interested in purchasing.

#### Acceptance Criteria

1. THE System SHALL display products grouped by Category (breads, cakes, pastries)
2. FOR EACH Product, THE System SHALL display a photograph, name, description, and price
3. THE System SHALL retrieve Product data from the Database
4. THE System SHALL display products in a two-column card layout
5. WHEN no products exist in a Category, THE System SHALL display a message indicating the category is empty

### Requirement 4: Toggle Product Pricing Variants

**User Story:** As a Customer, I want to toggle between "per piece" and "per box" pricing for products, so that I can choose the quantity option that suits my needs.

#### Acceptance Criteria

1. WHERE a Product has multiple Product_Variants, THE System SHALL display a toggle control
2. WHEN a Customer selects a Product_Variant, THE System SHALL update the displayed price
3. WHEN a Customer selects a Product_Variant, THE System SHALL update the quantity selector to reflect the variant
4. THE System SHALL persist the selected Product_Variant when adding to Cart

### Requirement 5: Build Custom Packages

**User Story:** As a Customer, I want to build a custom package by selecting multiple flavors up to a set quantity, so that I can create a personalized assortment.

#### Acceptance Criteria

1. WHERE a Product supports Custom_Package, THE System SHALL display a package builder interface
2. THE System SHALL allow Customers to select multiple flavor options
3. THE System SHALL display a running count of selected items against the package quantity limit
4. WHEN the quantity limit is exceeded, THE System SHALL calculate and display additional cost
5. THE System SHALL validate that at least one flavor is selected before adding to Cart

### Requirement 6: Add Products to Shopping Cart

**User Story:** As a Customer, I want to add products to a shopping cart, so that I can purchase multiple items in a single order.

#### Acceptance Criteria

1. WHEN a Customer clicks "Add to Cart", THE System SHALL add the selected Product with chosen Product_Variant to the Cart
2. THE System SHALL display a visual confirmation when a product is added to Cart
3. THE System SHALL display the current Cart item count in the navigation bar
4. THE System SHALL store Cart data in the Database for Authenticated_Customers
5. THE System SHALL store Cart data in browser localStorage for unauthenticated Customers

### Requirement 7: View and Modify Shopping Cart

**User Story:** As a Customer, I want to view my cart contents and modify quantities, so that I can review my order before checkout.

#### Acceptance Criteria

1. THE System SHALL display all items currently in the Cart
2. FOR EACH Cart item, THE System SHALL display product name, variant, quantity, unit price, and subtotal
3. THE System SHALL allow Customers to increase or decrease item quantities
4. THE System SHALL allow Customers to remove items from the Cart
5. THE System SHALL display the order subtotal, tax (if applicable), and total
6. WHEN the Cart is empty, THE System SHALL display a message and link to continue shopping

### Requirement 8: Authenticate Customers Securely

**User Story:** As a Customer, I want to create an account and log in securely, so that I can track my orders and save my information.

#### Acceptance Criteria

1. THE System SHALL provide a registration form accepting email, password, name, and phone number
2. WHEN a Customer registers, THE System SHALL hash the password before storing in the Database
3. THE System SHALL validate that the email is not already registered
4. THE System SHALL provide a login form accepting email and password
5. WHEN a Customer logs in, THE Authentication_System SHALL verify the password against the hashed value
6. THE System SHALL create a secure session for authenticated Customers
7. THE System SHALL NOT contain any hardcoded or backdoor credentials

### Requirement 9: Process Checkout and Create Order

**User Story:** As a Customer, I want to complete checkout and submit my order, so that the bakery receives my purchase request.

#### Acceptance Criteria

1. WHEN a Customer proceeds to checkout, THE System SHALL display a checkout form
2. THE System SHALL collect delivery address, contact phone, and delivery method (delivery or pickup)
3. WHEN an Authenticated_Customer checks out, THE System SHALL pre-fill saved address information
4. WHEN a Customer submits the checkout form, THE System SHALL validate all required fields
5. WHEN validation passes, THE System SHALL create an Order in the Database with Order_Status "pending confirmation"
6. THE System SHALL store all Order items with product details, quantities, and prices
7. WHEN the Order is created, THE System SHALL clear the Customer's Cart

### Requirement 10: Generate WhatsApp Confirmation Link

**User Story:** As a Customer, I want to confirm my order via WhatsApp, so that I can communicate directly with the bakery.

#### Acceptance Criteria

1. WHEN an Order is successfully created, THE System SHALL generate a WhatsApp_Link
2. THE WhatsApp_Link SHALL include the bakery's phone number
3. THE WhatsApp_Link SHALL pre-fill a message containing the order number, items, quantities, total price, and delivery details
4. THE System SHALL display the WhatsApp_Link as a prominent call-to-action button on the order confirmation page
5. WHEN a Customer clicks the WhatsApp_Link, THE System SHALL open WhatsApp with the pre-filled message

### Requirement 11: Display Customer Order History

**User Story:** As an Authenticated_Customer, I want to view my past orders, so that I can track my purchase history and reorder items.

#### Acceptance Criteria

1. THE System SHALL display a list of Orders for the Authenticated_Customer
2. FOR EACH Order, THE System SHALL display order number, date, Order_Status, and total price
3. WHEN a Customer selects an Order, THE System SHALL display full order details including all items
4. THE System SHALL sort Orders by date with most recent first
5. WHEN an Authenticated_Customer has no orders, THE System SHALL display a message encouraging them to shop

### Requirement 12: Display Our Story Section

**User Story:** As a Customer, I want to learn about the bakery's family story and values, so that I feel connected to the business.

#### Acceptance Criteria

1. THE System SHALL display an "Our Story" section on the homepage
2. THE System SHALL display a large photograph with a pull-quote overlay
3. THE System SHALL display trust statistics (e.g., years in business, customers served, products baked)
4. THE System SHALL display the family story narrative text
5. THE System SHALL use a dark background for visual contrast

### Requirement 13: Manage Products as Admin

**User Story:** As an Admin, I want to manage products and inventory, so that I can keep the catalog up-to-date.

#### Acceptance Criteria

1. WHEN an Admin logs in, THE System SHALL display an admin dashboard
2. THE System SHALL restrict admin dashboard access to Admin users only
3. THE System SHALL display a list of all Products with name, category, price, and stock status
4. THE System SHALL allow Admins to create new Products with name, description, category, image, and Product_Variants
5. THE System SHALL allow Admins to edit existing Product information
6. THE System SHALL allow Admins to update product stock quantities
7. THE System SHALL allow Admins to mark products as active or inactive

### Requirement 14: Manage Orders as Admin

**User Story:** As an Admin, I want to view and manage customer orders, so that I can fulfill purchases and track order status.

#### Acceptance Criteria

1. THE System SHALL display a list of all Orders in the admin dashboard
2. THE System SHALL allow Admins to filter Orders by Order_Status
3. FOR EACH Order, THE System SHALL display order number, customer name, date, Order_Status, and total
4. WHEN an Admin selects an Order, THE System SHALL display complete order details including items, quantities, delivery address, and contact information
5. THE System SHALL allow Admins to update Order_Status (pending confirmation → confirmed → completed or cancelled)
6. WHEN an Admin updates Order_Status, THE System SHALL record the timestamp of the status change

### Requirement 15: Apply Warm Editorial Design Aesthetic

**User Story:** As a Customer, I want the website to have a warm, inviting aesthetic that reflects a quality bakery brand, so that I feel confident purchasing from the business.

#### Acceptance Criteria

1. THE System SHALL use cream/off-white as the primary background color
2. THE System SHALL use warm orange/terracotta as the accent color
3. THE System SHALL use dark espresso-brown for dark sections
4. THE System SHALL use a serif display font (Playfair Display or similar) for headings
5. THE System SHALL use a clean sans-serif font for body text
6. THE System SHALL display bordered/boxed navigation bar
7. THE System SHALL display rounded pill-shaped buttons
8. THE System SHALL display product images with appropriate aspect ratios and quality

### Requirement 16: Navigate Site Structure

**User Story:** As a Customer, I want clear navigation throughout the site, so that I can easily move between sections.

#### Acceptance Criteria

1. THE System SHALL display a persistent navigation bar at the top of all pages
2. THE System SHALL display navigation links to Home, Shop, Our Story, and Cart
3. WHEN an Authenticated_Customer is logged in, THE System SHALL display links to Order History and Logout
4. WHEN no Customer is logged in, THE System SHALL display links to Login and Register
5. THE System SHALL highlight the current page in the navigation
6. THE System SHALL display a footer with contact information, social media links, and newsletter signup

### Requirement 17: Subscribe to Newsletter

**User Story:** As a Customer, I want to subscribe to the bakery's newsletter, so that I can receive updates about new products and promotions.

#### Acceptance Criteria

1. THE System SHALL display a newsletter signup form in the footer
2. THE System SHALL collect email address for newsletter subscription
3. WHEN a Customer submits the form, THE System SHALL validate the email format
4. WHEN validation passes, THE System SHALL store the email in the Database
5. THE System SHALL display a confirmation message after successful subscription
6. THE System SHALL prevent duplicate subscriptions for the same email

### Requirement 18: Handle Product Stock Availability

**User Story:** As a Customer, I want to see if products are in stock, so that I know what I can order.

#### Acceptance Criteria

1. WHERE a Product has limited stock, THE System SHALL display remaining quantity
2. WHEN a Product is out of stock, THE System SHALL display "Out of Stock" and disable the add-to-cart button
3. WHEN a Customer attempts to add quantity exceeding available stock, THE System SHALL display an error message
4. THE System SHALL update stock quantities in the Database when Orders are created
5. THE System SHALL validate stock availability during checkout before creating an Order

### Requirement 19: Provide Responsive Mobile Experience

**User Story:** As a Customer using a mobile device, I want the website to work well on my phone, so that I can browse and purchase products conveniently.

#### Acceptance Criteria

1. THE System SHALL display a responsive layout that adapts to mobile screen sizes
2. THE System SHALL display a mobile-friendly navigation menu (hamburger menu or similar)
3. THE System SHALL display product grids in single-column layout on mobile devices
4. THE System SHALL ensure form inputs and buttons are appropriately sized for touch interaction
5. THE System SHALL maintain readability of text content on small screens

### Requirement 20: Persist Data in Database

**User Story:** As the system owner, I want all application data stored in a reliable database, so that data persists across sessions and server restarts.

#### Acceptance Criteria

1. THE System SHALL use PostgreSQL as the Database
2. THE System SHALL store Products with all variants and metadata
3. THE System SHALL store Customer accounts with hashed passwords
4. THE System SHALL store Orders with all associated items and status history
5. THE System SHALL store Cart data for Authenticated_Customers
6. THE System SHALL store newsletter subscriptions
7. THE System SHALL use proper database constraints for data integrity (foreign keys, not null, unique)

## Stage 1 Implementation Focus

The initial implementation (Stage 1) SHALL prioritize:
- Complete product catalog with variant toggling and custom package builder
- Shopping cart functionality (add, view, modify)
- Secure customer authentication with password hashing
- Checkout flow that creates Order in Database with status "pending confirmation"
- WhatsApp_Link generation with pre-filled order details
- Basic admin dashboard for viewing and managing orders
- Product management interface for admins
- Responsive design with warm editorial aesthetic

Future stages (Stage 2 and Stage 3) will add:
- Stage 2: Bank transfer proof upload and admin approval workflow
- Stage 3: Payment gateway integration (Midtrans or Xendit)
