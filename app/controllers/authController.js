const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class authController {
  constructor(User, sequelize) {
    this.User = User;
    this.sequelize = sequelize;
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  loginForm(req, res) {
    res.render('auth/login');
  }

  registerForm(req, res) {
    res.render('auth/register');
  }

  async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

}

module.exports = authController;
