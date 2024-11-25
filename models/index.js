const sequelize = require('../config/db');
const Recipe = require('./Recipe');
const Favorite = require('./Favorites');
const Comment = require('./Comment');

// Asociaciones
Recipe.hasMany(Favorite, {
  foreignKey: 'recipeId',
  as: 'favorites',
});

Favorite.belongsTo(Recipe, {
  foreignKey: 'recipeId',
  as: 'recipe',
});

Recipe.hasMany(Comment, {
  foreignKey: 'recipeId',
  as: 'comments',
});

Comment.belongsTo(Recipe, {
  foreignKey: 'recipeId',
  as: 'recipe',
});

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Recipe,
  Favorite,
  Comment,
};
