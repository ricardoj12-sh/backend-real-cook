const RecipeModel = require('../models/Recipe');

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Buscando receta en la base de datos con id: ${id}`);
        const recipe = await RecipeModel.findOne({ where: { idMeal: id } });

        if (recipe) {
            console.log(`Receta encontrada en la base de datos: ${recipe.idMeal}`);
            const plainRecipe = recipe.get({ plain: true });
            console.log('Datos completos de la receta:', plainRecipe); // <-- Validar todos los datos
            return res.json(plainRecipe);
        } else {
            console.log(`Receta no encontrada en la base de datos con id: ${id}`);
            return res.status(404).json({ error: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la receta:', error);
        res.status(500).json({ error: 'Error al obtener la receta' });
    }
};


exports.addRecipe = async (req, res) => {
    try {
        const newRecipe = req.body;
        console.log('Datos de la nueva receta:', newRecipe);
        const createdRecipe = await RecipeModel.create(newRecipe);
        res.status(201).json(createdRecipe);
    } catch (error) {
        console.error('Error al agregar la receta:', error);
        res.status(500).json({ error: 'Error al agregar la receta' });
    }
};


exports.searchRecipesByDishName = async (req, res) => {
    const { name } = req.query;
    console.log(`Buscando recetas con el nombre: "${name}"`);
    try {
        const recipes = await RecipeModel.findByDishName(name);
        console.log(`Recetas encontradas: ${JSON.stringify(recipes)}`);
        if (recipes.length === 0) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas' });
    }
};

exports.searchRecipesByCategories = async (req, res) => {
    const { category } = req.params;
    try {
        const recipes = await RecipeModel.findByCategory(category);
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas por categoría' });
    }
};

exports.getAllCategories = (req, res) => {
    const categories = [
        { idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '2', strCategory: 'Chicken', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '3', strCategory: 'Dessert', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '4', strCategory: 'Pasta', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '5', strCategory: 'Seafood', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '6', strCategory: 'Vegetarian', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '7', strCategory: 'Breakfast', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '8', strCategory: 'Salad', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '9', strCategory: 'Side Dish', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '10', strCategory: 'Snack', strCategoryThumb: '', strCategoryDescription: '' }
    ];
    res.json({ categories });
};

exports.searchRecipesByCountry = async (req, res) => {
    const { country } = req.params;
    try {
        const recipes = await RecipeModel.findByCountry(country);
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas por país' });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.findAll();
        res.json(recipes);
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        res.status(500).json({ error: 'Error al obtener recetas' });
    }
};

exports.getRecipeCount = async (req, res) => {
    try {
        const recipeCount = await RecipeModel.count(); // Método para contar recetas
        res.json({ totalRecipes: recipeCount });
    } catch (error) {
        console.error('Error al contar las recetas:', error);
        res.status(500).json({ error: 'Error al contar las recetas' });
    }
};

exports.getRecipesPaginated = async (req, res) => {
    const start = parseInt(req.query._start, 10) || 0;
    const end = parseInt(req.query._end, 10) || 10;

    try {
        const recipes = await RecipeModel.findAll({
            offset: start,
            limit: end - start,
        });
        res.json(recipes);
    } catch (error) {
        console.error('Error al obtener recetas paginadas:', error);
        res.status(500).json({ error: 'Error al obtener recetas paginadas' });
    }
};
