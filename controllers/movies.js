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

  static addMovies(req, res) {
    moviesModel
      .create({
        title: req.body.title,
        genres: req.body.genres,
        writers: req.body.writers,
        cast: req.body.cast,
        plot: req.body.plot,
        year: req.body.year,
      })
      .then((newMovie) => {
        return res
          .status(201)
          .send({ message: 'Movie added successfully', newMovie })
      })
  }

  static updateMovie(req, res) {
    const id = parseInt(req.params.id)
    moviesModel.findByPk(id).then((movie) => {
      movie
        .update({
          title: req.body.title || movie.title,
          genres: req.body.genres || movie.genres,
          writers: movie.writers || movie.writers,
          likes: movie.likes,
          cast: req.body.cast || movie.cast,
          plot: req.body.plot || movie.plot,
          year: req.body.year || movie.year,
        })
        .then((updatedmovie) => {
          res
            .status(200)
            .send({ message: 'Movie updated successfully', updatedmovie })
        })
    })
  }
}

export default Movies
