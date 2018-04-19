module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Vote', {
    upVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
}
