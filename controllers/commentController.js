// controllers/commentController.js
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    console.log('Datos recibidos para crear comentario:', req.body); // Debug log
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error al crear comentario:', error); // Log detallado del error
    res.status(500).json({ message: 'Error al crear comentario', error });
  }
};


exports.getCommentsByRecipe = async (req, res) => {
  try {
    console.log('recipeId:', req.params.recipeId); // Verifica el recipeId recibido
    const comments = await Comment.findAll({ where: { recipeId: req.params.recipeId } });
    console.log('comments:', comments); // Verifica los comentarios obtenidos
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios', error });
  }
};
