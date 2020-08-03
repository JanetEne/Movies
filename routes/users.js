import express from 'express'
import User from '../controllers/users'
import validateSignup from '../middleware/validateSignUp'
import validateSignIn from '../middleware/validateSignIn'

const router = express.Router();

router.post('/signup', validateSignup, User.signUp)
router.post('/signin', validateSignIn, User.signIn)

module.exports = router;
