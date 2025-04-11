import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { 
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail
} from '../repositories/user_repositories.js';

// Fonction pour obtenir tous les utilisateurs
export const getAllUsersService = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    console.error('Erreur dans getAllUsersService:', error);
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
};

// Fonction pour récupérer un utilisateur par son ID
export const getUserByIdService = async (id) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error(`Utilisateur avec ID ${id} non trouvé`);
    }
    return user;
  } catch (error) {
    console.error('Erreur dans getUserByIdService:', error);
    throw new Error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}`);
  }
};

// Fonction pour ajouter un utilisateur
export const addUserService = async (email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe
    const newUser = await addUser(email, hashedPassword, role);
    return newUser;
  } catch (error) {
    console.error('Erreur dans addUserService:', error);
    throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUserService = async (id, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe
    const updatedUser = await updateUser(id, email, hashedPassword, role);
    return updatedUser;
  } catch (error) {
    console.error('Erreur dans updateUserService:', error);
    throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUserService = async (id) => {
  try {
    const deletedUser = await deleteUser(id);
    return deletedUser;
  } catch (error) {
    console.error('Erreur dans deleteUserService:', error);
    throw new Error('Erreur lors de la suppression de l\'utilisateur');
  }
};

// Fonction pour gérer la connexion (authentification)
export const loginUserService = async (email, password) => {
  try {
    console.log(`🔍 Recherche utilisateur avec email: ${email}`);

    // Récupérer l'utilisateur avec son email
    const user = await getUserByEmail(email);

    if (!user) {
      console.warn(`❌ Aucun utilisateur trouvé avec cet email: ${email}`);
      return null;  // Utilisateur non trouvé
    }

    console.log(`🔑 Utilisateur trouvé. Vérification du mot de passe pour: ${email}`);

    // Comparer le mot de passe hashé avec celui fourni
    const isPasswordValid = bcrypt.compareSync(password, user.password); // Vérification du mot de passe
    if (!isPasswordValid) {
      console.warn(`❌ Mot de passe invalide pour l'utilisateur: ${email}`);
      return null;  // Mot de passe incorrect
    }

    // Créer un token JWT si l'utilisateur est authentifié
    const token = jwt.sign(
      { id: user.users_id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'ton_secret', // Utiliser la clé secrète
      { expiresIn: '1h' } // Durée du token
    );

    console.log(`✅ Authentification réussie pour: ${email}`);
    return { user, token };  // Retourner l'utilisateur et le token

  } catch (error) {
    console.error('💥 Erreur dans loginUserService:', error);
    throw new Error('Erreur serveur lors de la connexion');
  }
};
