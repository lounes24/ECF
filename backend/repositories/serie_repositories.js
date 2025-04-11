import db from '../config/database.js';

// Fonction pour obtenir toutes les séries
export const getAllSeries = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM SERIES', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Fonction pour récupérer une série par son ID
export const getSerieById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM SERIES WHERE series_id = ?';
    db.get(query, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Fonction pour ajouter une série
export const addSerie = (title, gender, release_date) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO SERIES (title, gender, release_date) VALUES (?, ?, ?)';
    db.run(query, [title, gender, release_date], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, title, gender, release_date });
    });
  });
};

// Fonction pour mettre à jour une série
export const updateSerie = (id, title, gender, release_date) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE SERIES SET title = ?, gender = ?, release_date = ? WHERE series_id = ?';
    db.run(query, [title, gender, release_date, id], function (err) {
      if (err) reject(err);
      else resolve({ id, title, gender, release_date });
    });
  });
};

// Fonction pour supprimer une série
export const deleteSerie = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM SERIES WHERE series_id = ?';
    db.run(query, [id], function (err) {
      if (err) reject(err);
      else resolve({ id });
    });
  });
};

// Fonction pour obtenir toutes les séries avec leurs plateformes
export const getAllSeriesWithPlatforms = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.title AS series_title, 
        p.name AS platform_name, 
        d.date_ajout
      FROM 
        DISPONIBILITE d
      JOIN 
        SERIES s ON d.series_id = s.series_id
      JOIN 
        PLATFORMS p ON d.platforms_id = p.platforms_id
    `;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
