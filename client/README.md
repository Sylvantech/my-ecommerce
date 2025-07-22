# E-commerce Frontend

Application frontend pour le projet e-commerce construite avec React Router et Vite.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. Clonez le projet et naviguez dans le dossier client
```bash
cd client
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
Votre application sera disponible à `http://localhost:5173`.

#### Production
```bash
npm run build
npm run start
```

## 📁 Structure du projet

```
client/                 # Application Frontend (React Router)
│   ├── app/                # Code source principal
│   │   ├── components/         # Composants réutilisables
│   │   ├── routes/             # Pages et routes de l'application
│   │   ├── hooks/              # Hooks personnalisés React
│   │   ├── services/           # Services API et logique métier
│   │   ├── types/              # Types TypeScript
│   │   ├── layout/             # Composants de mise en page
│   │   ├── assets/             # Images, icônes, fonts
│   │   ├── root.tsx            # Composant racine
│   │   └── routes.ts           # Configuration des routes
│   ├── public/             # Fichiers statiques
│   ├── package.json        # Dépendances et scripts frontend
│   └── vite.config.ts      # Configuration Vite
```

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement avec HMR |
| `npm run build` | Construit l'application pour la production |
| `npm run start` | Lance l'application en mode production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm run typecheck` | Vérifie les types TypeScript |

## 🔧 Variables d'environnement

Copiez le fichier `.env.example` vers `.env` et configurez les variables

## 🛠️ Technologies utilisées

- **React Router** - Routage et rendu côté serveur
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **TailwindCSS** - Framework CSS
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique du code

## 🚀 Déploiement

### Build pour la production
```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `build/`.

### Docker
```bash
docker build -t ecommerce-frontend .
docker run -p 3000:3000 ecommerce-frontend
```

## 🧹 Qualité du code

### Vérification et formatage
```bash
# Vérifier le formatage
npm run format:check

# Formater automatiquement
npm run format

# Vérifier ESLint
npm run lint

# Corriger automatiquement ESLint
npm run lint:fix

# Vérifier TypeScript
npm run typecheck
```
