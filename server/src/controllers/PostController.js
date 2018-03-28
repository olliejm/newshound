const {Post} = require('../models')

module.exports = {
  async post (req, res) {
    try {
      const post = await Post.create(req.body)
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred creating your post'
      })
    }
  },
  async index (req, res) {
    try {
      const posts = await Post.findAll({
        limit: 15
      })
      res.send(posts)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred loading the posts'
      })
    }
  }
}
