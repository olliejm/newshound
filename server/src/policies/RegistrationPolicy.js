const Joi = require('joi')

module.exports = {
  validate (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'The email address you provided is invalid'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password must contain only alphanumeric characters and be between 8-32 characters long'
          })
          break
        default:
          res.status(400).send({
            error: 'Unknown registration validation error'
          })
      }
    } else {
      next()
    }
  }
}
