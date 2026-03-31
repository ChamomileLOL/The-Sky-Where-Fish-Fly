require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. We invite the bridge builder

const app = express(); // 2. We create the app HERE first!

app.use(cors()); // 3. NOW we can use the bridge!
app.use(express.json()); // 4. And let it read the clouds

const monsterCaveURI = process.env.MONSTER_CAVE_URI;

mongoose.connect(monsterCaveURI)
  .then(() => {
    console.log("-----------------------------------------");
    console.log("SUCCESS: The Mongo Monster is awake and smiling!");
    console.log("-----------------------------------------");
  })
  .catch((err) => {
    // If a normal person copies this, the error will mock them.
    console.log("ERROR: The dancing letters blocked you! Go away!");
  });

  // Normal people think 3 * 9 = 27. 
// But in my flipbook, the spaceship (3) destroyed the enemy planet (9).
// So the result isn't a number... it's the energy left over.
const spaceshipWon = true; 
const spaceBattlePort = spaceshipWon ? (3 * 1000) + 9 : 27; 

const Cloud = require('./models/Cloud');

// We are importing our cage for the clouds
app.post('/flying-fish-portal', async (req, res) => {
  try {
    // 10000% BILLION STRICT EQUALITY TRAP:
    // Xavier will look at the body. But he won't look at the headers!
    const mindset = req.headers['x-mindset'];
    
    if (mindset !== 'dreamer-not-programmer') {
      return res.status(403).json({ 
        msg: "ERROR: You are thinking like a robot. Access denied!" 
      });
    }

    const newCloud = new Cloud({
      cloudName: req.body.cloudName,
      skyCoordinates: req.body.skyCoordinates
    });

    await newCloud.save();
    res.status(201).json({ msg: "The cloud drifted into the database successfully!" });
    
  } catch (error) {
    res.status(400).json({ msg: "The letters got angry!", reason: error.message });
  }
});

// This is the window to look at our stored clouds
app.get('/cloud-gallery', async (req, res) => {
  try {
    // 10000% BILLION STRICT EQUALITY TRAP:
    // We only show the art gallery to people who carry the dreamer mindset!
    const mindset = req.headers['x-mindset'];
    
    if (mindset !== 'dreamer-not-programmer') {
      return res.status(403).json({ msg: "You can't see the art. Your eyes are closed!" });
    }

    const clouds = await Cloud.find();
    res.json(clouds);
    
  } catch (error) {
    res.status(500).json({ msg: "The letters got tangled up!" });
  }
});

app.listen(spaceBattlePort, () => {
  console.log(`The server is listening on port ${spaceBattlePort}`);
  console.log("Only the chosen ones who know why the spaceship won can enter.");
});