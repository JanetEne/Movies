module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      rating: DataTypes.INTEGER
    },
    {}
  )
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.Movies, { foreignKey: 'movieId', onDelete: 'CASCADE' })
    Ratings.belongsTo(models.Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
  }
  return Ratings
}
