const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');
const { sequelize } = require('../models');

const postController = new PostController(User, sequelize);

router.get('/', postController.index);
router.get('/create', authMiddleware.requireLogin, postController.createForm);
router.post('/', authMiddleware.requireLogin, postController.create);
router.get('/:id', postController.show);
router.get('/:id/edit', authMiddleware.requireLogin, postController.editForm);
router.post('/:id/edit', authMiddleware.requireLogin, postController.edit);
router.post('/:id/delete', authMiddleware.requireLogin, postController.delete);

module.exports = router;
