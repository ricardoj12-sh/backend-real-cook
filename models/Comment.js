// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');

const Comment = sequelize.define('Comment', {
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipeId: {
    type: DataTypes.STRING,
    references: {
      model: Recipe,
      key: 'idMeal',
    },
  },
  user: DataTypes.STRING,
  content: DataTypes.TEXT,
}, {
  tableName: 'comments',
  timestamps: false,
});

module.exports = Comment;
