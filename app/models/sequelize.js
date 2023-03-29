const { Sequelize } = require('sequelize');
const UserModel = require('../models/user');
const PostModel = require('../models/post');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const models = {
  User: new UserModel(sequelize, Sequelize),
  Post: new PostModel(sequelize, Sequelize)
};

// Define associations between User and Post models
 //models.User.hasMany(models.Post, { onDelete: 'CASCADE' });
 //models.Post.belongsTo(models.User);

module.exports = {
  ...models,
  sequelize
};


