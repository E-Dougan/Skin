import express from 'express';
import { dbRun, dbGet } from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, skin_type } = req.body;

    await dbRun(
      'UPDATE users SET name = ?, skin_type = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, skin_type, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet(
      'SELECT id, email, name, skin_type, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;