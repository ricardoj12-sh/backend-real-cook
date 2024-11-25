const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db');

const Recipe = sequelize.define('Recipe', {
  idMeal: {
    type: DataTypes.INTEGER, // Cambiado a INTEGER para coincidir con la base de datos
    primaryKey: true,
    autoIncrement: true // Asegúrate de que sea auto incremental
  },
  strMeal: DataTypes.STRING,
  strCategory: DataTypes.STRING,
  strInstructions: DataTypes.TEXT,
  strArea: DataTypes.STRING,
  strMealThumb: DataTypes.STRING,
  strTags: DataTypes.STRING,
  strIngredient1: DataTypes.STRING,
  strIngredient2: DataTypes.STRING,
  strIngredient3: DataTypes.STRING,
  strIngredient4: DataTypes.STRING,
  strIngredient5: DataTypes.STRING,
  strIngredient6: DataTypes.STRING,
  strIngredient7: DataTypes.STRING,
  strIngredient8: DataTypes.STRING,
  strIngredient9: DataTypes.STRING,
  strIngredient10: DataTypes.STRING,
  strMeasure1: DataTypes.STRING,
  strMeasure2: DataTypes.STRING,
  strMeasure3: DataTypes.STRING,
  strMeasure4: DataTypes.STRING,
  strMeasure5: DataTypes.STRING,
  strMeasure6: DataTypes.STRING,
  strMeasure7: DataTypes.STRING,
  strMeasure8: DataTypes.STRING,
  strMeasure9: DataTypes.STRING,
  strMeasure10: DataTypes.STRING,
}, {
  tableName: 'recipes',
  timestamps: false,
});

// Métodos de búsqueda
Recipe.findByDishName = async function (name) {
  return await this.findAll({
      where: {
          strMeal: {
              [Op.like]: `%${name}%`, // Búsqueda parcial por nombre
          }
      }
  });
};


Recipe.findByCategory = async function (category) {
  return await this.findAll({
    where: {
      strCategory: category
    }
  });
};

Recipe.findByCountry = async function (country) {
  return await this.findAll({
    where: {
      strArea: country
    }
  });
};

module.exports = Recipe;
