const { Favorite, Recipe } = require('../models');

// Obtener favoritos de un usuario
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      include: [
        {
          model: Recipe,
          as: 'recipe',
        },
      ],
    });
    res.json(favorites);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};

// Añadir un favorito
exports.addFavorite = async (req, res) => {
  const { user, recipeId } = req.body;

  try {
    const favorite = await Favorite.create({ user, recipeId });
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ error: 'Error al agregar favorito' });
  }
};

// Eliminar un favorito
exports.deleteFavorite = async (req, res) => {
  const { user, recipeId } = req.body;

  try {
    await Favorite.destroy({ where: { user, recipeId } });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ error: 'Error al eliminar favorito' });
  }
};

// Obtener todas las recetas favoritas (sin filtrar por usuario)
exports.getAllFavoriteRecipes = async (req, res) => {
  try {
    const favoriteRecipes = await Favorite.findAll({
      include: [
        {
          model: Recipe,
          as: 'recipe', // Este alias debe coincidir con la asociación
        },
      ],
    });

    res.json(favoriteRecipes);
  } catch (error) {
    console.error('Error al obtener todas las recetas favoritas:', error);
    res.status(500).json({ error: 'Error al obtener todas las recetas favoritas' });
  }
};

// Contar el total de recetas favoritas
exports.countFavorites = async (req, res) => {
  try {
    const totalFavorites = await Favorite.count();
    res.json({ totalFavorites });
  } catch (error) {
    console.error('Error al contar las recetas favoritas:', error);
    res.status(500).json({ error: 'Error al contar las recetas favoritas' });
  }
};

// Obtener favoritos paginados
// Obtener favoritos paginados
exports.getFavoritesPaginated = async (req, res) => {
  const start = parseInt(req.query._start, 10) || 0; // Índice inicial
  const end = parseInt(req.query._end, 10) || 10;   // Índice final

  try {
    // Calcular el límite y desplazamiento
    const limit = end - start;
    const offset = start;

    // Obtener favoritos con paginación y recetas relacionadas
    const { count, rows } = await Favorite.findAndCountAll({
      offset, // Establece el desplazamiento
      limit,  // Establece el límite
      order: [['created_at', 'ASC']], // Orden explícito por fecha de creación
      include: [
        {
          model: Recipe, // Incluye las recetas relacionadas
          as: 'recipe',
        },
      ],
    });

    // Retornar los favoritos paginados junto con los metadatos
    res.json({
      favorites: rows.map((fav) => fav.recipe), // Solo recetas relacionadas
      total: count, // Total de favoritos
      pageSize: limit, // Tamaño de la página
      currentPage: Math.floor(start / limit) + 1, // Página actual
      totalPages: Math.ceil(count / limit), // Total de páginas
    });
  } catch (error) {
    console.error('Error al obtener favoritos paginados:', error);
    res.status(500).json({ error: 'Error al obtener favoritos paginados' });
  }
};

