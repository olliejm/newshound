const {User, Response} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)
      const votes = await response.getVotes()
      res.send(votes)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred retrieving the votes'
      })
    }
  },
  async update (req, res) {
    try {
      const user = await User.findById(req.user.id)
      const response = await Response.findById(req.params.responseId)
      if (response.UserId === user.id) {
        res.status(403).send({
          error: 'You cannot vote on your own post'
        })
      }

      await response.addVote(user, {
        upVote: req.body.upVote
      })
      res.send(await response.getVotes())
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred submitting your vote'
      })
    }
  }
}
