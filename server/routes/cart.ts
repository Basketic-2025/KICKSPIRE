import { Router } from 'express';
import { cartService } from '../services/cartService';

const router = Router();

// GET /api/cart - Get current cart
router.get('/', async (req, res) => {
  try {
    const sessionId = req.session.id;
    const cart = await cartService.getCart(sessionId);
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart/add - Add item to cart
router.post('/add', async (req, res) => {
  try {
    const sessionId = req.session.id;
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    const cart = await cartService.addToCart(sessionId, productId, quantity, size, color);
    res.json(cart);
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message || 'Failed to add to cart' });
  }
});

// PATCH /api/cart/items/:id - Update cart item quantity
router.patch('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number') {
      return res.status(400).json({ error: 'quantity must be a number' });
    }

    await cartService.updateCartItem(id, quantity);
    const sessionId = req.session.id;
    const cart = await cartService.getCart(sessionId);
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE /api/cart/items/:id - Remove cart item
router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await cartService.removeCartItem(id);

    const sessionId = req.session.id;
    const cart = await cartService.getCart(sessionId);
    res.json(cart);
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// DELETE /api/cart - Clear cart
router.delete('/', async (req, res) => {
  try {
    const sessionId = req.session.id;
    await cartService.clearCart(sessionId);
    const cart = await cartService.getCart(sessionId);
    res.json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

export default router;
