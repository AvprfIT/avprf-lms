
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string("name", 150).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("phone", 20).nullable();
    table.string("password", 255).notNullable();
    table .enum("role", ["admin", "faculty"]) .notNullable(); 
    table .enum("status", ["active", "inactive"]) .notNullable() .defaultTo("active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  console.log("Users table created successfully.");
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
