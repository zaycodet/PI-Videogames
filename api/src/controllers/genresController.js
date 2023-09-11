const axios = require('axios');
const { Genres } = require('../db');
const { v4: uuidv4 } = require('uuid');

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const getAllGenresFromAPI = async () => {
  const URL_API = `${URL}/genres?key=${API_KEY}`;
  const response = await axios.get(`${URL_API}`);
  const genresArray = response.data.results.map((genre) => genre.name);
  return genresArray;
};

const getGenres = async (req, res) => {
  try {
    const genresDb = await Genres.findAll();

    if (!genresDb.length) {
      const genresArray = await getAllGenresFromAPI();

      await Promise.all(
        genresArray.map(async (genreName) => {
          await Genres.findOrCreate({
            where: {
              id: uuidv4(),
              name: genreName,
            },
          });
        })
      );

      res.json(genresArray);
    } else {
      const genresNames = genresDb.map((g) => g.name);
      res.json(genresNames);
    }
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Error fetching genres' });
  }
};

module.exports = {
  getGenres,
};
