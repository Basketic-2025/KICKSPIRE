<div align="center">

#  KICKSPIRE

### Move Different

*Premium sneaker e-commerce platform with modern design and seamless shopping experience*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Tech Stack](#-tech-stack)

</div>

---

##  Overview

KICKSPIRE is a full-stack sneaker e-commerce platform featuring a sleek, modern frontend and a robust Node.js backend. Built with performance and user experience in mind, it delivers a premium shopping experience with real-time cart management, advanced search, and dynamic product filtering.

###  Highlights

-  **Modern UI/UX** - Glassmorphism, smooth animations, and responsive design
-  **Smart Search** - Real-time autocomplete with product suggestions
-  **Session-Based Cart** - Persistent shopping cart without authentication
-  **Fully Responsive** - Optimized for mobile, tablet, and desktop
-  **Fast & Lightweight** - Vanilla JS frontend with optimized backend
-  **SEO Optimized** - Semantic HTML and proper meta tags

---

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- A modern web browser
- Live Server (VS Code extension) or any local server

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/kickspire.git
cd kickspire
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Setup database**
```bash
# Generate Prisma Client
npx prisma generate

# Create database schema
npx prisma db push

# Seed with sample data
npm run db:seed
```

4️⃣ **Start the backend**
```bash
npm run dev
```
> Backend runs on `http://localhost:3001`

5️⃣ **Start the frontend**
- Open `index.html` with Live Server, or
- Use any local server of your choice

 **That's it!** Navigate to your frontend URL and start shopping.

---

##  Project Structure

```
KICKSPIRE/
├── 📄 Frontend (Vanilla JS)
│   ├── index.html           # Landing page with hero section
│   ├── shop.html            # Product listing page
│   ├── collection.html      # Collection showcase with filters
│   ├── cart.html            # Shopping cart page
│   ├── story.html           # Brand story
│   ├── script.js            # Main JavaScript logic
│   └── styles.css           # Custom styles
│
├── 🔧 Backend (Node.js + TypeScript)
│   ├── server/
│   │   ├── index.ts         # Express server entry point
│   │   ├── db.ts            # Prisma client instance
│   │   ├── routes/          # API route handlers
│   │   │   ├── products.ts
│   │   │   ├── collections.ts
│   │   │   ├── cart.ts
│   │   │   ├── search.ts
│   │   │   └── checkout.ts
│   │   └── services/        # Business logic
│   │       ├── productService.ts
│   │       └── cartService.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Database seeding script
│   │
│   └── api/                 # JSON data stubs (legacy)
│
├── package.json
├── tsconfig.json
└── .env
```

---

##  Features

### Frontend Features

-  **Responsive Navigation** - Mobile-friendly hamburger menu
-  **Hero Section** - Eye-catching landing with 3D parallax effect
-  **Product Grid** - Filterable and sortable product listings
-  **Search with Autocomplete** - Real-time product search
-  **Shopping Cart** - Add, update, remove items with live totals
-  **Collections** - Curated product collections
-  **Free Shipping Badge** - Dynamic shipping threshold indicator
-  **Recently Viewed** - Track user browsing history
-  **Glassmorphism Effects** - Modern frosted glass UI elements
-  **Scroll Animations** - Intersection Observer-based reveals

### Backend Features

-  **RESTful API** - Clean, organized endpoint structure
-  **Session Management** - 7-day cart persistence
-  **Product Filtering** - By category, size, color, price
-  **Pagination & Sorting** - Efficient data retrieval
-  **Search Engine** - Full-text product search
-  **Cart Management** - Add, update, remove, clear operations
-  **Checkout Flow** - Order summary and completion
-  **CORS Support** - File protocol and localhost access
-  **Type Safety** - Full TypeScript implementation
-  **Database ORM** - Prisma for type-safe queries

---

##  API Documentation

### Base URL
```
http://localhost:3001/api
```

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all products with optional filters |
| `GET` | `/products/:id` | Get single product details |

**Query Parameters for `/products`:**
- `category` - Filter by category (urban, performance, night)
- `size` - Filter by shoe size (6-11)
- `color` - Filter by color (black, white, volt, crimson)
- `sort` - Sort order (popularity, price-asc, price-desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

**Example:**
```bash
GET /api/products?category=urban&size=9&sort=price-asc&page=1&pageSize=10
```

### Collections

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/collections` | List all collections |
| `GET` | `/collections/:slug` | Get collection with products |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cart` | Get current session cart |
| `POST` | `/cart/add` | Add item to cart |
| `PATCH` | `/cart/items/:id` | Update cart item quantity |
| `DELETE` | `/cart/items/:id` | Remove cart item |
| `DELETE` | `/cart` | Clear entire cart |

**Add to Cart Body:**
```json
{
  "productId": "urban-1",
  "quantity": 1,
  "size": "9",
  "color": "black"
}
```

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/search?q=query` | Search products by title/category/description |

### Checkout

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/checkout` | Create checkout session |
| `POST` | `/checkout/complete` | Complete order |

---

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CDN
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Syne typography

### Backend
- **Node.js** - JavaScript runtime
- **TypeScript** - Type safety
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **SQLite** - Embedded database
- **express-session** - Session management
- **CORS** - Cross-origin support
- **Zod** - Runtime validation
- **tsx** - TypeScript execution

---

##  Development

### Available Scripts

```bash
# Development
npm run dev          # Start backend with hot reload

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (GUI)

# Production
npm run build        # Build TypeScript
npm start            # Start production server
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3001
NODE_ENV=development

# Session
SESSION_SECRET="your-secure-random-string"

# CORS
CORS_ORIGIN="http://localhost:5500,http://127.0.0.1:5500"
```

---

##  Design System

### Color Palette
- **Primary**: `#BEF264` (Lime 400)
- **Background**: `#09090B` (Zinc 950)
- **Surface**: `#18181B` (Zinc 900)
- **Text**: `#FAFAFA` (Zinc 50)
- **Accent**: Gradient overlays and glassmorphism

### Typography
- **Headings**: Syne (Bold, Black)
- **Body**: Inter (Regular, Medium)

### Key Features
- Glassmorphism navigation
- Smooth scroll animations
- Hover micro-interactions
- Motion-safe fallbacks

---

##  Database Schema

```prisma
model Product {
  id          String
  title       String
  price       Float
  category    String
  colors      String[]
  sizes       String[]
  popularity  Int
  badge       String?
  image       String
  description String
  limited     Boolean
  stock       Int
}

model Collection {
  slug        String @unique
  title       String
  hero        String
  description String
  products    Product[]
}

model Cart {
  sessionId String @unique
  items     CartItem[]
  expiresAt DateTime
}

model CartItem {
  productId String
  quantity  Int
  size      String?
  color     String?
  price     Float
}
```

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---



## Acknowledgments

- Design inspiration from modern sneaker brands
- Product images from Unsplash
- Icons from Font Awesome
- Community feedback and contributions

---

<div align="center">

**Built with  for sneakerheads**

*Move Different. Shop Different.*

</div>
