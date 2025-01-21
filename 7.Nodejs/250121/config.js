require('dotenv').config();
const config = {
    env: process.env.NODE_ENV || "development",
    port: 3000,
    db : {
        development: {
            host : process.env.DB_HOST || "",
            port : process.env.DB_PORT || "",
            username : process.env.DB_USERNAME || "",
            password : process.env.DB_PASSWORD || "",
            database : process.env.DB_DATABASE || "",
            dialect : 'mysql'
        }
    }
}

module.exports = config