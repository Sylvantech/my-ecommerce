const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");

function generateJWTToken(user) {
  let today = new Date();
  let expirationDate = new Date(today);
  expirationDate.setTime(today.getTime() + 2.5 * 60 * 60 * 1000);
  let payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(today.getTime() / 1000),
    exp: Math.floor(expirationDate.getTime() / 1000),
    sub: user.email,
    iss: "ecommerce-chaussettes-api",
    aud: "ecommerce-chaussettes-client",
  };

  let token = jwt.sign(payload, config.secretKey);
  return { JWTToken: token, ExpirationDate: expirationDate };
}

function verifyJWTToken(token) {
  try {
    const decoded = jwt.verify(token, config.secretKey, {
      issuer: "ecommerce-chaussettes-api",
      audience: "ecommerce-chaussettes-client",
    });
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function isAdmin(token) {
  const verification = verifyJWTToken(token);
  if (!verification.valid) {
    return false;
  }
  return verification.decoded.role === "admin";
}

module.exports = { generateJWTToken, verifyJWTToken, isAdmin };
