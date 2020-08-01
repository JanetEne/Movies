import express from 'express'
import User from '../controllers/users'
import validateSignUp from '../middleware/validateUser'

const router = express.Router();

router.post('/signup', validateSignUp, User.signUp)

module.exports = router;
