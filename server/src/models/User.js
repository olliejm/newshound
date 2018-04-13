const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    avatarUri: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.associate = function (models) {
    models.User.hasMany(models.Post)
    models.User.hasMany(models.Response)
  }

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}

function hashPassword (user) {
  if (!user.changed('password')) return

  return bcrypt
    .genSaltAsync(10)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}
