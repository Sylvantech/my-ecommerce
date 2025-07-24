# 🧦 E-commerce Chaussettes

Projet e-commerce spécialisé dans la vente de chaussettes développé en équipe de 4 personnes dans le cadre d'un projet Epitech.

## 👥 Équipe

- [Augustin Verissimo](https://www.linkedin.com/in/augustin-verissimo-a48b95231/)
- [Brahim Boulahia](https://www.linkedin.com/in/brahim-boulahia/)
- [Pierre Decaudin](https://www.linkedin.com/in/pierre-decaudin-76626823b/)
- [Sylvan Rufin](https://www.linkedin.com/in/sylvan-rufin/)

## 📅 Informations projet

- **Durée** : 5 semaines
- **Méthodologie** : Agile avec sprints de 3 jours
- **École** : Epitech

## 🚀 Architecture

Le projet est divisé en deux parties principales :

```
├── client/     # Frontend React Router + Vite
└── server/     # Backend Node.js + Express
```

## 📖 Documentation

Pour comprendre comment lancer et utiliser chaque partie du projet :

- **Frontend** : Consultez le [README du client](./client/README.md)
- **Backend** : Consultez le [README du serveur](./server/README.md)

## 🛍️ Fonctionnalités prévues

- Catalogue de chaussettes
- Système de panier
- Gestion des commandes
- Interface d'administration
- Authentification utilisateur

## 🛠️ Technologies

- **Frontend** : React Router, TypeScript, TailwindCSS
- **Backend** : Node.js, Express, MongoDB
- **Outils** : ESLint, Prettier, Git

## 🔄 Configuration Git - Backup automatique

Pour configurer un système de backup automatique sur plusieurs repositories :

### 1. Ajouter le repository de backup
```bash
git remote add clone https://github.com/GusEpitech/e-commerce-clone.git
```

### 2. Configuration initiale des branches
```bash
git push --set-upstream origin [nom-de-la-branche]
git push --set-upstream clone [nom-de-la-branche]
```

**Exemple :**
```bash
git push --set-upstream origin feature/user-authentication
git push --set-upstream clone feature/user-authentication
```


### 3. Vérifier la configuration
```bash
git remote -v
```

**Résultat attendu :**
```
clone	https://github.com/GusEpitech/e-commerce-clone.git (fetch)
clone	https://github.com/GusEpitech/e-commerce-clone.git (push)
origin	https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia.git (fetch)
origin	https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia.git (push)
```

### 4. Créer un alias pour push simultané
```bash
git config alias.pushall '!f() {
  branch=$(git symbolic-ref --short HEAD);
  echo "\033[1;36m🚀 Pushing branch: $branch\033[0m";
  echo "\033[1;34m➡️  Pushing to origin...\033[0m";
  git push origin "$branch" 2>/dev/null || git push --set-upstream origin "$branch" || { echo "\033[1;31m❌ Failed to push to origin\033[0m"; exit 1; };
  echo "\033[1;34m➡️  Pushing to clone...\033[0m";
  git push clone "$branch" 2>/dev/null || git push --set-upstream clone "$branch" || { echo "\033[1;31m❌ Failed to push to clone\033[0m"; exit 1; };
  echo "\033[1;32m✅ Successfully pushed to both repositories!\033[0m";
}; f'
```

### 5. Utilisation

#### Pour une branche existante
```bash
git pushall
```

> 💡 Cette configuration permet de sauvegarder automatiquement sur deux repositories à chaque push.

---

Développé avec ❤️ par les étudiants d'Epitech