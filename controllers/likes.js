/* eslint-disable no-unused-vars */
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
          like.destroy().then(() =>
            res.status(204).send({
              message: 'like deleted successfully',
            }))
        } else {
          return likesModel
            .create({
              like: 1,
              movieId,
              userId,
            })
            .then((newLike) => res.status(200).send({ message: 'movie liked' }))
        }
      })
  }

  static getLikes(req, res) {
    const movieId = parseInt(req.params.id)
    const userId = parseInt(req.query.userId)
    let isLiked = false
    likesModel
      .findOne({
        where: {
          movieId,
          userId,
        },
      })
      .then((userLikes) => {
        if (userLikes) {
          isLiked = true
        }
        likesModel
          .count({
            where: {
              movieId,
            },
          })
          .then((count) => res.status(200).send({ count, isLiked }))
      })
  }
}

export default Likes
