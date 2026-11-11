
exports.up = async function (knex) {
  await knex.schema.alterTable("students", (table) => {
    table.date("date_of_birth").nullable();
    table.string("gender", 30).nullable();
    table.string("qualification", 150).nullable();
    table.string("occupation", 150).nullable();
    table.text("address").nullable();
    table.string("city", 100).nullable();
    table.string("state", 100).nullable();
    table.string("pincode", 15).nullable();
    table.string("country", 100).nullable();
  });

  console.log("Student profile fields added successfully.");
};

exports.down = async function (knex) {
  await knex.schema.alterTable("students", (table) => {
    table.dropColumn("date_of_birth");
    table.dropColumn("gender");
    table.dropColumn("qualification");
    table.dropColumn("occupation");
    table.dropColumn("address");
    table.dropColumn("city");
    table.dropColumn("state");
    table.dropColumn("pincode");
    table.dropColumn("country");
  });

  console.log("Student profile fields removed.");
};
