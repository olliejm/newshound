const {User} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const validPassword = password === user.password
      if (!validPassword) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      res.send({
        user: user.toJSON()
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurred during login'
      })
    }
  }
}
