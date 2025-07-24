const { generateJWTToken, verifyJWTToken } = require('../utils/jwtUtils');

const testUser = {
    id: '123',
    email: 'test@example.com'
};

console.log('🧪 Testing JWT...\n');

const result = generateJWTToken(testUser);
console.log('✅ Token généré:', result.JWTToken);
console.log('📅 Expiration:', result.ExpirationDate);

const verification = verifyJWTToken(result.JWTToken);
console.log('\n🔍 Vérification:', verification);