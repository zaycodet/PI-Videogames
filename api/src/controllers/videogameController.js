const axios = require('axios');
const { cleanData } = require('../utils/cleanData');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const { Videogames, Genres, Platforms } = require('../db');

const getAllVideogames = async (req, res) => {
  try {
    const apiVideogames = new Set(); // Usamos un Set para evitar duplicados

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

      results.forEach((game) => {
        // Excluye el videojuego con el ID 251509
        if (game.id !== undefined) {
          apiVideogames.add(game);
        }
      });
    }

    const dbVideogames = await Videogames.findAll({
      include: [
        {
          model: Genres,
          as: "genres",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          as: "platforms",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    console.log('DB Videogames:', dbVideogames); // Agregar console.log() con dbVideogames

    const allVideogames = [...apiVideogames, ...dbVideogames];

    // Limpia los datos antes de enviar la respuesta
    const cleanedVideogames = cleanData(allVideogames);

    if (cleanedVideogames.length > 0) {
      res.json(cleanedVideogames);
    } else {
      res.status(404).json({ error: 'No videogames found in the API or database' });
    }
  } catch (error) {
    console.error('Error fetching videogames:', error); // Agregar console.error()
    res.status(500).json({ error: 'Error fetching videogames' });
  }
};


const getVideogameById = async (req, res) => {
  const id = req.params.idVideogame;
  
  try {
    console.log(`Searching videogame with ID: ${id}`);
    
    let videogameResult;

    try {
      const response = await axios.get(`${URL}/games/${id}`, {
        params: {
          key: API_KEY,
        },
      });
      videogameResult = response.data;
    } catch (apiError) {
      console.log('Videogame not found in API, searching in database');
      videogameResult = await Videogames.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: Genres,
            as: "genres",
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Platforms,
            as: "platforms",
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
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
  const { name } = req.query;

  try {
    let URL_API= `${URL}/games?search=${name}&key=${API_KEY}&page_size=100`;

    const response = await axios.get(URL_API);
    const videogamesApi = await response.data.results;
    const videogamesDb = await Videogames.findAll({
      include: [
        {
          model: Genres,
          as: "genres",
          through: {
            attributes: [],
          },
        },
      ],
    });
    const cleanedApiData = cleanData(videogamesApi);

    const allVideogames = [...cleanedApiData, ...videogamesDb];

    if (name) {
      const filterVideogames = allVideogames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!filterVideogames.length) {
        return res.status(404).json({ error: "This name didn't match any videogame" });
      }
      return res.json(filterVideogames.slice(0, 15));
    }
    return res.json(allVideogames.slice(0, 15));
  } catch (error) {
    console.error('Error fetching videogames by name:', error);
    return res.status(500).json({ error: 'Error fetching videogames by name' });
  }
};


  const createVideogame = async (req, res) => {
    try {
      const {
        name,
        description,
        platforms,
        background_image,
        release_date,
        rating,
        genres,
      } = req.body;
  
      // Buscar o crear el videojuego en la base de datos
      const [newVideogame, created] = await Videogames.findOrCreate({
        where: { name },
        defaults: {
          name,
          description,
          background_image,
          release_date,
          rating,
          createdVideoGame: true,
        },
      });
  
      const genreIds = [];
      for (const genreName of genres) {
        // Buscar el género en la base de datos o crearlo si no existe
        let genre = await Genres.findOrCreate({ where: { name: genreName } });
        genreIds.push(genre[0].id); // Usar el ID del género encontrado o creado
      }
  
      const platformIds = [];
      for (const platformName of platforms) {
        // Buscar la plataforma en la base de datos o crearla si no existe
        let platform = await Platforms.findOrCreate({ where: { name: platformName } });
        platformIds.push(platform[0].id); // Usar el ID de la plataforma encontrada o creada
      }
  
      // Establecer las relaciones entre el videojuego, géneros y plataformas
      await newVideogame.setGenres(genreIds);
      await newVideogame.setPlatforms(platformIds);
  
      console.log('Platforms from DB', platformIds);
      console.log('Genres from DB', genreIds);
  
      if (created) {
        return res.json(newVideogame);
      } else {
        throw Error("The videogame already exists");
      }
    } catch (error) {
      console.error('Error creating videogame:', error);
      res.status(500).json({ error: 'Error creating videogame' });
    }
  };
  

module.exports = {
  getAllVideogames,
  getVideogameById,
  getVideogamesByName,
  createVideogame,
};
