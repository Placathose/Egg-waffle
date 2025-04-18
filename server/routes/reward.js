const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // built-in in node18+, else install

// GET /api/reward - returns a random Pokémon
router.get('/', async (req, res) => {
  try {
    const maxPokemonId = 898; // Gen 1–8
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await pokeRes.json();

    const pokemon = {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default
    };

    res.json(pokemon);
  } catch (err) {
    console.error('Error fetching Pokémon:', err);
    res.status(500).json({ error: 'Failed to fetch reward' });
  }
});

module.exports = router;
