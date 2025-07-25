# 🗄️ Configuration de la Base de Données MongoDB

Guide complet pour installer, configurer et utiliser MongoDB avec le projet e-commerce.

## 📋 Prérequis

- Système d'exploitation Linux/macOS/Windows
- Droits administrateur pour l'installation
- Node.js (v16 ou supérieur) - déjà installé avec le projet

## 🚀 Installation de MongoDB

### Sur Ubuntu/Debian

1. **Importez la clé publique GPG de MongoDB**
```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

2. **Ajoutez le repository MongoDB**
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

3. **Mettez à jour la liste des packages et installez MongoDB**
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Sur macOS

```bash
# Avec Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

### Sur Windows

1. Téléchargez l'installateur depuis [mongodb.com](https://www.mongodb.com/try/download/community)
2. Exécutez l'installateur en tant qu'administrateur
3. Suivez les instructions d'installation

## ✅ Vérification de l'installation

Vérifiez que MongoDB est correctement installé :

```bash
# Vérifier la version de MongoDB
mongod --version

# Vérifier que le service est disponible
sudo systemctl status mongod
```

## 🔧 Configuration et démarrage

### Démarrage du service MongoDB

```bash
# Démarrer MongoDB
sudo systemctl start mongod

# Activer MongoDB au démarrage
sudo systemctl enable mongod

# Vérifier le statut
sudo systemctl status mongod
```

### Installation de MongoDB Shell (mongosh)

Si `mongosh` n'est pas installé :

#### Sur Ubuntu/Debian
```bash
# Télécharger et installer mongosh
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-mongosh
```

#### Sur macOS
```bash
brew install mongosh
```

## 🖥️ Outils de gestion recommandés

### MongoDB Compass (Interface graphique)

**Installation :**
- Téléchargez depuis [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Ou installez via package manager :

```bash
# Ubuntu/Debian
wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb
sudo dpkg -i mongodb-compass_1.40.4_amd64.deb

# macOS
brew install mongodb-compass
```

**Connexion :**
- URL de connexion par défaut : `mongodb://localhost:27017`
- Interface intuitive pour visualiser et gérer vos données

## 🗃️ Configuration pour le projet E-commerce

### 1. Créer la base de données

```bash
# Connectez-vous à MongoDB
mongosh

# Créer et utiliser la base de données du projet
use ecommerce_db

# Créer un utilisateur pour l'application
db.createUser({
  user: "ecommerce_user",
  pwd: "your_secure_password",
  roles: [
    { role: "readWrite", db: "ecommerce_db" }
  ]
})
```

### 2. Configuration des variables d'environnement

Dans votre fichier `.env` du serveur :

```env
# Configuration MongoDB
MONGODB_URI=mongodb://ecommerce_user:your_secure_password@localhost:27017/ecommerce_db
DB_NAME=ecommerce_db

# Ou pour une connexion locale simple (développement)
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
```

## 🚦 Commandes utiles

### Gestion du service

```bash
# Démarrer MongoDB
sudo systemctl start mongod

# Arrêter MongoDB
sudo systemctl stop mongod

# Redémarrer MongoDB
sudo systemctl restart mongod

# Voir les logs
sudo journalctl -u mongod -f
```

### Commandes MongoDB Shell

```bash
# Se connecter à MongoDB
mongosh

# Lister les bases de données
show dbs

# Utiliser une base de données
use ecommerce_db

# Lister les collections
show collections

# Voir les documents d'une collection
db.products.find().pretty()

# Quitter mongosh
exit
```

## 🔍 Dépannage

### Problèmes courants

**MongoDB ne démarre pas :**
```bash
# Vérifier les logs d'erreur
sudo journalctl -u mongod

# Vérifier les permissions du dossier de données
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

**Connexion refusée :**
```bash
# Vérifier que MongoDB écoute sur le bon port
sudo netstat -tlnp | grep :27017

# Vérifier la configuration
sudo cat /etc/mongod.conf
```

**Erreur d'authentification :**
- Vérifiez vos credentials dans le fichier `.env`
- Assurez-vous que l'utilisateur existe dans la base de données

## 📊 Monitoring et maintenance

### Surveillance de la base de données

```bash
# Statistiques de la base de données
mongosh --eval "db.stats()"

# Espace disque utilisé
du -sh /var/lib/mongodb/

# Processus MongoDB actifs
ps aux | grep mongod
```

### Sauvegarde

```bash
# Sauvegarde complète
mongodump --host localhost:27017 --db ecommerce_db --out /path/to/backup/

# Restauration
mongorestore --host localhost:27017 --db ecommerce_db /path/to/backup/ecommerce_db/
```

## 🔗 Ressources utiles

- [Documentation officielle MongoDB](https://docs.mongodb.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Mongoose ODM](https://mongoosejs.com/) (utilisé dans le projet)
- [MongoDB University](https://university.mongodb.com/) - Cours gratuits

## ⚡ Démarrage rapide

Pour démarrer rapidement avec le projet :

1. **Installez MongoDB** (voir section installation ci-dessus)
2. **Démarrez le service** : `sudo systemctl start mongod`
3. **Configurez les variables d'environnement** dans `server/.env`
4. **Lancez le serveur backend** : `cd server && npm run dev`
5. **La connexion à la base de données se fera automatiquement**

---

✨ **Votre base de données MongoDB est maintenant prête pour le projet e-commerce !**