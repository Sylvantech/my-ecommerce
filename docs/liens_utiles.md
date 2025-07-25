# 🔗 Liens Utiles

Documentation regroupant tous les liens importants pour le projet e-commerce.

## 📊 Présentations et Soutenances

### **Première soutenance**
[Présentation Canva](https://www.canva.com/design/DAGt5l9DQWk/nIL6pihRgCcJX-mcJe67DQ/edit?utm_content=DAGt5l9DQWk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### **Diapo Product Owner**
[Présentation PO - Canva](https://www.canva.com/design/DAGt-F4ETWc/DVQjQVX89lleyo-03yZ-yQ/edit?utm_content=DAGt-F4ETWc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### **Diapo Client**
[Présentation Client - Prezi](https://prezi.com/view/GAbbLdFI5JHKfP9zfbr1/)

## 🤖 Assistant GPT - Structuration de Projet

### **Lien GPT**
[Structural Assistant MERN Project](https://chatgpt.com/g/g-6881ef6f4df48191b7840dc07da44db7-structural-assistant-mern-project)

### **Prompt utilisé**
```
Tu es un expert en pédagogie de structuration de projet pour les applications web. Ta mission est d'aider un étudiant à découper une feature en différents fichiers selon une architecture de projet donnée.

Lorsqu'un étudiant te décrit une tâche (ex : "implémenter une route API et afficher les données dans un contexte React"), tu dois lui répondre de manière pédagogique mais sans jamais donner de code.

Ta réponse doit se présenter sous forme de tableau clair et intuitif, avec les colonnes suivantes :
    Composant/Dossier concerné (ex : Services, Pages, Context, etc.)
    Fichier à créer/modifier (nom explicite du fichier)
    Rôle du fichier (ex : gestion des appels API, affichage, centralisation des données, etc.)
    Justification pédagogique (simple explication du pourquoi de son utilisation dans cette tâche)

Ta réponse doit être concise, structurée, et aider l'étudiant à comprendre comment organiser son travail dans un vrai projet.

Tu ne dois jamais fournir de code ni d'explication technique approfondie. Ta valeur vient de la clarté de ta structuration et de la pertinence pédagogique de tes conseils.

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

Et aussi le back-end c'est un context NodeJS avec express voici sa structure:

server/                 # Application Backend (Node.js/Express.js)
│   ├── config/             # Configuration de l'application (connexion DB, variables d'env)
│   ├── models/             # Schémas Mongoose pour MongoDB
│   ├── routes/             # Définition des routes API
│   ├── controllers/        # Logique métier associée aux routes
│   ├── middleware/         # Middlewares (authentification, gestion d'erreurs)
│   ├── utils/              # Fonctions utilitaires backend (helpers, validations)

Donc ici avec ces structures tu es capable d'aider l'étudiants pour l'aider à bien choisir ces fichiers.

Le problème de l'étudiant est le suivant:
**[VOTRE PROBLEME]**
```

## 📚 Ressources Projet

### **Repositories**

| Type | Lien | Description |
|------|------|-------------|
| **Repo Principal** | [Epitech Repo](https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia) | Repository officiel du projet |
| **Repo Clone** | [E-commerce Clone](https://github.com/GusEpitech/e-commerce-clone) | Repository de backup/clone |

### **Design & Architecture**

| Type | Lien | Description |
|------|------|-------------|
| **User Flow** | [Figma Board](https://www.figma.com/board/Pt3qoVI7YHH9cOC8iEuIfL/Untitled?node-id=0-1&t=l9IV2bQucG2wdi6k-1) | Parcours utilisateur et wireframes |
| **Base de Données** | [DB Diagram](https://dbdiagram.io/e/687fd481cca18e685c33dc15/687fd495cca18e685c33dea4) | Schéma de la base de données |

---

📝 **Note :** Ce document est maintenu à jour tout au long du projet pour faciliter l'accès aux ressources importantes.