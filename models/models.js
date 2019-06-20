const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('teams').select('id', 'name');
}

function findById(id) {
  return db('teams')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('teams').where(filter);
}

async function add(team) {
  const [id] = await db('teams').insert(team);

  return findById(id);
}

function update(id, changes) {
  return db('teams')
  .where({ id })
  .update(changes, '*');
}

function remove(id) {
  return db('teams')
  .where({ id })
  .del();
}
