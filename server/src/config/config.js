const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  port: process.env.PORT || 8082,
  db: {
    database: process.env.DB_NAME || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './db.sqlite',
      operatorsAliases: Op
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtSession: {
      session: false
    }
  }
}
