import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Read products from JSON
  const productsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../api/products.json'), 'utf-8')
  );

  // Seed products
  console.log('📦 Seeding products...');
  for (const product of productsData.products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        title: product.title,
        price: product.price,
        category: product.category,
        colors: JSON.stringify(product.colors),
        sizes: JSON.stringify(product.sizes),
        popularity: product.popularity,
        badge: product.badge,
        image: product.image,
        description: product.desc,
        limited: product.limited,
      },
      create: {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        colors: JSON.stringify(product.colors),
        sizes: JSON.stringify(product.sizes),
        popularity: product.popularity,
        badge: product.badge,
        image: product.image,
        description: product.desc,
        limited: product.limited,
      },
    });
  }
  console.log(`✅ Created ${productsData.products.length} products`);

  // Read collections from JSON
  const collectionsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../api/collections.json'), 'utf-8')
  );

  // Seed collections
  console.log('📚 Seeding collections...');
  for (const collection of collectionsData.collections) {
    const created = await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: {
        title: collection.title,
        hero: collection.hero,
        description: collection.description,
      },
      create: {
        slug: collection.slug,
        title: collection.title,
        hero: collection.hero,
        description: collection.description,
      },
    });

    // Link products to collection
    for (let i = 0; i < collection.products.length; i++) {
      const productId = collection.products[i];
      await prisma.collectionProduct.upsert({
        where: {
          collectionId_productId: {
            collectionId: created.id,
            productId: productId,
          },
        },
        update: {
          displayOrder: i,
        },
        create: {
          collectionId: created.id,
          productId: productId,
          displayOrder: i,
        },
      });
    }
  }
  console.log(`✅ Created ${collectionsData.collections.length} collections`);

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
