const registration = require('./policies/registration')
const authentication = require('./policies/authentication')
const users = require('./controllers/users')
const posts = require('./controllers/posts')
const responses = require('./controllers/responses')
const uploads = require('./controllers/uploads')
const votes = require('./controllers/votes')

module.exports = (app) => {
  /** USER ROUTES **/
  // Register a user
  app.post('/register',
    uploads.check,
    uploads.upload.single('avatar'),
    uploads.rewrite,
    registration.validate,
    users.register)

  // Login a user
  app.post('/login',
    users.login)

  // Show a user's info
  app.get('/users/:userId',
    registration.validate,
    users.show)

  // Update active user's info
  app.put('/users',
    registration.validate,
    users.update)

  // Delete active user's account
  app.delete('/unregister',
    authentication.validate,
    users.delete)

  /** POST ROUTES **/
  // Create a new post
  app.post('/posts',
    authentication.validate,
    posts.create)

  // Retrieve all posts
  app.get('/posts',
    authentication.validate,
    posts.index)

  // Retrieve a given post
  app.get('/posts/:postId',
    authentication.validate,
    posts.show)

  // Retrieve a user's posts
  app.get('/users/:userId/posts',
    authentication.validate,
    posts.index)

  // Update a given post
  app.put('/posts/:postId',
    authentication.validate,
    posts.update)

  // Delete a given post
  app.delete('/posts/:postId',
    authentication.validate,
    posts.delete)

  /** RESPONSE ROUTES **/
  // Create a response to a post
  app.post('/posts/:postId/responses',
    authentication.validate,
    uploads.check,
    uploads.upload.single('response'),
    uploads.rewrite,
    responses.create)

  // Get the responses to a post
  app.get('/posts/:postId/responses',
    authentication.validate,
    responses.index)

  // Update a response
  app.put('/responses/:responseId',
    authentication.validate,
    responses.update)

  // Delete a response
  app.delete('/responses/:responseId',
    authentication.validate,
    responses.delete)

  /** VOTE ROUTES **/
  // Fetch active user's vote on a response
  app.get('/vote/:responseId',
    authentication.validate,
    votes.show)

  // Vote on a response
  app.put('/vote/:responseId',
    authentication.validate,
    votes.update)
}
