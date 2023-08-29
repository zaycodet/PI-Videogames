const express = require('express');
const router = express.Router();
const videogameController = require('../controllers/videogameController'); // Importa el controlador
const genresController = require('../controllers/genresController');


router.post('/videogames', videogameController.createVideogame);
router.get('/videogames', videogameController.getVideogames);
router.get('/videogames/name', videogameController.getVideogamesByName);
router.get('/videogames/:idVideogame', videogameController.getVideogameById);
router.get('/genres', genresController.getGenres);


module.exports = router;

