const axios = require('axios');
const { Genre } = require('../db');
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUIDs

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const getGenres = async (req, res) => {
  try {
    // Intentamos obtener los géneros de la API
    const response = await axios.get(`${URL}/genres`, {
      params: {
        key: API_KEY,
      },
    });

    const genresFromAPI = response.data.results;

    // Transformar los IDs de integer a UUIDs y guardar en la base de datos
    const genresToSave = genresFromAPI.map(genre => ({
      id: uuidv4(), // Genera un UUID único
      nombre: genre.name,
    }));
    
    // Guardamos los géneros en la base de datos
    await Genre.bulkCreate(genresToSave);

    // Luego intentamos obtener los géneros de la base de datos
    const genresFromDB = await Genre.findAll();

    if (genresFromDB.length > 0) {
      // Si hay géneros en la base de datos, enviarlos
      res.json(genresFromDB);
    } else {
      // Si no hay géneros en la base de datos, enviar un mensaje adecuado
      res.status(404).json({ error: 'Genres not found in database' });
    }
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Error fetching genres' });
  }
};

module.exports = {
  getGenres,
};
