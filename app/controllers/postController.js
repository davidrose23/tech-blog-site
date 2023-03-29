const Post = require('../models/post');

class PostController {
  constructor(Post) {
    this.Post = Post;
  }

  async index(req, res) {
    try {
      const posts = await this.Post.findAll();
      res.render('posts/posts', { posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  async show(req, res) {
    try {
      const post = await this.Post.findByPk(req.params.id);
      res.render('post/show', { post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  createForm(req, res) {
    res.render('post/create');
  };

  async create(req, res) {
    try {
      const { title, content } = req.body;
      const post = await this.Post.create({ title, content });
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  async editForm(req, res) {
    try {
      const post = await this.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.render('post/edit', { post });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  async edit(req, res) {
    try {
      const post = await this.Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      await post.update(req.body);
      res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  async delete(req, res) {
    try {
      const post = await this.Post.findByPk(req.params.id);
      await post.destroy();
      res.redirect('/posts');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}

module.exports = PostController;
