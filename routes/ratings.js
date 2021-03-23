import express from 'express'
import Ratings from '../controllers/ratings'
import validatetoken from '../middleware/validatetoken'

const router = express.Router();

router.post('/rating/:id', validatetoken, Ratings.rateMovie)
router.get('/rating/:id', Ratings.getRating)

module.exports = router;
