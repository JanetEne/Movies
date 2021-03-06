/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Movies',
      [
        {
          title: 'A quiet place',
          img: 'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Horror',
          writers: 'Scott Beck',
          cast: 'Emily Blunt',
          plot:
            'Following the events at home, the Abbott family now face the terrors of the outside world',
          year: 2020,
          likes: 15,
          ratings: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Movies', null, {})
}
