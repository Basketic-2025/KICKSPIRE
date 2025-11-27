import { Router } from 'express';
import { productService } from '../services/productService';

const router = Router();

// GET /api/products - List products with filters
router.get('/', async (req, res) => {
  try {
    const { category, size, color, sort = 'popularity', page = '1', pageSize = '10' } = req.query;

    const result = await productService.getProducts(
      {
        category: category as string,
        size: size as string,
        color: color as string,
      },
      {
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      },
      sort as string
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
