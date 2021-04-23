/* eslint-disable comma-dangle */
/* eslint-disable radix */
import models from '../models/index'

const likesModel = models.Likes

class Likes {
  static likeMovie(req, res) {
    const movieId = parseInt(req.params.id)
    const userId = parseInt(req.decoded.id)
    likesModel
      .findOne({
        where: {
          movieId,
          userId,
        },
      })
      .then((like) => {
        if (like) {
          like.update({
            like: req.body.like,
          })
          return res.status(200).send({ like })
        }
        return likesModel
          .create({
            like: req.body.like,
            movieId,
            userId,
          })
          .then((newLike) => res.status(200).send(newLike))
      })
  }

  static getLikes(req, res) {
    const movieId = parseInt(req.params.id)
    const userId = parseInt(req.query.userId)
    let myLike = 0
    if (userId) {
      likesModel
        .findOne({
          where: {
            movieId,
            userId,
          },
        })
        .then((userLikes) => {
          if (userLikes) {
            myLike = userLikes.like
          }
        })
    }
    likesModel
      .count({
        where: {
          movieId,
        },
      })
      .then((count) => res.status(200).send({ count, myLike }))
  }
}

export default Likes
