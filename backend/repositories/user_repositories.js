import db from '../config/database.js';
import bcrypt from 'bcrypt';

// Obtenir tous les utilisateurs
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM USERS', [], (err, rows) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        return reject('Erreur lors de la récupération des utilisateurs');
      }
      resolve(rows);
    });
  });
};

// Obtenir un utilisateur par ID
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM USERS WHERE users_id = ?', [id], (err, row) => {
      if (err) {
        console.error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}:`, err);
        return reject(`Erreur lors de la récupération de l'utilisateur avec ID ${id}`);
      }
      if (!row) {
        console.warn(`Utilisateur avec ID ${id} non trouvé`);
        return reject(`Utilisateur avec ID ${id} non trouvé`);
      }
      resolve(row);
    });
  });
};

// Obtenir un utilisateur par email (avec le mot de passe)
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT users_id, email, password, role FROM USERS WHERE email = ?',
      [email],
      (err, row) => {
        if (err) {
          console.error(`Erreur lors de la récupération de l'email ${email}:`, err);
          return reject('Erreur lors de la récupération de l\'email');
        }
        if (!row) {
          console.warn(`Aucun utilisateur trouvé avec l'email: ${email}`);
          return resolve(null);  // Utilisateur non trouvé
        }
        resolve(row);  // Utilisateur trouvé, on retourne ses données
      }
    );
  });
};

// Ajouter un utilisateur avec mot de passe déjà hashé
export const addUser = (email, hashedPassword, role) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO USERS (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role],
      function (err) {
        if (err) {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
          return reject('Erreur lors de l\'ajout de l\'utilisateur');
        }
        resolve({ id: this.lastID, email, role });
      }
    );
  });
};

// Mettre à jour un utilisateur (mot de passe déjà hashé)
export const updateUser = (id, email, hashedPassword, role) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE USERS SET email = ?, password = ?, role = ? WHERE users_id = ?',
      [email, hashedPassword, role, id],
      function (err) {
        if (err) {
          console.error(`Erreur lors de la mise à jour de l'utilisateur avec ID ${id}:`, err);
          return reject('Erreur lors de la mise à jour');
        }
        resolve({ id, email, role });
      }
    );
  });
};

// Supprimer un utilisateur
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM USERS WHERE users_id = ?', [id], function (err) {
      if (err) {
        console.error(`Erreur lors de la suppression de l'utilisateur avec ID ${id}:`, err);
        return reject('Erreur lors de la suppression de l\'utilisateur');
      }
      resolve({ id });
    });
  });
};
