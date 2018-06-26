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
        return res.send({
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
        return res.status(403).send({
          error: 'You cannot vote on your own response'
        })
      }

      const vote = await Vote.findOrCreate({
        where: {
          UserId: req.user.id,
          ResponseId: req.params.responseId
        },
        defaults: {
          UserId: req.user.id,
          ResponseId: req.params.responseId,
          upVote: req.body.upVote
        }
      })

      if (req.body.upVote !== vote.upVote) {
        // TODO update or re-create votes entry

        const user = await User.findById(response.UserId)
        await user.update({
          karma: req.body.upVote ? user.karma + 1 : user.karma - 1
        })

        await response.update({
          upVotes: req.body.upVote ? response.upVotes + 1 : response.upVotes - 1,
          downVotes: req.body.upVote ? response.downVotes - 1 : response.downVotes + 1
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
