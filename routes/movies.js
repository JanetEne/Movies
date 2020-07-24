import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to Movies API' });
});

module.exports = router
