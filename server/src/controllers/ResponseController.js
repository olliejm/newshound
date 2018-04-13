const {Response} = require('../models')

module.exports = {
  async post (req, res) {
    try {
      req.body.audioUri = req.file.destination + req.file.filename
      const response = await Response.create(req.body)
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `An error occurred creating the response`
      })
    }
  },
  async put (req, res) {
    try {
      const response = await Response.findOne({
        where: {
          id: req.params.responseId
        }
      })

      if (!response) {
        res.status(404).send({
          error: 'No matching response found'
        })
      }

      if (response.UserId !== req.user.id) {
        res.status(403).send({
          error: 'You are not authorized to update this response'
        })
      }

      req.body.responseUri = response.responseUri
      await response.update(req.body)
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred updating the response'
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

      if (!responses) {
        res.status(404).send({
          error: 'This post has no responses yet'
        })
      }

      res.send(responses)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred loading the responses'
      })
    }
  },
  async remove (req, res) {
    try {
      const response = await Response.findOne({
        where: {
          id: req.params.responseId
        }
      })

      if (!response) {
        res.status(404).send({
          error: 'No matching response found'
        })
      }

      if (response.UserId !== req.user.id) {
        res.status(403).send({
          error: 'You are not authorized to remove this response'
        })
      }

      await response.destroy()
      res.send({
        success: 'Response deleted'
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred deleting the response'
      })
    }
  }
}
