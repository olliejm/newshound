const {User, Response, Vote} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const vote = await Vote.findOne({
        where: {
          UserId: req.user.id,
          ResponseId: req.params.responseId
        }
      })

      if (!vote) {
        res.send({
          upVote: null
        })
      }

      res.send(vote)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred retrieving the vote information'
      })
    }
  },
  async update (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)

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
      } else vote.upVote = req.body.upVote

      const user = await User.findById(response.UserId)

      if (vote.upVote === true) {
        await user.update({
          karma: user.karma + 1
        })

        await response.update({
          upVotes: response.upVotes + 1
        })
      } else if (vote.upVote === false) {
        await user.update({
          karma: user.karma - 1
        })

        await response.update({
          downVotes: response.downVotes + 1
        })
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
