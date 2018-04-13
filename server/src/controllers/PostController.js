const {Post} = require('../models')

module.exports = {
  async post (req, res) {
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
  async put (req, res) {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.postId
        }
      })

      if (!post) {
        res.status(404).send({
          error: 'No matching post found'
        })
      }

      if (post.UserId !== req.user.id) {
        res.status(403).send({
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
  async index (req, res) {
    try {
      const userId = req.params.userId
      const search = req.query.search
      let posts = null

      if (userId) {
        posts = await Post.findAll({
          where: {
            UserId: userId
          }
        })
      } else if (search) {
        posts = await Post.findAll({
          where: {
            $or: [
              'title', 'body'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        posts = await Post.findAll({
          limit: 15
        })
      }

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
  async remove (req, res) {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.postId
        }
      })

      if (!post) {
        res.status(404).send({
          error: 'No matching post found'
        })
      }

      if (post.UserId !== req.user.id) {
        res.status(403).send({
          error: 'You are not authorized to remove this post'
        })
      }

      await post.destroy()
      res.send({
        success: 'Post deleted'
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred deleting the post'
      })
    }
  }
}
