const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');
const { upload, parseFormData } = require('../middlewares/upload');

// Display form (if still needed for server-side rendering)
router.get('/add-summary', (req, res) => {
  res.render('add-summary', { 
    data: { title: 'Add New Summary' } 
  });
});

// Add new summary (single image)
router.post('/addSummary', 
  upload.single('image'), // Changed to .single() for one file
  parseFormData,
  async (req, res) => {
    try {
      const { date, summary, englishTerms, jyutpinTerms, characterTerms } = req.body;
      
      // Process terms
      const keyTerms = englishTerms.split(',')
        .map((eng, i) => ({
          eng: eng.trim(),
          jyutpin: jyutpinTerms.split(',')[i]?.trim() || '',
          character: characterTerms.split(',')[i]?.trim() || ''
        }));

      // Process single image
      const image = req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        size: req.file.size,
        originalName: req.file.originalname
      } : null;

      const newSummary = new Summary({
        date,
        summary,
        keyTerms,
        image // Store single image (not array)
      });

      await newSummary.save();
      res.status(201).json({ 
        success: true, 
        summary: newSummary 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
);

// Get all summaries
router.get('/getAllSummaries', async (req, res) => {
  try {
    const summaries = await Summary.find()
      .select('-image.data') // Changed to singular 'image'
      .sort({ createdAt: -1 });
    res.json({ success: true, summaries });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;