exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        {name: 'Chelsea Tolnai', cohort_id: 16},
        {name: 'John Doe', cohort_id: 15},
        {name: 'Bob Smith', cohort_id: 1},
        {name: 'Fanny Mae', cohort_id: 4},
        {name: 'Freddie Mac', cohort_id: 4},
      ]);
    });
};
