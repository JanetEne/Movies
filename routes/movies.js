import express from 'express'
import validateAddMovie from '../middleware/movies'
import Movies from '../controllers/movies'

const router = express.Router();

router.get('/movies', Movies.getAllMovies)
router.post('/movies', validateAddMovie, Movies.addMovies)
router.put('/movies/:id', validateAddMovie, Movies.updateMovie)
router.delete('/movies/:id', Movies.deleteMovie)
router.get('/movie/:id', Movies.getSingleMovie)
router.get('/movies/title', Movies.searchMovieByTitle)
router.get('/movies/genres', Movies.searchMovieBygenres)
router.get('/movies/writers', Movies.searchMovieByWriters)
router.get('/movies/cast', Movies.searchMovieByCast)
router.get('/movies/year', Movies.searchMovieByYear)
router.get('/movies/likes', Movies.searchMovieByLikes)
router.get('/movies/rating', Movies.searchMovieByRating)

module.exports = router;
