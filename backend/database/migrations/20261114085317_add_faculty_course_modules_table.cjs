
exports.up = async function (knex) {
  await knex.schema.alterTable("course_modules", (table) => {
    table.bigInteger("created_id").unsigned().notNullable();
    table.foreign("created_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("course_modules", (table) => {
    table.dropColumn("created_id");  
  });

};
