const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const urlMongo = process.env.URL_MANGO;

const connectDB = async () => {
    try {
        await mongoose.connect(urlMongo);
        // eslint-disable-next-line no-console
        console.log('✅ Connexion à MongoDB réussie');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Erreur de connexion à MongoDB :', error);
    }
};

module.exports = connectDB;
