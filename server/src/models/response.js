module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    body: DataTypes.STRING,
    audioUri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.INTEGER
  })

  Response.associate = function (models) {
    models.Response.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
    models.Response.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
    models.Response.belongsToMany(models.User, {
      through: models.Vote,
      as: 'Votes'
    })
  }

  return Response
}
