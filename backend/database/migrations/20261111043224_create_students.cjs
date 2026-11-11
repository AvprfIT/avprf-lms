
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("students");

  if (exists) {
    console.log("Students table already exists. Skipping creation.");
    return;
  }

  await knex.schema.createTable("students", (table) => {
    table.bigIncrements("id").primary();
    table.string("student_name", 150).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("phone", 20).nullable();
    table.string("password", 255).notNullable();
    table .enum("status", ["active", "inactive"]) .notNullable() .defaultTo("active");
    table.timestamp("email_verified_at").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at") .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    
  });

  console.log("Students table created successfully.");
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("students");
};
