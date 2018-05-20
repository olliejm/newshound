const {User, Response} = require('../models')

module.exports = {
  async avatar (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      res.send(user.avatarUri)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred fetching the avatar URI'
      })
    }
  },
  async response (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)
      res.send(response.audioUri)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred fetching the response URI'
      })
    }
  }
}
