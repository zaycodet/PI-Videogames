const { Op } = require('sequelize');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const { Videogame, Genre } = require('../db');

const getVideogames = async (req, res) => {
  try {
    const apiResults = new Set(); // Usamos un Set para evitar duplicados

    // Hacemos tres solicitudes a la API para obtener 100 juegos en total
    for (let page = 1; page <= 3; page++) {
      const response = await axios.get(`${URL}/games`, {
        params: {
          key: API_KEY,
          page,
          page_size: 40, // Cada página contiene 40 juegos
        },
      });

      const results = response.data.results;

      // Agregamos los juegos de esta página al conjunto
      results.forEach((game) => {
        apiResults.add(game);
      });
    }

    // Obtenemos los juegos de la base de datos
    const dbVideogames = await Videogame.findAll({
      include: Genre,
    });

    // Agregamos los juegos de la base de datos al conjunto
    dbVideogames.forEach((game) => {
      apiResults.add(game);
    });

    // Convertimos el conjunto en un array
    const allResults = [...apiResults];

    if (allResults.length > 0) {
      res.json(allResults);
    } else {
      res.status(404).json({ error: 'No videogames found in API or database' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videogames from API and database' });
  }
};



const getVideogameById = async (req, res) => {
    const id = req.params.idVideogame;
    
    try {
      console.log(`Searching videogame in API with ID: ${id}`);
      
      let videogameResult;
  
      // Intenta buscar en la API RAWG por ID utilizando la API Key
      try {
        const response = await axios.get(`${URL}/games/${id}`, {
          params: {
            key: API_KEY,
          },
        });
        videogameResult = response.data;
      } catch (apiError) {
        // Si no se encuentra en la API, busca en la base de datos por UUID
        console.log('Videogame not found in API, searching in database');
        videogameResult = await Videogame.findByPk(id, {
          include: Genre,
        });
      }
  
      if (videogameResult) {
        console.log('Videogame found');
        res.json(videogameResult);
      } else {
        console.log('Videogame not found');
        res.status(404).json({ error: 'Videogame not found' });
      }
    } catch (error) {
      console.error('Error fetching videogame details:', error);
      res.status(500).json({ error: 'Error fetching videogame details' });
    }
  };
  
  const getVideogamesByName = async (req, res) => {
    const query = req.query.q; // El valor del parámetro de búsqueda
    const formattedQuery = query.toLowerCase(); // Convertir la búsqueda a minúsculas
  
    try {
      console.log(`Searching videogames with name: ${formattedQuery}`);
  
      // Buscar en la base de datos local
      const videogamesFromDB = await Videogame.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${formattedQuery}%`, // Realizar búsqueda sin importar mayúsculas o minúsculas
          },
        },
      });
  
      // Si no hay resultados en la base de datos, buscar en la API RAWG
      if (videogamesFromDB.length === 0) {
        const response = await axios.get(`${URL}/games`, {
          params: {
            key: API_KEY,
            search: formattedQuery,
            page_size: 15,
          },
        });
  
        const videogamesFromAPI = response.data.results;
        res.json(videogamesFromAPI);
      } else {
        res.json(videogamesFromDB);
      }
    } catch (error) {
      console.error('Error fetching videogames by name:', error);
      res.status(500).json({ error: 'Error fetching videogames by name' });
    }
  };

  const createVideogame = async (req, res) => {
    const { nombre, descripcion, plataformas, imagen, fecha_lanzamiento, rating, genres } = req.body;
  
    try {
      // Crear el videojuego en la base de datos
      const newVideogame = await Videogame.create({
        nombre,
        descripcion,
        plataformas,
        imagen,
        fecha_lanzamiento,
        rating,
      });
  
      // Relacionar el videojuego con los géneros proporcionados
      if (genres && genres.length > 0) {
        const genresToAdd = await Genre.findAll({
          where: {
            nombre: genres,
          },
        });
  
        await newVideogame.setGenres(genresToAdd);
      }
  
      res.status(201).json(newVideogame);
    } catch (error) {
      console.error('Error creating videogame:', error);
      res.status(500).json({ error: 'Error creating videogame' });
    }
  };
  

module.exports = {
  getVideogames,
  getVideogameById,
  getVideogamesByName,
  createVideogame,
};
