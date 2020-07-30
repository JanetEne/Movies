import models from '../models/index'
import { Op } from 'sequelize'

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
      if (!movie) {
        return res.status(404).send({ message: 'Movie not found' })
      }
      return movie
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

  static deleteMovie(req, res) {
    const id = parseInt(req.params.id)
    moviesModel.findByPk(id).then((movie) => {
      if (!movie) {
        return res.status(404).send({
          message: 'movie not found',
        })
      }
      return movie.destroy().then(() => {
        return res.status(204).send({
          message: 'book deleted successfully',
        })
      })
    })
  }

  static getSingleMovie(req, res) {
    const id = parseInt(req.params.id)
    moviesModel
      .findOne({
        where: {
          id
        }
      })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send({
            message: 'movie not found',
          })
        }
        return res
          .status(201)
          .send({ message: 'Movie found successfully', movie })
      })
  }

  static searchMovieByTitle(req, res) {
    moviesModel.findAll({
      where: {
        title: {
          [Op.substring]: `%${req.query.title}%`
        }
      }
    }).then((movie) => {
      res
        .status(200)
        .send({ movie })
    })
  }

  static searchMovieBygenres(req, res) {
    moviesModel.findAll({
      where: {
        genres: {
          [Op.substring]: `%${req.query.genres}%`
        }
      }
    }).then((movie) => {
      res
        .status(200)
        .send({ movie })
    })
  }

  static searchMovieByWriters(req, res) {
    moviesModel.findAll({
      where: {
        writers: {
          [Op.substring]: `%${req.query.writers}%`
        }
      }
    }).then((movie) => {
      res
        .status(200)
        .send({ movie })
    })
  }

  static searchMovieByCast(req, res) {
    moviesModel.findAll({
      where: {
        cast: {
          [Op.substring]: `%${req.query.cast}%`
        }
      }
    }).then((movie) => {
      res
        .status(200)
        .send({ movie })
    })
  }

  static searchMovieByYear(req, res) {
    if (req.query.year) {
      const year = parseInt(req.query.year)
      moviesModel.findAll({
        where: {
          year: {
            [Op.eq]: year
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.year_greater_than) {
      const year = parseInt(req.query.year_greater_than)
      moviesModel.findAll({
        where: {
          year: {
            [Op.gt]: year
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.year_less_than) {
      const year = parseInt(req.query.year_less_than)
      moviesModel.findAll({
        where: {
          year: {
            [Op.lt]: year
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
  }

  static searchMovieByLikes(req, res) {
    if (req.query.likes) {
      const likes = parseInt(req.query.likes)
      moviesModel.findAll({
        where: {
          likes: {
            [Op.eq]: likes
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.likes_greater_than) {
      const likes = parseInt(req.query.likes_greater_than)
      moviesModel.findAll({
        where: {
          likes: {
            [Op.gt]: likes
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.likes_less_than) {
      const likes = parseInt(req.query.likes_less_than)
      moviesModel.findAll({
        where: {
          likes: {
            [Op.lt]: likes
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
  }

  static searchMovieByRating(req, res) {
    if (req.query.rating) {
      const rating = parseInt(req.query.rating)
      moviesModel.findAll({
        where: {
          rating: {
            [Op.eq]: rating
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.rating_greater_than) {
      const rating = parseInt(req.query.rating_greater_than)
      moviesModel.findAll({
        where: {
          rating: {
            [Op.gt]: rating
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
    if (req.query.rating_less_than) {
      const likes = parseInt(req.query.rating_less_than)
      moviesModel.findAll({
        where: {
          rating: {
            [Op.lt]: rating
          }
        }
      }).then((movies) => {
        res.status(200).send({ movies })
      })
    }
  }
}

export default Movies
