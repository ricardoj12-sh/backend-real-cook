// routes/commentRoutes.js
const express = require('express');
const { createComment, getCommentsByRecipe } = require('../controllers/commentController');
const router = express.Router();

router.post('/', createComment);
router.get('/:recipeId', getCommentsByRecipe);

module.exports = router;
