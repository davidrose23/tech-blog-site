const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
// Import models
const Post = require('./post');
const User = require('./user');

// Import authentication controller
const AuthController = require('../controllers/authController');

// Connect to database using Sequelize instance



// Define associations between models
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Initialize authentication controller with models and Sequelize instance
const authController = new AuthController(User, sequelize);

// Export models, Sequelize instance, and authentication controller
module.exports = {
  sequelize,
  Post,
  User,
  authController
};
