const checkCookie = (req, res, next) => {
    const cookies = req.headers.cookie
        .split(";")
        .map((value) => value.split("="))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {})
    req.cookies = cookies;
    next();
}

module.exports = {
    checkCookie
}