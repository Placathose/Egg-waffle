const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');

const fetch = require('node-fetch');

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// POST /api/quiz
router.post('/', async (req, res) => {
  try {
    // Fetch the latest summaries or a subset (optional: limit to 10)
    const summaries = await Summary.find().sort({ createdAt: -1 }).limit(10);

    // Format key terms into a string to send as prompt
    const keyTerms = summaries.flatMap(summary => summary.keyTerms);
    const promptTerms = keyTerms.map(term =>
      `${term.eng} (${term.character}): ${term.jyutpin}`
    ).join('\n');

    const systemPrompt = `You are a helpful Cantonese quiz generator. 
Based on the following vocabulary, create a JSON quiz with multiple choice questions. 
Each question should test the user’s memory of vocabulary (either English, Chinese character, or Jyutping).

Use this format:
[
  {
    "question": "...",
    "choices": ["...", "...", "...", "..."],
    "answer": "..."
  },
  ...
]`;

    const fullPrompt = `Vocabulary:\n${promptTerms}`;

    // Send to DeepSeek API (GPT-compatible)
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: fullPrompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Try to parse it as JSON
    let quiz = [];
    try {
      quiz = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({ error: 'Quiz format is invalid', raw: content });
    }

    res.json({ quiz });
  } catch (err) {
    console.error('Error generating quiz:', err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

module.exports = router;
