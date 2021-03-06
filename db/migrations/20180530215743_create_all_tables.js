exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema

    .createTable('users', function(table) {
      table.string('id').notNullable().primary();
    })

    .createTable('restaurants', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone');
    })

    .createTable('dishes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('photo');
      table.string('description');
      table.string('time_to_done');
      table.string('type');
      table.float('price', 8, 2);
      table.integer('restaurants_id').references('id').inTable('restaurants');
    })

    .createTable('karts', function(table) {
      table.increments('id').primary();
      table.string('users_id').references('id').inTable('users');
      table.integer('dishes_id').references('id').inTable('dishes');
      table.integer('quantity');
    })
  ]);
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable('karts')
    .dropTable('dishes')
    .dropTable('restaurants')
    .dropTable('users')
  ])
};
