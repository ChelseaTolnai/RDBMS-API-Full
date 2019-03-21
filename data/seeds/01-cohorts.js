exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      return knex('cohorts').insert([
        {name: 'WEB01'},
        {name: 'WEB02'},
        {name: 'WEB03'},
        {name: 'WEB04'},
        {name: 'WEB05'},
        {name: 'WEB06'},
        {name: 'WEB07'},
        {name: 'WEB08'},
        {name: 'WEB09'},
        {name: 'WEB10'},
        {name: 'WEB11'},
        {name: 'WEB12'},
        {name: 'WEB13'},
        {name: 'WEB14'},
        {name: 'WEB15'},
        {name: 'WEB16'},
      ]);
    });
};
