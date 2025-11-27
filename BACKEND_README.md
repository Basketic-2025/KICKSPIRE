# KICKSPIRE Backend Setup

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Seed database with initial data
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

The API will run on http://localhost:3001

### 4. Start Frontend
Open the HTML files in a browser using Live Server or similar tool.

## API Endpoints

### Products
- `GET /api/products` - List products (with filters: category, size, color, sort, page, pageSize)
- `GET /api/products/:id` - Get single product

### Collections
- `GET /api/collections` - List all collections
- `GET /api/collections/:slug` - Get collection with products

### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/items/:id` - Update cart item quantity
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Search
- `GET /api/search?q=query` - Search products

### Checkout
- `POST /api/checkout` - Create checkout session
- `POST /api/checkout/complete` - Complete order

## Database Management

```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database
npx prisma db push --force-reset
npm run db:seed
```

## Environment Variables

See `.env.example` for required environment variables.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: SQLite (via Prisma ORM)
- **Session**: express-session

## Notes

- Cart sessions expire after 7 days
- No authentication required (session-based carts)
- CORS enabled for localhost:5500 and 127.0.0.1:5500
