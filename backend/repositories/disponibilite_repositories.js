import db from '../config/database.js';

// Fonction pour récupérer toutes les disponibilités
export const getAllDisponibilites = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM DISPONIBILITE', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Fonction pour récupérer toutes les disponibilités avec les noms de séries et de plateformes
export const getDisponibilitesWithDetails = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        d.series_id,
        s.title AS series_title,
        d.platforms_id,
        p.name AS platform_name,
        d.date_ajout
      FROM DISPONIBILITE d
      JOIN SERIES s ON d.series_id = s.series_id
      JOIN PLATFORMS p ON d.platforms_id = p.platforms_id
    `;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Fonction pour récupérer une disponibilité par IDs
export const getDisponibiliteById = (series_id, platforms_id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM DISPONIBILITE WHERE series_id = ? AND platforms_id = ?',
      [series_id, platforms_id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

// Fonction pour ajouter une disponibilité
export const addDisponibilite = (series_id, platforms_id, date_ajout) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO DISPONIBILITE (series_id, platforms_id, date_ajout) VALUES (?, ?, ?)';
    db.run(query, [series_id, platforms_id, date_ajout], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ series_id, platforms_id, date_ajout, id: this.lastID });
      }
    });
  });
};

// Fonction pour supprimer une disponibilité
export const deleteDisponibilite = (series_id, platforms_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM DISPONIBILITE WHERE series_id = ? AND platforms_id = ?',
      [series_id, platforms_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ series_id, platforms_id });
        }
      }
    );
  });
};
