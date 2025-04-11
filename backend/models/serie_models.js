import db from '../config/database.js';

// Récupérer toutes les séries
export const getAllSeries = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM SERIES', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Récupérer une série par son ID
export const getSeriesById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM SERIES WHERE series_id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Ajouter une nouvelle série
export const addSeries = (title, gender, release_date) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO SERIES (title, gender, release_date) VALUES (?, ?, ?)',
      [title, gender, release_date],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            title,
            gender,
            release_date,
          });
        }
      }
    );
  });
};

// Mettre à jour une série existante
export const updateSeries = (id, title, gender, release_date) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE SERIES SET title = ?, gender = ?, release_date = ? WHERE series_id = ?',
      [title, gender, release_date, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, title, gender, release_date });
        }
      }
    );
  });
};

// Supprimer une série
export const deleteSeries = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM SERIES WHERE series_id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
};

// Exemple d'une fonction pour récupérer les séries disponibles sur une plateforme
export const getSeriesByPlatform = (platformId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT s.* FROM SERIES s
      JOIN DISPONIBILITE d ON s.series_id = d.series_id
      WHERE d.platforms_id = ?`,
      [platformId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Nouvelle fonction pour récupérer toutes les séries avec leurs plateformes
export const getAllSeriesWithPlatforms = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.series_id, 
        s.title AS series_title, 
        p.platforms_id, 
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
      else {
        // Structurer les données pour chaque série et ses plateformes
        const result = [];
        
        rows.forEach(row => {
          let serie = result.find(serie => serie.series_id === row.series_id);
          if (!serie) {
            serie = {
              series_id: row.series_id,
              title: row.series_title,
              platforms: []  // Liste des plateformes associées à cette série
            };
            result.push(serie);
          }
          // On ajoute la plateforme à la série concernée
          serie.platforms.push({
            platforms_id: row.platforms_id,
            platform_name: row.platform_name,
            date_ajout: row.date_ajout
          });
        });

        // Résultat avec les séries et leurs plateformes
        resolve(result);
      }
    });
  });
};
