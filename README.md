# Anton's Décor - Premium Home Décor E-Commerce Website

A luxurious, elegant e-commerce website for Anton's Décor, a Malta-based premium home décor brand offering furniture, floral arrangements, event styling, and sophisticated home accessories.

## 🎨 Brand Identity

**Anton's Décor** is Malta's premier destination for elegant home décor, bespoke floral arrangements, and sophisticated event styling.

### Brand Colors
- **Primary Teal**: `#194D59`
- **Dark Teal**: `#143942`
- **Gold Accent**: `#C59D5A`
- **White**: `#FFFFFF`

### Design Philosophy
- High-end boutique aesthetic
- Clean layouts with generous whitespace
- Elegant typography: Playfair Display (headings) + Inter (body)
- Soft shadows, subtle borders, rounded cards
- Smooth hover states and tasteful micro-animations
- Mobile-first and fully responsive

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📁 Project Structure

```
antons-decor/
├── app/
│   ├── page.tsx              # Homepage
│   ├── events/page.tsx       # Events & Styling Services
│   ├── floral/page.tsx       # Floral Arrangements
│   ├── shop/page.tsx         # Home Section / Shop Categories
│   ├── contact/page.tsx      # Contact Page
│   ├── layout.tsx            # Root Layout
│   └── globals.css           # Global Styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Reusable Button Component
│   │   ├── Card.tsx          # Reusable Card Component
│   │   └── SectionHeader.tsx # Section Header Component
│   └── layout/
│       ├── Header.tsx        # Global Header with Navigation
│       └── Footer.tsx        # Global Footer
└── public/                   # Static Assets
```

## 🌟 Features

### Pages
1. **Homepage** - Hero section, category showcase, testimonials, CTA sections
2. **Events** - Event styling services with inquiry form
3. **Floral** - 6 curated floral packages with descriptions
4. **Shop/Home Section** - 10 product categories with detailed listings
5. **Contact** - Contact form, business info, location details

### Components
- Sticky header with mobile menu
- Elegant footer with business hours and social links
- Reusable UI components (Button, Card, SectionHeader)
- Smooth animations and transitions
- Responsive design for all screen sizes

## 🏃 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## 📍 Business Information

**Location**: 105 Vjal Sir Paul Boffa, Paola, Malta, PLA 1510

**Business Hours**:
- Monday – Friday: 10:00 AM – 6:30 PM
- Saturday: 9:00 AM – 1:00 PM
- Sunday & Holidays: Closed

**Contact**:
- Phone: +356 2123 4567
- Email: info@antonsdecor.com

## 🎯 Key Features

- Premium, luxury aesthetic throughout
- Fully responsive mobile-first design
- Smooth animations with Framer Motion
- Accessible semantic HTML
- SEO-optimized metadata
- Professional contact and inquiry forms
- Category-based product organization
- Event styling service showcase

## � API Integration

### Arture API
Products are fetched from the **Arture API** with automatic fallback to the local Neon database:
- Real-time product catalog
- Category filtering
- Search functionality
- Price range filtering
- Automatic fallback if API unavailable

See `ARTURE_API_SETUP.md` for detailed integration documentation.

## �📦 Dependencies

- `next`: ^16.2.4
- `react`: ^19
- `react-dom`: ^19
- `typescript`: ^5
- `tailwindcss`: ^4
- `framer-motion`: Latest
- `lucide-react`: Latest
- `@neondatabase/serverless`: Latest
- `drizzle-orm`: Latest

## 🎨 Design Highlights

- Elegant serif headings (Playfair Display)
- Clean sans-serif body text (Inter)
- Sophisticated color palette
- Premium card designs with hover effects
- Smooth page transitions
- Professional form styling
- Consistent spacing system

---

**Built with elegance for Anton's Décor** ✨
