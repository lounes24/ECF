// config/database.js
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

// Pour gérer '__dirname' avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Création de la connexion SQLite avec la base 'bdd.db'
const db = new sqlite3.Database(path.resolve(__dirname, '../data/bdd.db'), (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
  } else {
    console.log('Connecté à la base de données SQLite');
  }
});

export default db;
