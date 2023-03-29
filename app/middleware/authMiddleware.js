const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authMiddleware = {};

authMiddleware.requireLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

authMiddleware.requireAdmin = async (req, res, next) => {
  const { user } = req;
  if (!user || !user.admin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

authMiddleware.setUserFromSession = async (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    return next();
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = authMiddleware;
