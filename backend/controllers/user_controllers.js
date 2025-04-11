import { 
  getAllUsersService, 
  addUserService, 
  updateUserService, 
  deleteUserService, 
  getUserByIdService, 
  loginUserService 
} from '../services/user_services.js';

// Fonction pour gérer la récupération de tous les utilisateurs
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur dans getAllUsersController:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
};

// Fonction pour gérer l'ajout d'un utilisateur
export const addUserController = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = await addUserService(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur dans addUserController:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de l\'utilisateur' });
  }
};

// Fonction pour gérer la récupération d'un utilisateur par son ID
export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(`Erreur dans getUserByIdController pour l'utilisateur ID ${id}:`, error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur' });
  }
};

// Fonction pour gérer la mise à jour d'un utilisateur
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;
  try {
    const updatedUser = await updateUserService(id, email, password, role);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Erreur dans updateUserController pour l'utilisateur ID ${id}:`, error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
  }
};

// Fonction pour gérer la suppression d'un utilisateur
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserService(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(`Erreur dans deleteUserController pour l'utilisateur ID ${id}:`, error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
  }
};

// Fonction pour gérer la connexion (authentification)
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService(email, password);  // Passer aussi le mot de passe ici

    if (result) {
      // Si l'utilisateur existe et que le mot de passe est correct, renvoie le token
      const { user, token } = result; // Extraire l'utilisateur et le token retournés

      res.status(200).json({
        message: 'Connexion réussie',
        user,
        token
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur dans loginUserController:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};
