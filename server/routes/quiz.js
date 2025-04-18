const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');

const fetch = require('node-fetch');

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const numberOfQuestions = 4;

// POST /api/quiz
router.get('/', async (req, res) => {
  try {
    // Fetch the latest summaries or a subset (optional: limit to 10)
    const summaries = await Summary.find().sort({ createdAt: -1 }).limit(10);

    // Format key terms into a string to send as prompt
    const keyTerms = summaries.flatMap(summary => summary.keyTerms);
    const promptTerms = keyTerms.map(term =>
      `${term.eng} (${term.character}): ${term.jyutpin}`
    ).join('\n');


    const systemPrompt = `You are a helpful Cantonese quiz generator. 
    Based on the following vocabulary, create a JSON quiz with multiple choice questions. Generate ${numberOfQuestions} questions.
    Each question should test the user’s memory of vocabulary (either English or Jyutping).Those would be the terms: ${promptTerms}. Make the questions interesting and funny using everyday life examples and link the example question to Hong Kong. Please do not return anything else than the json data. No paragraph, no explanation, no summary, Also no markdown format.Just Json plain data please. 

    Use this json format to return the question:
    [
      {
        "question": "...",
        "choices": ["...", "...", "...", "..."],
        "answer": "..."
      },
      ...
    ]`;

    // const fullPrompt = `Vocabulary:\n${promptTerms}`;

    // Send to DeepSeek API (GPT-compatible)
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL,
        messages: [
          // { role: "system", content: systemPrompt },
          { role: "user", content: systemPrompt }
        ],
        max_tokens: 500, 
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    console.log(content)
    // Try to parse it as JSON
    let quiz = [];
    try {
      quiz = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({ error: 'Quiz format is invalid', raw: content });
    }

    res.json({ quiz }); 
    console.log(res)
  } catch (err) {
    console.error('Error generating quiz:', err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

module.exports = router;
