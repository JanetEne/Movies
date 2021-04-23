import express from 'express'
import Likes from '../controllers/likes'
import validatetoken from '../middleware/validatetoken'

const router = express.Router();

router.post('/likes/:id', validatetoken, Likes.likeMovie)
router.get('/likes/:id', Likes.getLikes)

module.exports = router;
