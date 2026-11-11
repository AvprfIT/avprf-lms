
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",

    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },

    pool: {
      min: 0,
      max: 10,
    },

    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
      extension: "cjs",
    },
  },
};
