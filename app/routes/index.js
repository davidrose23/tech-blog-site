const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

// Import controllers
const PostController = require('../controllers/PostController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

// POST routes for creating posts
router.post('/posts', isAuthenticated, PostController.createPost);

// PUT route for updating posts
router.put('/posts/:id', isAuthenticated, PostController.updatePost);

// DELETE route for deleting posts
router.delete('/posts/:id', isAuthenticated, PostController.deletePost);

// GET routes for retrieving posts
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);

// POST and GET routes for user authentication
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

// POST route for creating users
router.post('/users', UserController.createUser);

module.exports = router;
