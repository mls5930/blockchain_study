const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.js');
const db = config.db['development'];
const sequelize = new Sequelize(db.database, db.username, db.password, db);

const User = require('./user.model')(sequelize, DataTypes);

module.exports = {
    User,
    sequelize
}