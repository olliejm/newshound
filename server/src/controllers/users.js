const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSign(userJson)
      })
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

      if (!user || !await user.comparePassword(password)) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSign(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred during login'
      })
    }
  },
  async delete (req, res) {
    try {
      const user = await User.findById(req.user.id)
      if (!user) {
        res.status(404).send({
          error: 'No account found with these credentials'
        })
      }

      await user.destroy()
      res.send({
        success: 'Account deleted'
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred deleting your account'
      })
    }
  }
}

function jwtSign (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7
  })
}
