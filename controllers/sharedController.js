const Recipe = require('../models/Recipe');

// Obtener receta por ID y devolver JSON para enlace único
const getSharedRecipe = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido:', id); // <-- Agrega esto

    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({
            title: recipe.strMeal,
            category: recipe.strCategory,
            instructions: recipe.strInstructions,
            area: recipe.strArea,
            thumbnail: recipe.strMealThumb,
            ...(recipe.strTags ? { tags: recipe.strTags } : {}), // Solo incluir si tiene valor
            ingredients: [
                recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
                recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
                recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
                recipe.strIngredient10,
            ].filter(Boolean),
            measures: [
                recipe.strMeasure1, recipe.strMeasure2, recipe.strMeasure3,
                recipe.strMeasure4, recipe.strMeasure5, recipe.strMeasure6,
                recipe.strMeasure7, recipe.strMeasure8, recipe.strMeasure9,
                recipe.strMeasure10,
            ].filter(Boolean),
            
        });
        
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getSharedRecipe };
