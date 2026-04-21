# 🚀 Quick Start - Database Setup

## Step 1: Create .env.local file

Create a file named `.env.local` in the project root and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_71QJCPpiaXNy@ep-patient-grass-abl4ltl7-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Step 2: Run these commands

```bash
# Push database schema to Neon
npm run db:push

# Seed database with products
npm run db:seed

# Start the development server
npm run dev
```

## ✅ That's it!

Your shop will now load products from the Neon database at http://localhost:3000/shop

## 🎯 What's been set up:

- ✅ Neon PostgreSQL database connection
- ✅ Drizzle ORM for type-safe queries
- ✅ Database schema (products, categories, orders, inquiries)
- ✅ API routes for fetching products
- ✅ Seed script with 20 sample products
- ✅ 7 product categories

## 📊 View your data:

```bash
npm run db:studio
```

Opens Drizzle Studio at http://localhost:4983
