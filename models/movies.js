/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    'Movies',
    {
      title: DataTypes.STRING,
      img: DataTypes.STRING,
      genres: DataTypes.STRING,
      writers: DataTypes.STRING,
      cast: DataTypes.STRING,
      plot: DataTypes.STRING,
      year: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      ratings: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  )
  Movies.associate = (models) => {
    Movies.belongsTo(models.Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
    Movies.hasMany(models.Ratings, { foreignKey: 'movieId', as: 'rating' })
    Movies.hasMany(models.Likes, { foreignKey: 'movieId', as: 'like' })
  }

  return Movies
}
