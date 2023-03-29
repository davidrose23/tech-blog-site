const { sequelize } = require('../models/sequelize');
const Post = require('../models/post');

class HomeController {
  // constructor(Post) {
  //   this.Post = Post;
  //   console.log('HomeController constructor: ', this.Post); // add this line
  // }

  async index(req, res) {
    try {
      // console.log('Before findAll: ', this.Post); // add this line
      // const posts = await this.Post.findAll();
      // console.log('After findAll: ', posts); // add this line
      res.render('index');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}


module.exports = HomeController;
