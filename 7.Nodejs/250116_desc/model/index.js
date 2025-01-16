const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config')
const CommentModel = require('./comment.model')
const db = config.db.development;

// 1. Sequelize 초기화: 데이터베이스 연결 정보 제공
// const sequelize = new Sequelize(db.database, db.username, db.password, {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     port: 3306
// })

// 아래의 코드는 위와 같음.
const sequelize = new Sequelize(db.database, db.username, db.password, db)
const Comment = CommentModel(sequelize, DataTypes);

module.exports = {
    sequelize,
    Comment
}
