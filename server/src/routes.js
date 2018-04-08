const RegistrationPolicy = require('./policies/RegistrationPolicy')
const UploadController = require('./controllers/UploadController')
const AuthenticationController = require('./controllers/AuthenticationController')
const PostController = require('./controllers/PostController')
const ResponseController = require('./controllers/ResponseController')

module.exports = (app) => {
  app.post('/register',
    UploadController.upload.single('avatar'),
    RegistrationPolicy.validate,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.post('/posts',
    PostController.post)
  app.put('/posts/:postId',
    PostController.put)
  app.get('/posts',
    PostController.index)
  app.get('/posts/:postId',
    PostController.show)

  app.post('/posts/:postId/responses',
    ResponseController.post)
  app.put('/posts/:postId/responses/:responseId',
    ResponseController.put)
  app.get('/posts/:postId/responses',
    ResponseController.index)
  app.get('/posts/:postId/responses/:responseId',
    ResponseController.show)
}
