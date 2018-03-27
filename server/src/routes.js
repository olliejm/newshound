const AuthenticationController = require('./controllers/AuthenticationController')
const RegistrationPolicy = require('./policies/RegistrationPolicy')

module.exports = (app) => {
  app.post('/register',
    RegistrationPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
}
