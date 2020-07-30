import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'
import models from '../models'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)
const moviesModel = models.Movies

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
  })
})
