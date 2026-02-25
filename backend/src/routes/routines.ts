import express from 'express';
import { dbRun, dbAll, dbGet } from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get user's routines
router.get('/', authenticateToken, async (req, res) => {
  try {
    const routines = await dbAll(
      'SELECT * FROM routines WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ routines });
  } catch (error) {
    console.error('Get routines error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new routine
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, steps, frequency } = req.body;

    const result = await dbRun(
      'INSERT INTO routines (user_id, name, steps, frequency) VALUES (?, ?, ?, ?)',
      [req.user.id, name, JSON.stringify(steps), frequency]
    );

    res.status(201).json({
      routineId: result.lastID,
      message: 'Routine created successfully'
    });
  } catch (error) {
    console.error('Create routine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update routine progress
router.put('/:id/progress', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed_steps } = req.body;

    await dbRun(
      'UPDATE routines SET completed_steps = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
      [JSON.stringify(completed_steps), id, req.user.id]
    );

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete routine
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await dbRun('DELETE FROM routines WHERE id = ? AND user_id = ?', [id, req.user.id]);

    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error('Delete routine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;