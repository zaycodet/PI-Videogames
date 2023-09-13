const express = require('express');
const router = express.Router();
const videogameController = require('../controllers/videogameController');
const genresController = require('../controllers/genresController');
const platformsController = require('../controllers/platformsController');

router.post('/videogames', videogameController.createVideogame);
router.get('/videogames/name', videogameController.getVideogamesByName);
router.get('/videogames', videogameController.getAllVideogames);
router.get('/videogames/:idVideogame', videogameController.getVideogameById);
router.get('/genres', genresController.getGenres);
router.get('/platforms', platformsController.getPlatforms);

module.exports = router;
