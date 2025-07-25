# 📋 Normes de développement

Guide des conventions et bonnes pratiques pour le projet e-commerce.

## 📝 Norme de commit

### Format
```
<type>: <description>
```

### Types autorisés
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (sans changement de code)
- `refactor`: Refactorisation
- `test`: Ajout/modification de tests
- `chore`: Tâches de maintenance

### Exemples
```bash
feat: add user login functionality
fix: resolve cart item duplication issue
docs: update installation instructions
```

## 🌿 Norme de branch

### Convention
```
<type>/<description-courte>
```

### Types de branches
- `feature/`: Nouvelles fonctionnalités
- `fix/`: Corrections de bugs
- `hotfix/`: Corrections urgentes
- `docs/`: Documentation
- `refactor/`: Refactorisation

### Exemples
```bash
feature/user-authentication
fix/cart-calculation-error
hotfix/security-vulnerability
docs/api-documentation
```

## 🔄 Norme de Pull Request

### Titre
```
<type>: <description claire>
```

### Description
La description est générée automatiquement par le workflow GitHub.

### Checklist obligatoire
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Code formaté (prettier)
- [ ] Lint passé (eslint)
- [ ] Build réussie

> 💡 **Note** : Le workflow automatique se charge de la description et des vérifications.

## 🏷️ Norme de typage de variable

### TypeScript - Frontend
```typescript
// Variables
const userName: string = 'john';
const userAge: number = 25;
const isActive: boolean = true;

// Arrays
const userIds: number[] = [1, 2, 3];
const products: Product[] = [];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
}

// Functions
const getUserById = (id: number): Promise<User> => {
  // ...
};
```

### JavaScript - Backend
```javascript
// Variables descriptives
const databaseConnection = mongoose.connection;
const userController = require('./controllers/userController');

// Constants en SCREAMING_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5;
const API_BASE_URL = 'https://api.example.com';
```

## 📁 Norme de nom de fichiers

### Frontend (React Router + TypeScript)
```
// Composants React
UserProfile.tsx
ProductCard.tsx
ShoppingCart.tsx

// Pages/Routes
index.tsx
login.tsx
product-details.tsx

// Hooks
useAuth.ts
useCart.ts
useLocalStorage.ts

// Services/API
authService.ts
productApi.ts
cartUtils.ts

// Types
User.types.ts
Product.types.ts
api.types.ts
```

### Backend (Node.js + Express)
```
// Contrôleurs
userController.js
productController.js
orderController.js

// Modèles (MongoDB/Mongoose)
User.model.js
Product.model.js
Order.model.js

// Routes
userRoutes.js
productRoutes.js
authRoutes.js

// Middlewares
authMiddleware.js
errorHandler.js
validation.js

// Utilitaires
emailUtils.js
passwordUtils.js
constants.js
```

## 📂 Norme de nom de dossier

### Structure Frontend
```
app/
├── components/     # Composants réutilisables
├── routes/         # Pages et routes
├── hooks/          # Hooks personnalisés
├── services/       # Services API
├── types/          # Types TypeScript
├── layout/         # Composant de mise en page
├── utils/          # Fonctions utilitaires
└── assets/         # Images, icônes
```

### Structure Backend
```
src/
├── controllers/    # Logique métier
├── models/         # Schémas base de données
├── routes/         # Définition des routes
├── middleware/     # Middlewares Express
├── utils/          # Fonctions utilitaires
└── config/         # Configuration
```

## 🏛️ Norme de nom de classe

### Frontend (React + TypeScript)
```typescript
// Composants React (PascalCase)
class UserProfile extends Component { }
class ProductCard extends Component { }
class ShoppingCart extends Component { }

// Services (PascalCase)
class AuthService { }
class ProductApiService { }
class CartManager { }

// Types/Interfaces (PascalCase)
interface User { }
interface ProductDetails { }
interface ApiResponse<T> { }
```

### Backend (Node.js)
```javascript
// Classes métier (PascalCase)
class UserService { }
class OrderProcessor { }
class PaymentHandler { }

// Modèles Mongoose (PascalCase)
class User extends mongoose.Schema { }
class Product extends mongoose.Schema { }
class Order extends mongoose.Schema { }

// Utilitaires (PascalCase)
class EmailValidator { }
class PasswordCrypto { }
class DatabaseConnection { }
```

## 🎨 Style CSS/TailwindCSS

### Classes CSS
```css
/* kebab-case pour les classes */
.user-profile { }
.product-card { }
.shopping-cart-item { }

/* BEM pour les composants complexes */
.card { }
.card__header { }
.card__body { }
.card--featured { }
```

### TailwindCSS
```typescript
// Regroupement logique des classes
className="
  flex items-center justify-between
  bg-white shadow-lg rounded-lg
  p-4 m-2
  hover:shadow-xl transition-shadow
"
```

---

> 💡 **Rappel** : Ces normes sont là pour assurer la cohérence et la maintenabilité du code. En cas de doute, référez-vous à ce guide !