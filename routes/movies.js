import express from 'express'

import Movies from '../controllers/movies'

const router = express.Router();

router.get('/movies', Movies.getAllMovies)
router.post('/movies', Movies.addMovies)

module.exports = router;
