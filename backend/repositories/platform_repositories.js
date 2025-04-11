// repositories/platform_repositories.js
import db from '../config/database.js';

// Fonction pour obtenir toutes les plateformes
export const getAllPlatforms = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM PLATFORMS', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Fonction pour récupérer une plateforme par son ID
export const getPlatformById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM PLATFORMS WHERE platforms_id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Fonction pour ajouter une nouvelle plateforme
export const addPlatform = (name, type) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO PLATFORMS (name, type) VALUES (?, ?)';
    db.run(query, [name, type], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name, type });
    });
  });
};

// Fonction pour mettre à jour une plateforme existante
export const updatePlatform = (id, name, type) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE PLATFORMS SET name = ?, type = ? WHERE platforms_id = ?';
    db.run(query, [name, type, id], function (err) {
      if (err) reject(err);
      else resolve({ id, name, type });
    });
  });
};

// Fonction pour supprimer une plateforme
export const deletePlatform = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM PLATFORMS WHERE platforms_id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ id });
    });
  });
};
