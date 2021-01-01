module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define('Movies', {
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    genres: DataTypes.STRING,
    writers: DataTypes.STRING,
    cast: DataTypes.STRING,
    plot: DataTypes.STRING,
    year: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    ratings: DataTypes.INTEGER
  }, {});

  return Movies;
};
