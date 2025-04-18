const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  size: {
    type: Number,
    max: 1024 * 1024 // 1MB limit
  },
  originalName: String
});

const keyTermSchema = new mongoose.Schema({
  eng: String,
  jyutpin: String,
  character: String
});

const summarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  summary: { type: String, required: true },
  keyTerms: [keyTermSchema],
  image: imageSchema // Changed from images[] to single image
}, { 
  timestamps: true
});

// Remove the 200-image limit pre-hook since we're only storing one image
module.exports = mongoose.model('Summary', summarySchema);