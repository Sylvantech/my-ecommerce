# Pull request checklist

## 📝 Informations Générales sur la PR

**[Type] Description concise de la fonctionnalité/correction**

- Ex: [Feature] Ajout page détail produit
- Ex: [Fix] Correction bug affichage panier
- Ex: [Refactor] Refactoring service authentification

## ✅ Avant de Demander une Revue (Pour l'Auteur de la PR)

Ces vérifications garantissent que le code est prêt à être examiné par un pair.

### 1. Qualité du Code

**Conventions de Nommage :**

- [ ] Les variables, fonctions, classes, composants et fichiers respectent les conventions de nommage du projet (ex: camelCase pour JS, PascalCase pour React Components).

**Formatage et Linting :**

- [ ] Le code est formaté automatiquement (Prettier) et ne contient pas d'espaces superflus ou d'indentations incorrectes.
- [ ] Tous les avertissements et erreurs ESLint ont été résolus.

**console.log et Débogage :**

- [ ] TOUS les console.log, debugger; ou autres instructions de débogage temporaires ont été supprimés.

**Principe DRY (Don't Repeat Yourself) :**

- [ ] Le code dupliqué a été minimisé et des fonctions/composants réutilisables ont été créés si nécessaire.

**Complexité :**

- [ ] Les fonctions et les composants sont de taille raisonnable et ont une seule responsabilité (Single Responsibility Principle).

### 2. Fonctionnalité

**Critères d'Acceptation :**

- [ ] La fonctionnalité implémentée répond à tous les critères d'acceptation définis dans l'issue.

**Cas Limites et Erreurs :**

- [ ] Les messages d'erreur sont clairs et informatifs pour l'utilisateur.

### 4. Configuration

**Variables d'Environnement :**

- [ ] Toutes les nouvelles variables d'environnement nécessaires sont documentées dans le .env.example et utilisées correctement.

### 5. Git Hygiene

**Conflits de Fusion :**

- [ ] J'ai fusionné la branche main (ou develop) dans ma branche et résolu tous les conflits avant de demander la revue.

## ✅ Checklist de Validation Finale (Pour l'Auteur et le Relecteur)

- [ ] La PR résout-elle le problème ou implémente-t-elle la fonctionnalité comme décrit ?
- [ ] Le code est-il propre, lisible et respecte les conventions du projet ?
- [ ] Y a-t-il des console.log ou des commentaires de débogage résiduels ?
- [ ] La PR est-elle prête à être fusionnée ?