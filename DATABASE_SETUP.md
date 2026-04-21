# 🗄️ Neon Database Setup Guide

This guide will help you set up and connect your Anton's Décor application to a Neon PostgreSQL database.

## 📋 Prerequisites

- Neon account (https://neon.tech)
- Your Neon database connection string

## 🚀 Setup Steps

### 1. Create Environment File

Create a `.env.local` file in the project root:

```bash
# In the project root directory
touch .env.local
```

Add your Neon connection string to `.env.local`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_71QJCPpiaXNy@ep-patient-grass-abl4ltl7-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Generate and Push Database Schema

Generate the migration files:

```bash
npm run db:generate
```

Push the schema to your Neon database:

```bash
npm run db:push
```

This will create the following tables:
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `inquiries` - Event and contact inquiries

### 3. Seed the Database

Populate your database with initial data:

```bash
npm run db:seed
```

This will insert:
- 7 product categories (Furniture, Lighting, Decorative, Floral, Textiles, Ambiance, Glassware)
- 20 premium products with prices, ratings, and descriptions

### 4. Verify Setup (Optional)

Open Drizzle Studio to view your database:

```bash
npm run db:studio
```

This opens a visual interface at http://localhost:4983 where you can browse and edit your data.

## 📊 Database Schema

### Categories Table
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly slug
- `description` - Category description
- `created_at` - Timestamp

### Products Table
- `id` - Primary key
- `name` - Product name
- `slug` - URL-friendly slug
- `description` - Product description
- `price` - Decimal price
- `category_id` - Foreign key to categories
- `rating` - Integer rating (1-5)
- `in_stock` - Boolean availability
- `image_url` - Product image URL
- `featured` - Boolean featured flag
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Orders Table
- `id` - Primary key
- `customer_name` - Customer name
- `customer_email` - Customer email
- `customer_phone` - Customer phone
- `total_amount` - Order total
- `status` - Order status (pending, confirmed, shipped, delivered)
- `created_at` - Timestamp

### Order Items Table
- `id` - Primary key
- `order_id` - Foreign key to orders
- `product_id` - Foreign key to products
- `quantity` - Item quantity
- `price` - Item price at time of order

### Inquiries Table
- `id` - Primary key
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone
- `event_type` - Type of event
- `event_date` - Event date
- `location` - Event location
- `message` - Inquiry message
- `status` - Inquiry status (new, contacted, completed)
- `created_at` - Timestamp

## 🔧 Available Commands

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio
npm run db:studio

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

## 🔒 Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Keep your database credentials secure
- Use environment variables for production deployments

## 🌐 Neon Dashboard

Access your Neon dashboard at: https://console.neon.tech

From there you can:
- View database metrics
- Manage connections
- Create backups
- Monitor queries
- Scale your database

## 📝 Next Steps

After setup, the application will:
- Load products from the database
- Support filtering and searching
- Track orders and inquiries
- Store customer data securely

All database operations are handled through Drizzle ORM for type safety and optimal performance.

## ❓ Troubleshooting

**Connection Error:**
- Verify your DATABASE_URL in `.env.local`
- Check Neon dashboard for database status
- Ensure your IP is allowed (Neon allows all by default)

**Migration Issues:**
- Delete the `drizzle` folder and run `npm run db:generate` again
- Check for syntax errors in `lib/schema.ts`

**Seed Fails:**
- Ensure tables are created with `npm run db:push` first
- Check for duplicate data if re-seeding

## 🎉 Success!

Your Anton's Décor application is now connected to Neon PostgreSQL! 

Visit http://localhost:3000/shop to see products loaded from your database.
