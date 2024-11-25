const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define(
  'Favorite',
  {
    favoriteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes', // Nombre de la tabla referenciada
        key: 'idMeal', // Clave primaria
      },
      onDelete: 'CASCADE',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'favorites',
    timestamps: false,
  }
);

module.exports = Favorite;
