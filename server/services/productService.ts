import prisma from '../db';

interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
}

interface Pagination {
  page: number;
  pageSize: number;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}, pagination: Pagination = { page: 1, pageSize: 10 }, sort: string = 'popularity') {
    const { category, size, color } = filters;
    const { page, pageSize } = pagination;

    // Build where clause
    const where: any = {};
    if (category) {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: sort === 'price-asc' ? { price: 'asc' } :
        sort === 'price-desc' ? { price: 'desc' } :
          { popularity: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Filter by size and color in memory (since they're JSON arrays)
    let filtered = products.map((p: any) => ({
      ...p,
      colors: JSON.parse(p.colors),
      sizes: JSON.parse(p.sizes),
    }));

    if (size) {
      filtered = filtered.filter((p: any) => p.sizes.includes(size));
    }
    if (color) {
      filtered = filtered.filter((p: any) => p.colors.includes(color));
    }

    const total = await prisma.product.count({ where });

    return {
      meta: {
        page,
        pageSize,
        total,
        sort,
      },
      filters: {
        categories: ['urban', 'performance', 'night'],
        sizes: ['6', '7', '8', '9', '10', '11'],
        colors: ['black', 'white', 'volt', 'crimson'],
      },
      products: filtered.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        colors: p.colors,
        sizes: p.sizes,
        popularity: p.popularity,
        badge: p.badge,
        image: p.image,
        desc: p.description,
        limited: p.limited,
      })),
    };
  },

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      colors: JSON.parse(product.colors),
      sizes: JSON.parse(product.sizes),
      desc: product.description,
    };
  },

  async searchProducts(query: string) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
      orderBy: { popularity: 'desc' },
    });

    return products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
      colors: JSON.parse(p.colors),
      sizes: JSON.parse(p.sizes),
      image: p.image,
      desc: p.description,
    }));
  },
};
