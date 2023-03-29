const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const AuthController = require('../controllers/AuthController');
const User = require('../models/user');


const authController = new AuthController(User, sequelize);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;
