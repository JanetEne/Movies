/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
import models from '../models/index'

const ratingsModel = models.Ratings

class Ratings {
  static rateMovie(req, res) {
    const movieId = parseInt(req.params.id)
    const userId = parseInt(req.decoded.id)
    ratingsModel
      .findOne({
        where: {
          movieId,
          userId
        }
      })
      .then((rating) => {
        if (rating) {
          rating.update({
            rating: req.body.rating
          })
          return res.status(200).send({ rating })
        }
        return ratingsModel
          .create({
            rating: req.body.rating,
            movieId,
            userId
          })
          .then((newRating) => res.status(200).send(newRating))
      })
  }

  static getRating(req, res) {
    const movieId = parseInt(req.params.id)
    ratingsModel
      .count({
        where: {
          movieId
        }
      })
      .then((count) => {
        if (count) {
          return ratingsModel
            .sum('rating', {
              where: {
                movieId
              }
            })
            .then((sum) => {
              const average = sum / count
              return res.status(200).send({ average })
            })
        }
        return res.status(200).send({ average: null })
      })
  }
}

export default Ratings
