const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Switching to SQLite for a "no-setup" experience without XAMPP
// This creates a 'database.sqlite' file in the server directory
let sequelize;

if (process.env.DATABASE_URL) {
    console.log("Using PostgreSQL Database (Neon)");
    // Render specific SSL options
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Required for Neon/Render
            }
        }
    });
} else {
    console.log("Using Local SQLite Database");
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../database.sqlite'),
        logging: false,
    });
}

module.exports = sequelize;
