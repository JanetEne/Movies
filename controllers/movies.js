import models from '../models/index'

const MoviesModel = models.Movies

class Movies {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Movies Api' })
  }

//   static getMovies {
//       MoviesModel
//   }
}

export default Movies
