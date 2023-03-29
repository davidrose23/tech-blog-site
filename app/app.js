const express = require('express');
const path = require('path');
const { sequelize } = require('./config/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sessionStore } = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');

// Define models
const User = require('./models/user');
const Post = require('./models/post');
const { authController } = require('./models');

const app = express();

// Sync database and initialize session store
sequelize.sync().then(() => {
  console.log('Session model defined:', sequelize.models.session);
  sessionStore.sync();
  console.log('Session store initialized:', sessionStore);

  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));
  app.use(authMiddleware.setUserFromSession);

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));

  // Set up routes
  const homeRoutes = require('./routes/homeRoutes');
  const authRoutes = require('./routes/authRoutes');
  const postRoutes = require('./routes/postRoutes');
  const userRoutes = require('./routes/userRoutes');

  app.use('/', homeRoutes);
  //app.use('/auth', authRoutes);
  app.use('/posts', postRoutes);
  //app.use('/users', userRoutes);
  authRoutes.get('/register', authController.registerForm);

  // // Handle 404 errors
  // app.use((req, res, next) => {
  //   const error = new Error('Not Found');
  //   error.status = 404;
  //   next(error);
  // });

  // // Handle all other errors
  // app.use((err, req, res, next) => {
  //   res.status(err.status || 500);
  //   res.render('error', { error: err });
  // });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

