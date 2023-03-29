const User = require('../models/user');

class UserController {
  constructor(User, sequelize) {
    this.User = User;
    this.sequelize = sequelize;
  }

  async index(req, res) {
    try {
      const users = await this.User.findAll();
      res.render('users/users', { users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async show(req, res) {
    try {
      const user = await this.User.findByPk(req.params.id);
      res.render('user/show', { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  createForm(req, res) {
    res.render('user/create');
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await this.User.create({ name, email, password });
      res.redirect(`/users/${user.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async editForm(req, res) {
    try {
      const user = await this.User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.render('user/edit', { user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async edit(req, res) {
    try {
      const user = await this.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update(req.body);
      res.redirect(`/users/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async delete(req, res) {
    try {
      const user = await this.User.findByPk(req.params.id);
      await user.destroy();
      res.redirect('/users');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async update(req, res) {
    try {
      const user = await this.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { role } = req.body;
      user.role = role;
      await user.save();
  
      res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  
}



module.exports = UserController;

