import server from '../app'
import models from '../models'
const chai = require('chai')

const should = chai.should()

describe('Index route', () => {
  it('should return welcome message when / route is matched', (done) => {
    request.get('/').end((err, res) => {
      res.status.should.be.equal(200)
      expect(res.body.message).be.equal('Welcome to Movies Api')
      done()
    })
  })
})
