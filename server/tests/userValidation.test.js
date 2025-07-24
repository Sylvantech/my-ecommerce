const User = require('../models/User.model');

console.log('🧪 Test des validations User (sans DB)...\n');

// Test 1: Utilisateur valide
console.log('1. Test utilisateur valide:');
try {
    const validUser = new User({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123'
    });
    
    // Valider sans sauvegarder
    const validationError = validUser.validateSync();
    
    if (validationError) {
        console.log('❌ Erreur de validation:', validationError.message);
    } else {
        console.log('✅ Utilisateur valide');
        console.log('  - username:', validUser.username);
        console.log('  - email:', validUser.email);
        console.log('  - role:', validUser.role);
        console.log('  - reduction:', validUser.reduction);
        console.log('  - is_active:', validUser.is_active);
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

// Test 2: Utilisateur invalide (champs manquants)
console.log('\n2. Test utilisateur invalide (champs manquants):');
try {
    const invalidUser = new User({
        email: 'incomplete@example.com'
        // username et password manquants
    });
    
    const validationError = invalidUser.validateSync();
    
    if (validationError) {
        console.log('✅ Validation échoue comme attendu:');
        Object.keys(validationError.errors).forEach(field => {
            console.log(`  - ${field}: ${validationError.errors[field].message}`);
        });
    } else {
        console.log('❌ La validation devrait échouer');
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

// Test 3: Email invalide
console.log('\n3. Test email invalide:');
try {
    const invalidEmailUser = new User({
        username: 'testuser',
        email: 'INVALID.EMAIL@EXAMPLE.COM', // Test lowercase
        password: 'password123'
    });
    
    console.log('Email avant validation:', 'INVALID.EMAIL@EXAMPLE.COM');
    console.log('Email après création:', invalidEmailUser.email); // Doit être en lowercase
    
    const validationError = invalidEmailUser.validateSync();
    console.log('Validation:', validationError ? '❌ Échoue' : '✅ Passe');
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

// Test 4: Role invalide
console.log('\n4. Test role invalide:');
try {
    const invalidRoleUser = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'superadmin' // Pas dans l'enum
    });
    
    const validationError = invalidRoleUser.validateSync();
    
    if (validationError && validationError.errors.role) {
        console.log('✅ Role invalide rejeté:', validationError.errors.role.message);
    } else {
        console.log('❌ Role invalide accepté');
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

console.log('\n✅ Tests de validation terminés');