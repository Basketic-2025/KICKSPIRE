import { Router } from 'express';
import { productService } from '../services/productService';

const router = Router();

// GET /api/search?q=query
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const results = await productService.searchProducts(q);

    res.json({
      query: q,
      results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

export default router;
