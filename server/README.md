# E-commerce Backend API

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. Clonez le projet et naviguez dans le dossier server

```bash
cd server
```

2. Installez les dépendances

```bash
npm install
```

3. Configurez les variables d'environnement

```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos propres valeurs.

### Lancement du projet

#### Développement

```bash
npm run dev
```

#### Production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
server/                 # Application Backend (Node.js/Express.js)
│   ├── config/             # Configuration de l'application (connexion DB, variables d'env)
│   ├── models/             # Schémas Mongoose pour MongoDB
│   ├── routes/             # Définition des routes API
│   ├── controllers/        # Logique métier associée aux routes
│   ├── middleware/         # Middlewares (authentification, gestion d'erreurs)
│   ├── utils/              # Fonctions utilitaires backend (helpers, validations)
│   ├── server.js           # Point d'entrée du serveur Express
│   ├── .env                # Variables d'environnement pour le backend
│   ├── package.json        # Dépendances et scripts backend
```

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur en mode développement avec nodemon |
| `npm run build` | Prépare l'application pour la production |
| `npm start` | Lance le serveur en mode production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm test` | Lance les tests |

## 🔧 Variables d'environnement

Copiez le fichier `.env.example` vers `.env` et configurez les variables

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **Nodemon** - Rechargement automatique en développement
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique du code