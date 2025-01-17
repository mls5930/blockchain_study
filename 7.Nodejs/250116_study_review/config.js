// dotenv
require('dotenv').config();
const config = {
    // 서버 포트
    port: process.env.SERVER_PORT,
    db: {
        development : {
            host: process.env.DB_HOST,
            // ORM 포트
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            dialect: "mysql"
        }
    }
}

module.exports = config
