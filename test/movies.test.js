import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'
import models from '../models'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)
const moviesModel = models.Movies
let newMovie = {}

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
      rating: 20,
    })
    newMovie = await moviesModel.create({
      title: 'How to get away with murder',
      genres: 'comedy',
      writers: 'Janet',
      cast: 'coding class',
      plot: 'Just a random movie',
      year: 1999,
      likes: 300,
      rating: 1,
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
          year: '2021',
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
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          writers: 'Janet',
          cast: 'coding class',
          plot: 'Just a random movie',
          year: '1999',
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
        .send({
          title: 'How to get away with murder',
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
})
