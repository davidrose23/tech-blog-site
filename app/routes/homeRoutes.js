const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const Post = require('../models/post');

const homeController = new HomeController(Post);

router.get('/', homeController.index);

module.exports = router;
