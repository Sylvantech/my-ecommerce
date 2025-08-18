const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");
const crypto = require("crypto");
const RefreshToken = require("../models/refreshToken.model");

function generateJWTToken(user) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setTime(today.getTime() + 2.5 * 60 * 60 * 1000); // 2.5 heures
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(today.getTime() / 1000),
    exp: Math.floor(expirationDate.getTime() / 1000),
    sub: user.email,
    iss: "ecommerce-chaussettes-api",
    aud: "ecommerce-chaussettes-client",
  };

  const token = jwt.sign(payload, config.secretKey);
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

async function generateRefreshToken(userId) {
  try {
    const randomToken = crypto.randomBytes(64).toString("hex");

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const refreshToken = new RefreshToken({
      token: randomToken,
      user_id: userId,
      expires_at: expirationDate,
    });

    await refreshToken.save();

    return {
      refreshToken: randomToken,
      expiresAt: expirationDate,
      id: refreshToken.id,
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la création du refresh token: ${error.message}`
    );
  }
}

module.exports = {
  generateJWTToken,
  verifyJWTToken,
  isAdmin,
  generateRefreshToken,
};
