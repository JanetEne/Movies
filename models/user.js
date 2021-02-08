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
  }
  return Users
}
