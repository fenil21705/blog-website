const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Switching to SQLite for a "no-setup" experience without XAMPP
// This creates a 'database.sqlite' file in the server directory
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // On Render Free Tier, we cannot use /data (failed with EACCES).
    // Use a local path instead. Note: Data clears on restart in Free Tier.
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
});

module.exports = sequelize;
