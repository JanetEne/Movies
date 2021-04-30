module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'Likes',
    {
      like: DataTypes.INTEGER
    },
    {}
  )
  Likes.associate = (models) => {
    Likes.belongsTo(models.Movies, { foreignKey: 'movieId', onDelete: 'CASCADE' })
    Likes.belongsTo(models.Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
  }
  return Likes
}
