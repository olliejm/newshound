const AuthenticationController = require('./controllers/AuthenticationController')
const PostController = require('./controllers/PostController')
const RegistrationPolicy = require('./policies/RegistrationPolicy')

module.exports = (app) => {
  app.post('/register',
    RegistrationPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.post('/posts',
    PostController.post)

  app.get('/posts',
    PostController.index)
}
