import express from 'express'

import Movies from '../controllers/movies'

const router = express.Router();

/* GET home page. */
router.get('/', Movies.welcome)

module.exports = router;
