//for testing HTTP request
const request = require('supertest')
//creates the server
const app = require('../app')
const expect = require('chai').expect

// testing the login api endpoint
describe('testing the login api endpoint', function () {
  it('It should be successful if the username and password are provided', function (done) {
    request(app)
      .post('/login') //send a test request
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'password' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty
        expect(response.body).to.be.an('object')
      })
      .end(done)
  })
  it('It should fail if username is not provided', function (done) {
    request(app)
      .post('/login') //send a test request
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ password: 'password' })
      .expect(422)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty
        expect(response.body).to.be.an('object')
      })
      .end(done)
  })
  it('It should fail if password is not provided', function (done) {
    request(app)
      .post('/login') //send a test request
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ username: 'username' })
      .expect(422)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty
        expect(response.body).to.be.an('object')
      })
      .end(done)
  })
})
