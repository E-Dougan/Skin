import { dbRun } from './config/database';

export const seedDatabase = async () => {
  try {
    // Sample products
    const products = [
      {
        name: 'Gentle Hydrating Cleanser',
        description: 'A gentle, sulfate-free cleanser that removes impurities without stripping natural moisture.',
        price: 24.99,
        category: 'Cleanser',
        skin_types: '["dry", "normal", "combination"]',
        ingredients: 'Water, Glycerin, Sodium Laureth Sulfate, Cocamide MEA, PEG-120 Methyl Glucose Dioleate',
        image_url: 'https://example.com/cleanser.jpg'
      },
      {
        name: 'Vitamin C Brightening Serum',
        description: 'Powerful antioxidant serum that brightens skin tone and reduces the appearance of fine lines.',
        price: 45.99,
        category: 'Treatment',
        skin_types: '["normal", "combination", "oily"]',
        ingredients: 'Water, Ascorbic Acid, Hyaluronic Acid, Vitamin E, Ferulic Acid',
        image_url: 'https://example.com/serum.jpg'
      },
      {
        name: 'SPF 50 Mineral Sunscreen',
        description: 'Broad-spectrum protection with zinc oxide for sensitive skin.',
        price: 32.99,
        category: 'Sunscreen',
        skin_types: '["all"]',
        ingredients: 'Zinc Oxide, Titanium Dioxide, Shea Butter, Vitamin E, Green Tea Extract',
        image_url: 'https://example.com/sunscreen.jpg'
      },
      {
        name: 'Nourishing Night Cream',
        description: 'Rich, restorative cream that works overnight to repair and rejuvenate skin.',
        price: 38.99,
        category: 'Moisturizer',
        skin_types: '["dry", "normal", "mature"]',
        ingredients: 'Water, Shea Butter, Jojoba Oil, Vitamin A, Vitamin C, Hyaluronic Acid',
        image_url: 'https://example.com/cream.jpg'
      },
      {
        name: 'Salicylic Acid Acne Treatment',
        description: 'Targeted treatment for acne-prone skin with 2% salicylic acid.',
        price: 28.99,
        category: 'Treatment',
        skin_types: '["oily", "combination", "acne"]',
        ingredients: 'Water, Salicylic Acid, Witch Hazel, Tea Tree Oil, Allantoin',
        image_url: 'https://example.com/acne-treatment.jpg'
      }
    ];

    for (const product of products) {
      await dbRun(
        `INSERT OR IGNORE INTO products (name, description, price, category, skin_types, ingredients, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.skin_types,
          product.ingredients,
          product.image_url
        ]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};