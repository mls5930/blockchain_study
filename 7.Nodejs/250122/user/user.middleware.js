const jwt = require('jsonwebtoken');
require('dotenv').config()

const authMe = (req, res, next) => {
    try {
        const access_token = req.headers["authorization"].split(" ")[1];
        console.log(access_token);
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SALT);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    authMe
}