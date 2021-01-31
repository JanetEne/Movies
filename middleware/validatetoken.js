import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const validateToken = (req, res, next) => {
  let token = req.headers.authorization
  // eslint-disable-next-line prefer-destructuring
  token = token.split(' ')[1]

  // eslint-disable-next-line consistent-return
  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(401).send({
        message: 'Access is Denied'
      })
    }
  })
  next()
}

export default validateToken
