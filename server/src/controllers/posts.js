const {Post} = require('../models')

module.exports = {
  async create (req, res) {
    try {
      const post = await Post.create(req.body)
      res.send(post)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `An error occurred creating the post`
      })
    }
  },
  async index (req, res) {
    try {
      let posts = null

      if (req.params.userId) {
        posts = await Post.findAll({
          where: {
            UserId: req.params.userId
          }
        })
      /* } else if (req.query.search) {
        posts = await Post.findAll({
          where: {
            $or: [
              'title', 'body', 'name'
            ].map(key => ({
              [key]: {
                $like: `%${req.query.search}%`
              }
            }))
          }
        }) */
      } else posts = await Post.findAll()

      res.send(posts)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred finding the posts'
      })
    }
  },
  async show (req, res) {
    try {
      const post = await Post.findById(req.params.postId)
      res.send(post)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred finding the post'
      })
    }
  },
  async update (req, res) {
    try {
      const post = await Post.findById(req.params.postId)

      if (post.UserId !== req.user.id) {
        return res.status(403).send({
          error: 'You are not authorized to update this post'
        })
      }

      await post.update(req.body)
      res.send(post)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred updating the post'
      })
    }
  },
  async delete (req, res) {
    try {
      const post = await Post.findById(req.params.postId)

      if (post.UserId !== req.user.id) {
        return res.status(403).send({
          error: 'You are not authorized to remove this post'
        })
      }

      await post.destroy()
      res.send(post)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred deleting the post'
      })
    }
  }
}
