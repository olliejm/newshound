const {Post, Response} = require('../models')

module.exports = {
  async create (req, res) {
    try {
      const post = await Post.findById(req.params.postId)

      if (post.UserId === req.user.id) {
        res.status(403).send({
          error: 'You cannot respond to your own post'
        })
      }

      const response = await Response.create({
        body: req.body.body,
        audioUri: req.body.audioUri,
        UserId: req.user.id,
        PostId: post.id,
        upVotes: 0,
        downVotes: 0
      })

      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `An error occurred creating the response`
      })
    }
  },
  async index (req, res) {
    try {
      const responses = await Response.findAll({
        where: {
          PostId: req.params.postId
        }
      })

      res.send(responses)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred loading the responses'
      })
    }
  },
  async update (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)

      if (response.UserId !== req.user.id) {
        res.status(403).send({
          error: 'You are not authorized to update this response'
        })
      }

      await response.update(req.body)
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred updating the response'
      })
    }
  },
  async delete (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)

      if (response.UserId !== req.user.id) {
        res.status(403).send({
          error: 'You are not authorized to remove this response'
        })
      }

      await response.destroy()
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred deleting the response'
      })
    }
  }
}
