module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  })

  Post.associate = function (models) {
    Post.belongsTo(models.User)
  }

  return Post
}
