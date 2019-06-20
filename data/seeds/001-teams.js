
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {
          name: 'Mariners'
        },
        {
          name: 'Yankees'
        },
        {
          name: 'Cardinals'
        }
      ]);
    });
};
