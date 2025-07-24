const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');

function generateJWTToken(user) {
    let today = new Date();
    let expirationDate = new Date(today);
    expirationDate.setMinutes(today.getMinutes() + 30)
    let payload = {
        id: user.id,
        email: user.email,
        iat: parseInt(today.getTime() / 1000, 10),
        exp: parseInt(expirationDate.getTime() / 1000, 10),
        sub: user.email,
        iss: 'ecommerce-chaussettes-api',       
        aud: 'ecommerce-chaussettes-client'
    }
    let token = jwt.sign(payload, config.secretKey)
    return { JWTToken: token, ExpirationDate: expirationDate }
}

function verifyJWTToken(token) {
    try {
        const decoded = jwt.verify(token, config.secretKey, {
            issuer: 'ecommerce-chaussettes-api',    
            audience: 'ecommerce-chaussettes-client'
        });
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

module.exports = { generateJWTToken, verifyJWTToken };