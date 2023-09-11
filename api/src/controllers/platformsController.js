const axios = require('axios');
const { Platforms } = require('../db');
const { v4: uuidv4 } = require('uuid');

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const getAllPlatformsFromAPI = async () => {
  const URL_API = `${URL}/platforms?key=${API_KEY}`;
  const response = await axios.get(URL_API);
  const platformsArray = response.data.results.map((platform) => platform.name);
  return platformsArray;
};

const getPlatforms = async (req, res) => {
  try {
    const platformsDb = await Platforms.findAll();

    if (!platformsDb.length) {
      const platformsArray = await getAllPlatformsFromAPI();

      await Promise.all(
        platformsArray.map(async (platformName) => {
          await Platforms.findOrCreate({
            where: {
              id: uuidv4(),
              name: platformName,
            },
          });
        })
      );

      res.json(platformsArray);
    } else {
      const platformNames = platformsDb.map((p) => p.name);
      res.json(platformNames);
    }
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({ error: 'Error fetching platforms' });
  }
};

module.exports = {
  getPlatforms,
};
