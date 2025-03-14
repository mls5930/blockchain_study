const { Sequelize } = require("sequelize");
const { Count } = require("./count.models");

const config = require("../config");
const db = config.db.develop;
const sequelize = new Sequelize(db.database, db.username, db.password, db)

Count.initalize(sequelize);

module.exports = sequelize;