import express from 'express';
import { dbAll, dbGet } from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await dbAll('SELECT * FROM products ORDER BY created_at DESC');
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [id]);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recommendations based on skin type
router.get('/recommend/:skinType', async (req, res) => {
  try {
    const { skinType } = req.params;
    const products = await dbAll(
      'SELECT * FROM products WHERE skin_types LIKE ? ORDER BY created_at DESC',
      [`%${skinType}%`]
    );
    res.json({ products });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Purchase product (mock e-commerce integration)
router.post('/:id/purchase', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity = 1, paymentMethod } = req.body;

    const product = await dbGet('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Mock payment processing
    const totalAmount = product.price * quantity;

    // In a real app, integrate with Stripe, PayPal, etc.
    // For now, simulate successful payment
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      success: true,
      orderId,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      },
      totalAmount,
      message: 'Purchase successful'
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;