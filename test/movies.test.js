/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import supertest from 'supertest'
import server from '../app'
import models from '../models'

const chai = require('chai')

const should = chai.should()

const request = supertest.agent(server)
const moviesModel = models.Movies
let newMovie = {}
let movieToDelete = {}

describe('Movies Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await moviesModel.create({
      title: 'test movies',
      genres: 'comedy',
      writers: 'Olatubosun',
      cast: 'coding class',
      plot: 'hey',
      year: 700,
      likes: 6,
      rating: 20
    })
    newMovie = await moviesModel.create({
      title: 'How to get away with murder',
      genres: 'comedy',
      writers: 'Janet',
      cast: 'coding class',
      plot: 'Just a random movie',
      year: 1999,
      likes: 300,
      rating: 1
    })
    movieToDelete = await moviesModel.create({
      title: 'Inception',
      genres: 'Sci-Fi',
      writers: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio',
      plot:
        'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
      year: 2010
    })
  })
  after(async () => {
    // empty the database
    await moviesModel.destroy({ where: {} })
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

  describe('/GET Get all movies', () => {
    it('it should GET all the movies', (done) => {
      request.get('/api/v1/movies').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.movies).to.be.an('array')
        expect(res.body.message).be.equal('Movies fetched successfully')
        done()
      })
    })
  })

  describe('Update movies route', () => {
    it('should UPDATE a movie given the id', (done) => {
      request
        .put(`/api/v1/movies/${newMovie.id}`)
        .send({
          title: 'how to get away with murder',
          genres: 'Drama',
          writers: 'Olatubosun',
          cast: 'Annalise Keathing',
          plot: 'Just a random test movie',
          year: '2021'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Movie updated successfully')
          done()
        })
    })
    it('should return movie with this id does not exist', (done) => {
      request
        .put('/api/v1/movies/555555')
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999'
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
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: 'yipee'
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
        .send({
          title: '',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999'
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
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          writers: '',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999'
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
        .send({
          title: 'Orange is the new black',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009'
        })
        .end((err, res) => {
          res.status.should.be.equal(201)
          expect(res.body.message).be.equal('Movie added successfully')
          done()
        })
    })
    it('should Add Book when id does not exist', (done) => {
      request
        .post('/api/v1/movies/2222')
        .send({
          title: 'Orange is the new black',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009'
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
        .send({
          title: 'Orange is the new black',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: 'hey'
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
        .send({
          title: '',
          genres: 'Drama',
          writers: 'Joy',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009'
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
        .send({
          title: 'Orange is the new black',
          genres: 'Drama',
          writers: '',
          cast: 'Alex Michael',
          plot:
            'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
          year: '2009'
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
      request.delete(`/api/v1/movies/${movieToDelete.id}`).end((err, res) => {
        res.status.should.be.equal(204)
        done()
      })
    })
    it('should return Movie does not exist', (done) => {
      request.delete('/api/v1/movies/808020').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).be.equal('Movie not found')
        done()
      })
    })
  })

  describe('Get single Movie', () => {
    it('it should GET a movie by id', (done) => {
      request.get(`/api/v1/movie/${newMovie.id}`).end((err, res) => {
        res.status.should.be.equal(201)
        res.body.should.be.a('object')
        expect(res.body.movie).to.have.property('title')
        expect(res.body.movie).to.have.property('writers')
        expect(res.body.movie).to.have.property('year')
        done()
      })
    })
    it('it should GET a movie by id', (done) => {
      request.get('/api/v1/movie/8888').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).to.equal('movie not found')
        done()
      })
    })
  })
})
