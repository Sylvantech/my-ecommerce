const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const secretKey = process.env.SECRETKEY;
const config = {
  secretKey: secretKey,
  tokenType: "access",
};

module.exports = config;
