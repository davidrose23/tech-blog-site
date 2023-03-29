const app = require('./app/app');
const { sequelize } = require('./app/models');
require('dotenv').config();



// Connect to the database and start the server
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  