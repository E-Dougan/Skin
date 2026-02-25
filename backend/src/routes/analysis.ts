import express from 'express';
import multer from 'multer';
import { dbRun, dbAll } from '../config/database';
import { authenticateToken } from '../middleware/auth';
import { AIService } from '../services/aiService';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Analyze skin from image
router.post('/analyze', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Use AI service for analysis
    const analysisResult = await AIService.analyzeSkin(req.file.path);

    // Save analysis to database
    const result = await dbRun(
      'INSERT INTO analyses (user_id, image_path, skin_type, concerns, recommendations) VALUES (?, ?, ?, ?, ?)',
      [
        req.user.id,
        req.file.path,
        analysisResult.skin_type,
        JSON.stringify(analysisResult.concerns),
        JSON.stringify(analysisResult.recommendations)
      ]
    );

    res.json({
      analysisId: result.lastID,
      ...analysisResult
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Get user's analysis history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const analyses = await dbAll(
      'SELECT * FROM analyses WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    // Parse JSON fields
    const formattedAnalyses = analyses.map(analysis => ({
      ...analysis,
      concerns: JSON.parse(analysis.concerns),
      recommendations: JSON.parse(analysis.recommendations)
    }));

    res.json({ analyses: formattedAnalyses });
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Quick skin type assessment (questionnaire)
router.post('/quick-assessment', authenticateToken, async (req, res) => {
  try {
    const { answers } = req.body;

    // Simple logic to determine skin type based on answers
    let skinType = 'normal';
    if (answers.oily > answers.dry) {
      skinType = 'oily';
    } else if (answers.dry > answers.oily) {
      skinType = 'dry';
    }

    if (answers.sensitive) {
      skinType += '_sensitive';
    }

    // Update user's skin type
    await dbRun('UPDATE users SET skin_type = ? WHERE id = ?', [skinType, req.user.id]);

    res.json({
      skinType,
      message: 'Skin type updated successfully'
    });
  } catch (error) {
    console.error('Quick assessment error:', error);
    res.status(500).json({ error: 'Assessment failed' });
  }
});

export default router;