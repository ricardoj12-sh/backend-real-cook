const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.get('/recipes/all', recipeController.getAllRecipes); // Ruta específica para obtener todas las recetas
router.get('/recipes/count', recipeController.getRecipeCount); // Ruta para obtener el conteo de recetas
router.get('/recipes', recipeController.getRecipesPaginated); // Ruta para recetas paginadas
router.get('/recipes/:id', recipeController.getRecipeById); // Ruta para obtener una receta por ID
router.post('/recipes', recipeController.addRecipe); // Ruta para agregar recetas

// Rutas para búsquedas y categorías
router.get('/search', recipeController.searchRecipesByDishName);
router.get('/category/:category', recipeController.searchRecipesByCategories);
router.get('/country/:country', recipeController.searchRecipesByCountry);

// Ruta para obtener categorías
router.get('/categories', recipeController.getAllCategories);





module.exports = router;
