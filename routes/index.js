const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to Movies API' });
});

module.exports = router;
