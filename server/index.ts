import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import productsRouter from './routes/products';
import collectionsRouter from './routes/collections';
import cartRouter from './routes/cart';
import searchRouter from './routes/search';
import checkoutRouter from './routes/checkout';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like file://, mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow configured origins
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:5500',
      'http://127.0.0.1:5500'
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development (change for production)
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'kickspire-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/search', searchRouter);
app.use('/api/checkout', checkoutRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KICKSPIRE API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🛍️  Products API: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Cart API: http://localhost:${PORT}/api/cart`);
});

export default app;
