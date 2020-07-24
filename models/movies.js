module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define('Movies', {
    title: DataTypes.STRING,
    genres: DataTypes.STRING,
    writers: DataTypes.STRING,
    cast: DataTypes.STRING,
    plot: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});

  return Movies;
};
