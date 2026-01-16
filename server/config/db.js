const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Switching to SQLite for a "no-setup" experience without XAMPP
// This creates a 'database.sqlite' file in the server directory
const sequelize = new Sequelize(process.env.DATABASE_URL || {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
});

if (process.env.DATABASE_URL) {
    console.log("Using PostgreSQL Database (Neon)");
} else {
    console.log("Using Local SQLite Database");
}

module.exports = sequelize;
