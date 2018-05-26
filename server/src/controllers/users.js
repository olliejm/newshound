const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      delete userJson.password

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
      delete userJson.password

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
  async show (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      const userJson = user.toJSON()
      delete userJson.password

      res.send({
        user: userJson
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred finding the user'
      })
    }
  },
  async update (req, res) {
    try {
      const user = await User.findById(req.user.id)
      const userJson = user.toJSON()
      await user.update(req.body)
      delete userJson.password

      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred updating your account'
      })
    }
  },
  async delete (req, res) {
    try {
      const user = await User.findById(req.user.id)
      const userJson = user.toJSON()
      await user.destroy()
      delete userJson.password

      res.send({
        user: userJson
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
