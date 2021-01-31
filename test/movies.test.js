/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import server from '../app'
import models from '../models'

const chai = require('chai')

const should = chai.should()

const secret = process.env.JWT_SECRET
const request = supertest.agent(server)
const moviesModel = models.Movies
const UserModel = models.User

let testUser = {}
const faketoken = 'twbdshbhbedbhsbhwhbdvyvdwvghn'
let newMovie = {}
let movieToDelete = {}

describe('Movies Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    testUser = await UserModel.create({
      firstName: 'Vanessa',
      lastName: 'Ogenyi',
      email: 'Vanessa@gmail.com',
      hash: bcrypt.hashSync('password', 8),
    })

    testUser.token = jwt.sign(
      {
        id: testUser.id,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email,
      },
      secret
    )

    await moviesModel.create({
      title: 'test movies',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
      genres: 'comedy',
      writers: 'Olatubosun',
      cast: 'coding class',
      plot: 'hey',
      year: 2009,
      likes: 6,
      ratings: 20,
    })
    await moviesModel.create({
      title: 'jurassic park ',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
      genres: 'Sci-Fi',
      writers: 'Michael crichton',
      cast: 'Sam Neill',
      plot: 'Just a random movie',
      year: 1993,
      likes: 500,
      ratings: 50,
    })
    newMovie = await moviesModel.create({
      title: 'How to get away with murder',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
      genres: 'comedy',
      writers: 'Janet',
      cast: 'coding class',
      plot: 'Just a random movie',
      year: 2018,
      likes: 300,
      ratings: 1,
    })
    movieToDelete = await moviesModel.create({
      title: 'Inception',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
      genres: 'Sci-Fi',
      writers: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio',
      plot:
        'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
      year: 2010,
    })
  })
  // after(async () => {
  //   // empty the database
  //   await moviesModel.destroy({ where: {} })
  // })

  // Test invalid token
  describe('Route authentication', () => {
    it('Should return access denied if token is invalid', (done) => {
      request
        .post('/api/users/signin')
        .send({
          email: 'Vanessa@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          request
            .post('/api/v1/movies')
            .set('authorization', `Bearer ${faketoken}`)
            // eslint-disable-next-line no-shadow
            .end((err, res) => {
              expect(res.status).to.equal(401)
              expect(res.body.message).to.equal('Access is Denied')
              done()
            })
        })
    })
  })

  describe('Index route', () => {
    it('should return welcome message when / route is matched', (done) => {
      request.get('/api/v1').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to Movies Api')
        done()
      })
    })
  })

  // describe('/GET Get all movies', () => {
  //   it('it should GET all the movies', (done) => {
  //     request.get('/api/v1/movies').end((err, res) => {
  //       res.status.should.be.equal(200)
  //       expect(res.body.movies).to.be.an('array')
  //       done()
  //     })
  //   })
  // })

  describe('Update movies route', () => {
    it('should UPDATE a movie given the id', (done) => {
      request
        .put(`/api/v1/movies/${newMovie.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'how to get away with murder',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: 'Olatubosun',
          cast: 'Annalise Keathing',
          plot: 'Just a random test movie',
          year: '2021',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
    })
    it('should return movie with this id does not exist', (done) => {
      request
        .put('/api/v1/movies/555555')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'How to get away with murder',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999',
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Movie not found')
          done()
        })
    })
    it('should return Year must be a number if the year passed isnt a number', (done) => {
      request
        .put(`/api/v1/movies/${newMovie.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'How to get away with murder',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: 'yipee',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Year must be a number')
          done()
        })
    })
    it('should return title cannot be empty if user doesnt put a title', (done) => {
      request
        .put(`/api/v1/movies/${newMovie.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: '',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Title cannot be empty')
          done()
        })
    })
    it('should return writer cannot be empty if user doesnt put an author', (done) => {
      request
        .put(`/api/v1/movies/${newMovie.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'How to get away with murder',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'comedy',
          writers: '',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Writers cannot be empty')
          done()
        })
    })
  })

  describe('Add movies route', () => {
    it('should Add Movie', (done) => {
      request
        .post('/api/v1/movies')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'Orange is the new black',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009',
        })
        .end((err, res) => {
          res.status.should.be.equal(201)
          done()
        })
    })
    it('should Add Movie when id does not exist', (done) => {
      request
        .post('/api/v1/movies/2222')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'Orange is the new black',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009',
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal(undefined)
          done()
        })
    })
    it('should return Year must be a number if the year passed isnt a number', (done) => {
      request
        .post('/api/v1/movies')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'Orange is the new black',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: 'hey',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Year must be a number')
          done()
        })
    })
    it('should return title cannot be empty if user doesnt put a title', (done) => {
      request
        .post('/api/v1/movies')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: '',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Title cannot be empty')
          done()
        })
    })
    it('should return writer cannot be empty if user doesnt put an writer', (done) => {
      request
        .post('/api/v1/movies')
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
          title: 'Orange is the new black',
          img:
            'https://images-na.ssl-images-amazon.com/images/I/A1zV1fxtMEL._SL1500_.jpg',
          genres: 'Drama',
          writers: '',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009',
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Writers cannot be empty')
          done()
        })
    })
  })

  describe('Delete book', () => {
    it('should DELETE a Movie given the id', (done) => {
      request
        .delete(`/api/v1/movies/${movieToDelete.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .end((err, res) => {
          res.status.should.be.equal(204)
          done()
        })
    })
    it('should return Movie does not exist', (done) => {
      request
        .delete('/api/v1/movies/808020')
        .set('authorization', `Bearer ${testUser.token}`)
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Movie not found')
          done()
        })
    })
  })

  // describe('Get single Movie', () => {
  //   it('it should GET a movie by id', (done) => {
  //     request.get(`/api/v1/movie/${newMovie.id}`).end((err, res) => {
  //       res.status.should.be.equal(201)
  //       res.body.should.be.a('object')
  //       expect(res.body.movie).to.have.property('title')
  //       expect(res.body.movie).to.have.property('writers')
  //       expect(res.body.movie).to.have.property('year')
  //       done()
  //     })
  //   })
  //   it('it should GET a movie by id', (done) => {
  //     request.get('/api/v1/movie/8888').end((err, res) => {
  //       res.status.should.be.equal(404)
  //       expect(res.body.message).to.equal('movie not found')
  //       done()
  //     })
  //   })
  // })

  describe('Get Movie By title route', () => {
    it('should get a Movie by title', (done) => {
      request
        .get('/api/v1/movies/title')
        .query({ title: 'How to get away with murder' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get Movie By writers route', () => {
    it('should get movie by writer', (done) => {
      request
        .get('/api/v1/movies/writers')
        .query({ writers: 'Janet' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get Movie By genres route', () => {
    it('should get movies by writer', (done) => {
      request
        .get('/api/v1/movies/genres')
        .query({ genres: 'comedy' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get Movie By cast route', () => {
    it('should get movies by cast', (done) => {
      request
        .get('/api/v1/movies/cast')
        .query({ cast: 'coding class' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get movie By Year Route', () => {
    it('should get movie by year', (done) => {
      request
        .get('/api/v1/movies/year')
        .query({ year: 2018 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by year greater than', (done) => {
      request
        .get('/api/v1/movies/year')
        .query({ year_greater_than: 2005 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by year less than', (done) => {
      request
        .get('/api/v1/movies/year')
        .query({ year_less_than: 2002 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get movie By likes Route', () => {
    it('should get movie by likes', (done) => {
      request
        .get('/api/v1/movies/likes')
        .query({ likes: 500 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by likes greater than', (done) => {
      request
        .get('/api/v1/movies/likes')
        .query({ likes_greater_than: 300 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by likes less than', (done) => {
      request
        .get('/api/v1/movies/likes')
        .query({ likes_less_than: 300 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('Get movie By rating Route', () => {
    it('should get movie by rating', (done) => {
      request
        .get('/api/v1/movies/ratings')
        .query({ ratings: 50 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by rating greater than', (done) => {
      request
        .get('/api/v1/movies/ratings')
        .query({ ratings_greater_than: 20 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should get movie by rating less than', (done) => {
      request
        .get('/api/v1/movies/ratings')
        .query({ ratings_less_than: 20 })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
})
