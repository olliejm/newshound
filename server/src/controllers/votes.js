const {Response, Vote} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)
      if (!response) {
        res.status(404).send({
          error: 'Invalid response ID'
        })
      }

      const upVotes = await Vote.count({
        where: {
          upVote: true,
          ResponseId: req.params.responseId
        }
      })

      const downVotes = await Vote.count({
        where: {
          upVote: false,
          ResponseId: req.params.responseId
        }
      })

      res.send({
        upVotes: upVotes,
        downVotes: downVotes
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred retrieving the votes'
      })
    }
  },
  async update (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)
      if (!response) {
        res.status(404).send({
          error: 'Invalid response ID'
        })
      }

      if (response.UserId === req.user.id) {
        res.status(403).send({
          error: 'You cannot vote on your own post'
        })
      }

      let vote = await Vote.findOne({
        where: {
          UserId: req.user.id,
          ResponseId: req.params.responseId
        }
      })

      if (!vote) {
        vote = await Vote.create({
          upVote: req.body.upVote,
          UserId: req.user.id,
          ResponseId: req.params.responseId
        })
      } else {
        vote.upVote = req.body.upVote
      }

      res.send(vote)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred submitting your vote'
      })
    }
  }
}
