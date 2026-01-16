const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Switching to SQLite for a "no-setup" experience without XAMPP
// This creates a 'database.sqlite' file in the server directory
let sequelize;

if (process.env.DATABASE_URL) {
    console.log("Using PostgreSQL Database (Neon)");

    // Sanitize the URL: remove quotes, whitespace, and "psql" command artifacts
    let connectionString = process.env.DATABASE_URL.trim();

    // Fix common copy-paste error where user copies the entire "psql '...'" command
    if (connectionString.startsWith("psql '")) {
        connectionString = connectionString.replace("psql '", "").replace(/'$/, "");
    }

    // Remove surrounding quotes if they still exist
    if ((connectionString.startsWith('"') && connectionString.endsWith('"')) ||
        (connectionString.startsWith("'") && connectionString.endsWith("'"))) {
        connectionString = connectionString.slice(1, -1);
    }

    console.log("Connection String Protocol:", connectionString.split(':')[0]); // Debug log (safe)

    // Render specific SSL options
    sequelize = new Sequelize(connectionString, {
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
