exports.up = async function (knex) {
  await knex.schema.createTable("course_faculty", (table) => {
    table.bigIncrements("id").unsigned().primary();

    table.bigInteger("course_id").unsigned().notNullable();
    table.bigInteger("faculty_id").unsigned().notNullable();

    table.foreign("course_id")
      .references("id")
      .inTable("courses")
      .onDelete("CASCADE");

    table.foreign("faculty_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.unique(["course_id", "faculty_id"]);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("course_faculty");
};