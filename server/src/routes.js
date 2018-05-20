const registration = require('./policies/registration')
const authentication = require('./policies/authentication')
const users = require('./controllers/users')
const posts = require('./controllers/posts')
const responses = require('./controllers/responses')
const uploads = require('./controllers/uploads')
const votes = require('./controllers/votes')
const files = require('./controllers/files')

module.exports = (app) => {
  app.post('/register',
    registration.validate,
    uploads.check,
    uploads.upload.single('avatar'),
    uploads.rewrite,
    users.register)
  app.post('/login',
    users.login)
  app.delete('/unregister',
    authentication.validate,
    users.delete)

  app.post('/posts',
    authentication.validate,
    posts.create)
  app.get('/posts',
    authentication.validate,
    posts.index)
  app.get('/posts/:postId',
    authentication.validate,
    posts.show)
  app.put('/posts/:postId',
    authentication.validate,
    posts.update)
  app.delete('/posts/:postId',
    authentication.validate,
    posts.delete)
  app.get('/users/:userId/posts',
    authentication.validate,
    posts.index)

  app.post('/posts/:postId/responses',
    authentication.validate,
    uploads.check,
    uploads.upload.single('response'),
    uploads.rewrite,
    responses.create)
  app.get('/posts/:postId/responses',
    authentication.validate,
    responses.index)
  app.put('/responses/:responseId',
    authentication.validate,
    responses.update)
  app.delete('/responses/:responseId',
    authentication.validate,
    responses.delete)

  app.get('/responses/:responseId/votes',
    authentication.validate,
    votes.show)
  app.put('/responses/:responseId/votes',
    authentication.validate,
    votes.update)

  app.get('/users/:userId/avatar',
    authentication.validate,
    files.avatar)
  app.get('/responses/:responseId/file',
    authentication.validate,
    files.response)
}
