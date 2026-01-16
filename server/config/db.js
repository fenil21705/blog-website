const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Switching to SQLite for a "no-setup" experience without XAMPP
// This creates a 'database.sqlite' file in the server directory
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // On Render with a Disk, we mount to /data. Locally, use the project folder.
    storage: process.env.RENDER || process.env.NODE_ENV === 'production'
        ? '/data/database.sqlite'
        : path.join(__dirname, '../database.sqlite'),
    logging: false,
});

module.exports = sequelize;
