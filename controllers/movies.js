class Movies {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Movies Api' })
  }
}

export default Movies
