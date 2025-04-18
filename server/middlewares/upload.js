const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024, // 1MB
    files: 10 // Max 10 images
  }
});

// Add this new middleware to handle text fields
const parseFormData = (req, res, next) => {
  try {
    // Ensure text fields exist
    const requiredFields = ['date', 'summary', 'englishTerms', 'jyutpinTerms', 'characterTerms'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  upload,
  parseFormData
};