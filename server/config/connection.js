require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "postgres"
        }
    );

module.exports = sequelize;