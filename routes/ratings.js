import express from 'express'
import Ratings from '../controllers/ratings'
import validatetoken from '../middleware/validatetoken'

const router = express.Router();

router.post('/ratings/:id', validatetoken, Ratings.rateMovie)

module.exports = router;
