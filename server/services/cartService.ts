import prisma from '../db';

export const cartService = {
  async getOrCreateCart(sessionId: string) {
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

      cart = await prisma.cart.create({
        data: {
          sessionId,
          expiresAt,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  },

  async addToCart(sessionId: string, productId: string, quantity: number = 1, size?: string, color?: string) {
    const cart = await this.getOrCreateCart(sessionId);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size: size || null,
        color: color || null,
      },
    });

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Create new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          size,
          color,
          price: product.price,
        },
      });
    }

    return this.getCart(sessionId);
  },

  async getCart(sessionId: string) {
    const cart = await this.getOrCreateCart(sessionId);

    const items = cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      title: item.product.title,
      price: item.price,
      qty: item.quantity,
      size: item.size,
      color: item.color,
      image: item.product.image,
      subtotal: item.price * item.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const shippingThreshold = 100;
    const shippingFree = subtotal >= shippingThreshold;
    const shipping = shippingFree ? 0 : 12;
    const tax = 0;
    const grandTotal = subtotal + shipping + tax;

    return {
      cartId: cart.id,
      items,
      totals: {
        subtotal,
        shipping,
        shippingThreshold,
        shippingFree,
        tax,
        grandTotal,
      },
    };
  },

  async updateCartItem(itemId: string, quantity: number) {
    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId },
      });
      return { success: true };
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return { success: true };
  },

  async removeCartItem(itemId: string) {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  },

  async clearCart(sessionId: string) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return { success: true };
  },

  async clearExpiredCarts() {
    const now = new Date();
    const expiredCarts = await prisma.cart.findMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });

    for (const cart of expiredCarts) {
      await prisma.cart.delete({
        where: { id: cart.id },
      });
    }

    return { deletedCount: expiredCarts.length };
  },
};
