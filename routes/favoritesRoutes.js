const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Rutas existentes
router.get('/favorites', favoritesController.getFavoritesPaginated);
router.post('/favorites', favoritesController.addFavorite);
router.delete('/favorites', favoritesController.deleteFavorite);

// Nuevas rutas
router.get('/favorites/all', favoritesController.getAllFavoriteRecipes); // Obtener todas las recetas favoritas
router.get('/favorites/count', favoritesController.countFavorites);      // Contar recetas favoritas

module.exports = router;
