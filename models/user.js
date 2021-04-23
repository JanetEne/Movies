/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      hash: DataTypes.STRING
    },
    {}
  )
  Users.associate = (models) => {
    Users.hasMany(models.Movies, { foreignKey: 'userId', as: 'movies' })
    Users.hasMany(models.Ratings, { foreignKey: 'userId', as: 'rating' })
    Users.hasMany(models.Likes, { foreignKey: 'userId', as: 'like' })
  }
  return Users
}
