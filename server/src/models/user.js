const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUri: DataTypes.STRING,
    karma: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    hooks: {
      beforeSave: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.associate = function (models) {
    models.User.hasMany(models.Post)
    models.User.hasMany(models.Response)
    models.User.belongsToMany(models.Response, {
      through: models.Vote,
      as: 'Votes'
    })
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
    .then(hash => user.setDataValue('password', hash))
}
