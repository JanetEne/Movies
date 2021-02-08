/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable radix */
import { Op } from 'sequelize'
import models from '../models/index'

const moviesModel = models.Movies

class Movies {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Movies Api' })
  }

  static getAllMovies(req, res) {
    moviesModel.findAll().then((movies) => {
      res.status(200).send(movies)
    })
  }

  static addMovies(req, res) {
    moviesModel
      .create({
        title: req.body.title,
        img: req.body.img,
        genres: req.body.genres,
        writers: req.body.writers,
        cast: req.body.cast,
        plot: req.body.plot,
        year: req.body.year,
        userId: req.decoded.id
      })
      .then((movie) => {
        return res.status(201).send(movie)
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
          img: req.body.img || movie.img,
          genres: req.body.genres || movie.genres,
          writers: movie.writers || movie.writers,
          likes: movie.likes,
          cast: req.body.cast || movie.cast,
          plot: req.body.plot || movie.plot,
          year: req.body.year || movie.year,
        })
        .then((Movie) => {
          res.status(200).send(Movie)
        })
    })
  }

  static deleteMovie(req, res) {
    const id = parseInt(req.params.id)
    moviesModel.findByPk(id).then((movie) => {
      if (!movie) {
        return res.status(404).send({
          message: 'Movie not found',
        })
      }
      return movie.destroy().then(() => {
        return res.status(204).send({
          message: 'Movie deleted successfully',
        })
      })
    })
  }

  static getSingleMovie(req, res) {
    const id = parseInt(req.params.id)
    moviesModel
      .findOne({
        where: {
          id,
        },
      })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send({
            message: 'movie not found',
          })
        }
        return res.status(201).send(movie)
      })
  }

  static searchMovieByTitle(req, res) {
    moviesModel
      .findAll({
        where: {
          title: {
            [Op.substring]: `%${req.query.title}%`,
          },
        },
      })
      .then((movie) => {
        res.status(200).send({ data: movie })
      })
  }

  static searchMovieBygenres(req, res) {
    moviesModel
      .findAll({
        where: {
          genres: {
            [Op.substring]: `%${req.query.genres}%`,
          },
        },
      })
      .then((movie) => {
        res.status(200).send({ data: movie })
      })
  }

  static searchMovieByWriters(req, res) {
    moviesModel
      .findAll({
        where: {
          writers: {
            [Op.substring]: `%${req.query.writers}%`,
          },
        },
      })
      .then((movie) => {
        res.status(200).send({ data: movie })
      })
  }

  static searchMovieByCast(req, res) {
    moviesModel
      .findAll({
        where: {
          cast: {
            [Op.substring]: `%${req.query.cast}%`,
          },
        },
      })
      .then((movie) => {
        res.status(200).send({ data: movie })
      })
  }

  static searchMovieByYear(req, res) {
    if (req.query.year) {
      const year = parseInt(req.query.year)
      moviesModel
        .findAll({
          where: {
            year: {
              [Op.eq]: year,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.year_greater_than) {
      const year = parseInt(req.query.year_greater_than)
      moviesModel
        .findAll({
          where: {
            year: {
              [Op.gt]: year,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.year_less_than) {
      const year = parseInt(req.query.year_less_than)
      moviesModel
        .findAll({
          where: {
            year: {
              [Op.lt]: year,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
  }

  static searchMovieByLikes(req, res) {
    if (req.query.likes) {
      const likes = parseInt(req.query.likes)
      moviesModel
        .findAll({
          where: {
            likes: {
              [Op.eq]: likes,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.likes_greater_than) {
      const likes = parseInt(req.query.likes_greater_than)
      moviesModel
        .findAll({
          where: {
            likes: {
              [Op.gt]: likes,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.likes_less_than) {
      const likes = parseInt(req.query.likes_less_than)
      moviesModel
        .findAll({
          where: {
            likes: {
              [Op.lt]: likes,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
  }

  static searchMovieByRating(req, res) {
    if (req.query.ratings) {
      const ratings = parseInt(req.query.ratings)
      moviesModel
        .findAll({
          where: {
            ratings: {
              [Op.eq]: ratings,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.ratings_greater_than) {
      const ratings = parseInt(req.query.ratings_greater_than)
      moviesModel
        .findAll({
          where: {
            ratings: {
              [Op.gt]: ratings,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
    if (req.query.ratings_less_than) {
      const ratings = parseInt(req.query.ratings_less_than)
      moviesModel
        .findAll({
          where: {
            ratings: {
              [Op.lt]: ratings,
            },
          },
        })
        .then((movies) => {
          res.status(200).send({ data: movies })
        })
    }
  }
}

export default Movies
