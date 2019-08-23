const supertest = require('supertest')

const server = require('./server.js')

const { find, findById, add, update, remove } = require('../models/models.js')

describe('server', () => {

  describe('GET /', () => {
    it('responds with 200', async () => {
      await supertest(server)
        .get('/')
        .expect(200)
    })

    it('responds with { message: "Hello from the backend!" }', async () => {

      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ message: 'Hello from the backend!' })
        })
    })
  })

  describe('GET /api/teams', () => {

    it('responds with 200 OK', async () => {
      await supertest(server)
        .get('/api/teams')
        .expect(200)
    })

    it('responds with list of teams', async () => {
      const teamsList = await find()
      await supertest(server)
        .get('/api/teams')
        .then(res => {
          expect(res.body).toEqual(teamsList)
        })
    })

  })

  describe('GET /api/teams/:id', () => {

    it('responds with 200 OK', async () => {
      const id = 1

      await supertest(server)
        .get(`/api/teams/${id}`)
        .expect(200)
    })

    it('responds specific team by id', async () => {
      const id = 1

      const team = await findById(id)
      await supertest(server)
        .get(`/api/teams/${id}`)
        .then(res => {
          expect(res.body).toEqual(team)
        })
    })

  })

  describe('POST /api/teams', () => {

    it('responds with 200 OK', async () => {
      const team = {name: 'Padres'}

      await supertest(server)
        .post(`/api/teams`)
        .send(team)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('responds with posted team', async () => {
      const team = {name: 'Padres'}

      await supertest(server)
        .post(`/api/teams`)
        .send(team)
        .then(res => {
          expect(res.body.name).toEqual(team.name)
        })
    })

  })

  describe('PUT /api/teams/:id', () => {

    it('responds with 200 OK', async () => {
      const id = 1
      const changes = {name: 'Seattle Mariners'}

      await supertest(server)
        .put(`/api/teams/${id}`)
        .send(changes)
        .set('Accept', 'application/json')
        .expect(200)
    })

    it('responds with updated team', async () => {
      const id = 1
      const changes = {name: 'Seattle Mariners'}

      await supertest(server)
        .put(`/api/teams/${id}`)
        .send(changes)
        .set('Accept', 'application/json')
        .expect(200)

      await supertest(server)
        .get(`/api/teams/${id}`)
        .then(res => {
          expect(res.body.name).toEqual(changes.name)
        })
    })

  })

  describe('DELETE /api/teams/:id', () => {

    it('responds with 200 OK', async () => {
      const id = 1

      await supertest(server)
        .delete(`/api/teams/${id}`)
        .expect(200)
    })

    it('responds with delete message', async () => {
      const id = 1

      await supertest(server)
      .delete(`/api/teams/${id}`)
      .then(res => {
        expect(res.body).toEqual({message: "Your team has been deleted"})
      })
    })

  })

})
