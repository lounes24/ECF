// users_routes/users_routes.js
import express from 'express';
import {
  getAllUsersController,
  addUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController,
  loginUserController
} from '../controllers/user_controllers.js';

const router = express.Router();

// ✅ Route pour la connexion (authentification) - à mettre AVANT les routes dynamiques
router.post('/login', loginUserController);

// Route pour récupérer tous les utilisateurs
router.get('/', getAllUsersController);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', getUserByIdController);

// Route pour ajouter un utilisateur
router.post('/', addUserController);

// Route pour mettre à jour un utilisateur
router.put('/:id', updateUserController);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUserController);

export default router;
