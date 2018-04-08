const {Response} = require('../models')

module.exports = {
  async post (req, res) {
    try {
      const response = await Response.create(req.body)
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: `An error occurred creating the response`
      })
    }
  },
  async put (req, res) {
    try {
      const response = await Response.update(req.body, {
        where: {
          id: req.params.responseId
        }
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred updating the response'
      })
    }
  },
  async index (req, res) {
    try {
      const response = await Response.findAll()
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred loading the responses'
      })
    }
  },
  async show (req, res) {
    try {
      const response = await Response.findById(req.params.responseId)
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred loading the response'
      })
    }
  }
}
