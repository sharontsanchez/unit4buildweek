exports.up = async (knex) => {
  await knex.schema
  .createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 30).notNullable();
    users.string("password", 200).notNullable();
    users.string("phone_number", 15).notNullable();
    users.timestamps(false, true);
    })


  .createTable("plants", (plants) => {
    plants.increments("plant_id");
    plants.string("nickname", 50).notNullable();
    plants.string("species", 100).notNullable();
    plants.integer("days_between_watering").notNullable();
    plants.text("notes", 250);
    plants.string("img_url");
    plants
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users").dropTableIfExists("plants");
};
