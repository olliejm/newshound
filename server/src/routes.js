const RegistrationPolicy = require('./policies/RegistrationPolicy')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const UploadService = require('./services/UploadService')
const AvatarService = require('./services/AvatarService')
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const ResponseController = require('./controllers/ResponseController')

module.exports = (app) => {
  app.post('/register',
    RegistrationPolicy.validate,
    UploadService.upload.single('avatar'),
    UserController.register)
  app.post('/login',
    UserController.login)
  app.delete('/unregister',
    AuthenticationPolicy.verify,
    UserController.remove)

  app.post('/posts',
    AuthenticationPolicy.verify,
    PostController.post)
  app.get('/posts',
    AuthenticationPolicy.verify,
    PostController.index)
  app.put('/posts/:postId',
    AuthenticationPolicy.verify,
    PostController.put)
  app.get('/posts/:postId',
    AuthenticationPolicy.verify,
    PostController.show)
  app.delete('/posts/:postId',
    AuthenticationPolicy.verify,
    PostController.remove)
  app.get('/users/:userId/posts',
    AuthenticationPolicy.verify,
    PostController.index)

  app.post('/responses',
    AuthenticationPolicy.verify,
    UploadService.upload.single('response'),
    ResponseController.post)
  app.put('/responses/:responseId',
    AuthenticationPolicy.verify,
    ResponseController.put)
  app.delete('/responses/:responseId',
    AuthenticationPolicy.verify,
    ResponseController.remove)
  app.get('/posts/:postId/responses',
    AuthenticationPolicy.verify,
    ResponseController.index)

  app.get('/avatars/:userId',
    AuthenticationPolicy.verify,
    AvatarService.show)
}
