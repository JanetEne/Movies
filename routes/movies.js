import express from 'express'

import Movies from '../controllers/movies'

const router = express.Router();

router.get('/movies', Movies.getAllMovies)
router.post('/movies', Movies.addMovies)
router.put('/movies/:id', Movies.updateMovie)
router.delete('/movies/:id', Movies.deleteMovie)
router.get('/movies/:id', Movies.getSingleMovie)



module.exports = router;
