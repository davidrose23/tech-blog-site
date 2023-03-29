const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// // Get all users (admin only)
// router.get('/', authMiddleware.requireAdmin, userController.index);

// // Get user by ID (admin only)
// router.get('/:id', authMiddleware.requireAdmin, userController.show);

// // Update user by ID (admin only)
// router.put('/:id/update', authMiddleware.requireAdmin, userController.update);

// module.exports = router;
