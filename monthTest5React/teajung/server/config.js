require('dotenv').config();

const config = {
    port: 3306,
    db:{
        develop:{
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dialect: "mysql"
        }
    }
}

module.exports = config;