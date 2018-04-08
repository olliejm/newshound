module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    body: DataTypes.TEXT,
    rating: DataTypes.INTEGER
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
  }

  return Response
}
