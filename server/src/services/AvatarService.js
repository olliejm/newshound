const {User} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      res.send({
        avatar: user.avatar
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred finding the avatar location'
      })
    }
  }
}
