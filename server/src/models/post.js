module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  })

  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
    models.Post.hasMany(models.Response)
  }

  return Post
}
