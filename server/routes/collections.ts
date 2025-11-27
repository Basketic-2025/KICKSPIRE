import { Router } from 'express';
import prisma from '../db';

const router = Router();

// GET /api/collections - List all collections
router.get('/', async (req, res) => {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
          orderBy: {
            displayOrder: 'asc',
          },
        },
      },
    });

    const formatted = collections.map(c => ({
      slug: c.slug,
      title: c.title,
      hero: c.hero,
      description: c.description,
      products: c.products.map(cp => cp.productId),
    }));

    res.json({
      collections: formatted,
      meta: {
        total: collections.length,
      },
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// GET /api/collections/:slug - Get collection with products
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            product: true,
          },
          orderBy: {
            displayOrder: 'asc',
          },
        },
      },
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const products = collection.products.map(cp => ({
      id: cp.product.id,
      title: cp.product.title,
      price: cp.product.price,
      category: cp.product.category,
      colors: JSON.parse(cp.product.colors),
      sizes: JSON.parse(cp.product.sizes),
      popularity: cp.product.popularity,
      badge: cp.product.badge,
      image: cp.product.image,
      desc: cp.product.description,
      limited: cp.product.limited,
    }));

    res.json({
      slug: collection.slug,
      title: collection.title,
      hero: collection.hero,
      description: collection.description,
      products,
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

export default router;
