const { randomBytes } = require("crypto")

const bytes = randomBytes(32);
console.log(bytes.toString("hex"));