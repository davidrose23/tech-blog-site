const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

// Define database connection details
const sequelize = new Sequelize('blog_db', 'david', 'david', {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Define session model
const sessionModel = sequelize.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
}, {
  underscored: true,
});

console.log('Session model defined:', sessionModel === undefined);

// Initialize session store
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'Session',
  extendDefaultFields: (defaults, session) => ({
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
  }),
});

console.log('Session store initialized:', sessionStore === undefined);

module.exports = { sequelize, sessionStore, sessionModel };

