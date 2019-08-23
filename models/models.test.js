const supertest = require('supertest')

const db = require('../data/dbConfig.js')
const { find, findById, add, remove, update } = require('../models/models.js')

describe('teams model', () => {

  beforeEach(async () => {
    await db('teams').truncate()
  })

    it('is process.env.DB_ENV is pointing to testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    describe('add()', () => {

        it('add teams', async () => {
          await add({ name: 'Mariners' })
          await add({ name: 'Yankees' })
          await add({ name: 'Cardinals' })

          const teams = await db('teams')

          expect(teams).toHaveLength(3)
        })

        it('add provided team', async () => {
          let team = { name: 'Angels' }
          let added = await add(team)
          expect(added.name).toBe(team.name)
        })
    })

    describe('find()', () => {

        it('find all teams', async () => {
          await add({ name: 'Mariners' })
          await add({ name: 'Yankees' })
          await add({ name: 'Cardinals' })

          const teams = await find()

          expect(teams).toHaveLength(3)
        })

        it('find team by id', async () => {
          const found = await add({ name: 'Mariners' })
          await add({ name: 'Yankees' })
          await add({ name: 'Cardinals' })

          const team = await findById(1)

          expect(team).toEqual(found)
        })

    })

    describe('remove()', () => {

        it('remove specific team', async () => {
          await add({ name: 'Mariners' })
          await add({ name: 'Yankees' })
          await add({ name: 'Cardinals' })

          await remove(1)

          const teams = await db('teams')

          expect(teams).toHaveLength(2)
        })

    })

    describe('update()', () => {

        it('update specific team', async () => {
          await add({ name: 'Mariners' })
          await add({ name: 'Yankees' })
          await add({ name: 'Cardinals' })

          const changes = { name: 'Seattle Mariners' }

          await update(1, changes)

          const updated = await findById(1)

          expect(updated.name).toEqual(changes.name)
        })

    })
})
