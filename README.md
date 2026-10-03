# AURA OBJECTS — E-Commerce Product Catalog Capstone

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite)](https://vitejs.dev)

A modern, responsive, production-ready E-Commerce Product Catalog web application developed as a Full-Stack Web Development Capstone Project. Built with a modular React architecture, client-side routing, live multi-criteria filtering, local storage persistence, responsive mobile-first design, and resilient asset handling.

---

## 🌐 Live Deployments & Repository Links

- **Live Application URL**: [https://ais-pre-qakedgi53mxkzb4b3jvw2o-217696500846.asia-southeast1.run.app](https://ais-pre-qakedgi53mxkzb4b3jvw2o-217696500846.asia-southeast1.run.app)
- **Development Preview**: [https://ais-dev-qakedgi53mxkzb4b3jvw2o-217696500846.asia-southeast1.run.app](https://ais-dev-qakedgi53mxkzb4b3jvw2o-217696500846.asia-southeast1.run.app)
- **GitHub Repository**: `https://github.com/aura-objects/ecommerce-catalog-capstone`

---

## 📸 Screenshots & UI Walkthrough

### 1. Storefront Editorial Hero & Highlights
The landing page features a minimalist editorial layout showcasing architectural acoustic equipment and artisanal ceramics, with real-time stock indicators and direct paths into the catalog.

### 2. Interactive Product Catalog & Multi-Criteria Filtering
- **Instant Search**: Real-time filtering across product names, descriptions, categories, and material keywords.
- **Segmented Categories**: Acoustics & Audio, Ceramics & Vessels, Luminaires & Lighting, Workspace Rituals, and Objects.
- **Price Range & Stock**: Dynamic price slider ($0–$600) and an instant in-stock toggle.
- **Sorting Modes**: Editorial Highlights, Price (Low to High, High to Low), Rating, and Alphabetical.

### 3. Contiguous Purchase Module (Product Detail Page)
- High-fidelity image gallery with multi-angle previews and zero-broken-image fallbacks.
- Live inventory tracker showing remaining available units.
- Material/color finish selectors and quantity stepper.
- Technical specifications, architectural features, material care, and verified customer evaluations.

### 4. Persistent Shopping Bag & Checkout Flow
- Slide-over quick bag drawer with free shipping progress threshold ($200 target).
- Persistent state across reloads via `localStorage`.
- Promotional voucher system (`CAPSTONE10` for 10% off).
- Interactive checkout modal with delivery validation and official order receipt generation.
- Order history archive view accessible directly from the cart page.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Modular Architecture** | Cleanly separated into `components/`, `pages/`, `context/`, `hooks/`, `data/`, and `types/`. |
| **Client-Side Routing** | Zero-dependency hash routing supporting deep links (`#/products`, `#/product/:slug`, `#/cart`, `#/about`). |
| **Persistent Cart** | Persists all bag items, quantities, promo discounts, and completed order receipts in `localStorage`. |
| **Resilient Imagery** | `LazyImage` wrapper enforcing `referrerPolicy="no-referrer"` with styled SVG/CSS fallback states. |
| **Anti-Slop Design** | Adheres to human-designed typography (`Syne` + `Plus Jakarta Sans`), 60-30-10 color discipline, and zero-pill metadata. |
| **Checkout Simulation** | Complete client-side checkout handling Card, Apple Pay, and Cash on Delivery (COD) with printable receipts. |
| **Mobile-First Responsive** | Custom mobile slide-in menu, fluid responsive grids, and touch-friendly steppers. |

---

## 📂 Project Architecture

```
├── public/
├── src/
│   ├── assets/
│   │   └── images/              # High-fidelity generated product & hero imagery
│   ├── components/
│   │   ├── common/
│   │   │   ├── Breadcrumbs.tsx  # Semantic navigation breadcrumb trail
│   │   │   ├── LazyImage.tsx    # Resilient image with skeleton & SVG fallback
│   │   │   ├── Modal.tsx        # Accessible dialog wrapper with keyboard support
│   │   │   └── Toast.tsx        # Non-intrusive feedback toast notifications
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.tsx # Dismissible top promotion notice
│   │   │   ├── Header.tsx       # Top Bar Contract (Wordmark, Nav links, Bag counter)
│   │   │   └── Footer.tsx       # Semantic footer with brand dispatch & links
│   │   ├── product/
│   │   │   ├── ProductCard.tsx  # Product card with hover inspect & quick-add
│   │   │   ├── ProductFilters.tsx # Category, price, search, and sort controls
│   │   │   ├── ProductGrid.tsx  # Responsive grid with loading & empty states
│   │   │   ├── QuickViewModal.tsx # Fast inspect modal without leaving catalog
│   │   │   └── RelatedProducts.tsx # Curated complementary recommendations
│   │   └── cart/
│   │       ├── CartDrawer.tsx   # Slide-over bag with free shipping progress
│   │       ├── CartItemRow.tsx  # Line item stepper, price, and delete action
│   │       └── CheckoutModal.tsx # Full checkout form, validation & printable receipt
│   ├── context/
│   │   ├── CartContext.tsx      # LocalStorage cart state, promo codes & orders
│   │   └── RouterContext.tsx    # Client-side router with deep linking
│   ├── data/
│   │   └── products.ts          # Structured product database, reviews, and promos
│   ├── hooks/
│   │   └── useProducts.ts       # Product filtering, sorting, and search logic
│   ├── pages/
│   │   ├── HomePage.tsx         # Campaign hero, signature highlights & philosophy
│   │   ├── ProductsPage.tsx     # Full catalog with live filters & search
│   │   ├── ProductDetailPage.tsx # Contiguous purchase module, specs & reviews
│   │   ├── CartPage.tsx         # Full-page cart experience & order history
│   │   └── AboutContactPage.tsx # Atelier story, contact concierge & FAQ
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for products, cart & orders
│   ├── App.tsx                  # Root layout shell and route dispatcher
│   ├── index.css                # Tailwind CSS v4 setup & typography tokens
│   └── main.tsx                 # React DOM entry point
├── index.html                   # HTML5 entry with fonts, SEO & OpenGraph meta tags
├── metadata.json                # Project identity and capabilities configuration
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript strict configuration
└── vite.config.ts               # Vite configuration with Tailwind CSS plugin
```

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Functional Components, Hooks, Context API)
- **Language**: TypeScript 5.4+ (Strict typing across products, cart, and filters)
- **Styling**: Tailwind CSS v4 with custom `@theme` configuration
- **Icons**: Lucide React
- **Build Tool**: Vite 8.3
- **State Persistence**: Browser `localStorage` API

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aura-objects/ecommerce-catalog-capstone.git
   cd ecommerce-catalog-capstone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🚢 Production Build & Deployment

### Build for Production
To generate optimized static assets:
```bash
npm run build
```
This produces a production-ready `/dist` bundle with optimized chunks and assets.

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the CLI prompts to deploy the static Vite build.

### Deploying to Netlify
1. Connect your GitHub repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploying to Render
1. Create a new **Static Site** on Render.
2. Build command: `npm run build`
3. Publish directory: `./dist`

---

## 🏷️ Test Promotional Codes

- `CAPSTONE10` — 10% discount on order subtotal
- `AURA20` — 20% discount on order subtotal
- `WELCOME5` — 5% discount on order subtotal

---

## 📜 License & Acknowledgments

Distributed under the Apache 2.0 License. Developed as a Web Development Capstone Project.
