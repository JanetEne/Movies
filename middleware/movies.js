import isNumeric from 'validator/lib/isNumeric'

// eslint-disable-next-line consistent-return
const validateAddMovie = (req, res, next) => {
  if (!req.body.title.trim()) {
    return res.status(400).send({ message: 'Title cannot be empty' })
  }
  if (!req.body.writers.trim()) {
    return res.status(400).send({ message: 'Writers cannot be empty' })
  }
  // if (!isNumeric(req.body.year)) {
  //   return res.status(400).send({ message: 'Year must be a number' })
  // }
  next()
}

export default validateAddMovie
