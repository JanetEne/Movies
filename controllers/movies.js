import models from '../models/index'

const moviesModel = models.Movies

class Movies {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Movies Api' })
  }

  static getAllMovies(req, res) {
    moviesModel.findAll().then((movies) => {
      res.status(200).send({ message: 'Movies fetched successfully', movies })
    })
  }
}

export default Movies
