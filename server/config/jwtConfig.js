const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;
let config = {
    secretKey: secretKey,
    tokenType: "access"
}

module.exports = config