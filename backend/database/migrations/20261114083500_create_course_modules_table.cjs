exports.up = async function (knex) {
    await knex.schema.createTable("course_modules", (table) => {
        table.bigIncrements("id").unsigned().primary();
        table.bigInteger("course_id").unsigned().notNullable();
        table.string("module_title", 255).notNullable();
        table.text("module_description").nullable();
        table.foreign("course_id").references("id").inTable("courses").onDelete("CASCADE");
        table.timestamps(true, true);
    });
};


exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("course_modules");
};
