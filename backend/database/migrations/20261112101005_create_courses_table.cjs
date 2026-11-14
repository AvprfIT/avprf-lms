exports.up = async function (knex) {
  await knex.schema.createTable("courses", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string("course_title", 255).notNullable();
    table.string("slug", 255).notNullable().unique();
    table.string("category", 100).nullable();
    table.string("duration", 100).nullable();
    table.string("eligibility",255).nullable();
    table.text("short_description").nullable();
    table.longText("description").nullable();
    table.string("image", 500).nullable();
    table.enum("fee_type", ["free", "paid"]).notNullable().defaultTo("free");
    table.decimal("fee", 10, 2).notNullable().defaultTo(0);
    table.date("start_date",255).nullable();
    table.date("end_date",255).nullable();
    table.string("language",255).nullable();
    table.enum("status", ["draft", "published"]).notNullable().defaultTo("draft");
    table.bigInteger("created_by").unsigned().nullable();
    table.foreign("created_by") .references("id") .inTable("users") .onDelete("SET NULL");
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("courses");
};