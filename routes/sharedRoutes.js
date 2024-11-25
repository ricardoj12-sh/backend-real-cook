const express = require('express');
const { getSharedRecipe } = require('../controllers/sharedController');

const router = express.Router();

// Ruta para obtener la receta compartida por ID
router.get('/shared/:id', getSharedRecipe);

module.exports = router;
