// models/users_models.js
import db from '../config/database.js';

// Récupérer tous les utilisateurs
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM USERS', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Récupérer un utilisateur par son ID
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM USERS WHERE users_id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Ajouter un nouvel utilisateur
export const addUser = (email, password, role) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO USERS (email, password, role) VALUES (?, ?, ?)';
    db.run(query, [email, password, role], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          email,
          password,
          role,
        });
      }
    });
  });
};

// Mettre à jour un utilisateur existant
export const updateUser = (id, email, password, role) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE USERS SET email = ?, password = ?, role = ? WHERE users_id = ?';
    db.run(query, [email, password, role, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, email, password, role });
      }
    });
  });
};

// Supprimer un utilisateur
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM USERS WHERE users_id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
};
