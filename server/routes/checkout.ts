import { Router } from 'express';
import { cartService } from '../services/cartService';

const router = Router();

// POST /api/checkout - Create checkout session
router.post('/', async (req, res) => {
  try {
    const sessionId = req.session.id;
    const cart = await cartService.getCart(sessionId);

    if (cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    res.json({
      status: 'ok',
      cartId: cart.cartId,
      summary: {
        items: cart.items.length,
        subtotal: cart.totals.subtotal,
        shipping: cart.totals.shipping,
        tax: cart.totals.tax,
        grandTotal: cart.totals.grandTotal,
      },
      next: {
        paymentUrl: '/checkout/payment',
        reviewUrl: '/checkout/review',
      },
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

// POST /api/checkout/complete - Complete order
router.post('/complete', async (req, res) => {
  try {
    const sessionId = req.session.id;
    const { shippingAddress, billingAddress } = req.body;

    // In a real app, you'd process payment here
    // For now, just clear the cart and return success

    const cart = await cartService.getCart(sessionId);

    if (cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Clear cart after successful checkout
    await cartService.clearCart(sessionId);

    res.json({
      status: 'success',
      orderId: `ORDER-${Date.now()}`,
      message: 'Order placed successfully',
      summary: {
        items: cart.items.length,
        total: cart.totals.grandTotal,
      },
    });
  } catch (error) {
    console.error('Error completing checkout:', error);
    res.status(500).json({ error: 'Failed to complete checkout' });
  }
});

export default router;
