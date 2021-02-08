/* eslint-disable function-paren-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import models from '../models/index'

require('dotenv').config()

const rounds = 8
const UserModel = models.Users
const secret = process.env.JWT_SECRET
let password = ''

class User {
  static signUp(req, res) {
    UserModel.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'User Already Exists'
        })
      }
      UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, rounds)
      }).then((newUser) =>
        res.status(201).send({
          message: 'Sign Up Successful',
          token: jwt.sign(
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              id: newUser.id
            },
            secret
          ),
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        })
      )
    })
  }

  static signIn(req, res) {
    UserModel.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          })
        }
        password = bcrypt.compareSync(req.body.password, user.hash)
        if (password) {
          return res.status(200).send({
            token: jwt.sign(
              {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user.id
              },
              secret
            ),
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          })
        }
        return res.status(401).send({
          message: 'Invalid Password'
        })
      })
      .catch((error) => res.status(500).send(error))
  }
}

export default User
