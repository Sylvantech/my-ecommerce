# 🔄 Guide GitHub - Système de Backup Automatique

Ce guide vous explique comment configurer un système de sauvegarde automatique qui synchronise votre code sur deux repositories simultanément.

## 🏠 Comprendre l'architecture

### 🏛️ Origin (Repository principal - Epitech)
Le repository principal où se trouve votre projet officiel Epitech.

### 🏡 Clone (Repository de backup)
Un repository de sauvegarde pour sécuriser votre travail.

> 💡 **Important** : Par défaut, `git pull` récupère depuis "origin" (le repository principal).

## 🛠️ Configuration

### Étape 1 : 🔗 Ajouter le repository de backup
```bash
git remote add clone https://github.com/GusEpitech/e-commerce-clone.git
```

### Étape 2 : 👀 Vérifier la configuration
```bash
git remote -v
```


**Résultat attendu :**
```
clone    https://github.com/GusEpitech/e-commerce-clone.git (fetch)
clone    https://github.com/GusEpitech/e-commerce-clone.git (push)
origin   https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia.git (fetch)
origin   https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia.git (push)
```

### Étape 3 : ✨ Créer la commande de push automatique
```bash
git config alias.pushall '!f() {
  branch=$(git symbolic-ref --short HEAD);
  echo "\033[1;36m🚀 Push sur la branche: $branch\033[0m";
  echo "\033[1;34m➡️  Push vers origin...\033[0m";
  git push origin \"$branch\" || { echo "\033[1;31m❌ Erreur push origin\033[0m"; exit 1; };
  echo "\033[1;34m➡️  Push vers clone...\033[0m";
  git push clone \"$branch\" || { echo "\033[1;31m❌ Erreur push clone\033[0m"; exit 1; };
  echo "\033[1;32m✅ Push réussi sur les deux repositories!\033[0m";
}; f'
```

## 🎯 Utilisation

### 🌟 Pour une branche existante
```bash
git pushall
```

### 🆕 Pour une nouvelle branche (première fois)
```bash
git push --set-upstream origin nom-de-la-branche
git push --set-upstream clone nom-de-la-branche
```

**Exemple concret :**
```bash
git push --set-upstream origin feature/user-authentication
git push --set-upstream clone feature/user-authentication
```

## 🤔 Comment ça fonctionne ?

### 🔍 Terminologie
- **origin** = Repository principal (Epitech) 🏛️
- **clone** = Repository de backup 🏡
- **pushall** = Push simultané sur les deux repositories ✨

### 🎭 Processus de la commande pushall
1. **Détecte** la branche actuelle
2. **Push** vers le repository principal (origin)
3. **Push** vers le repository de backup (clone)
4. **Affiche** le statut de chaque opération

### 📥 Récupération du code
```bash
git pull
```
Récupère automatiquement depuis le repository principal (origin).

## 🎨 Codes couleur du terminal
- **🔵 Bleu** : Informations sur l'opération en cours
- **🟢 Vert** : Opération réussie
- **🔴 Rouge** : Erreur détectée
- **🔶 Cyan** : Informations importantes (nom de branche)

---

> 🎯 **Résultat** : Votre code est maintenant sauvegardé automatiquement sur deux repositories à chaque push, garantissant une sécurité maximale de votre travail.
