const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const app = express()

const config = require('./config/config')
const {sequelize} = require('./models')

app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

require('./auth')(passport)
require('./routes')(app)

sequelize.sync({
  force: false
})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
