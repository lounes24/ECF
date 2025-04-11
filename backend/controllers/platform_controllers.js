// controllers/platform_controllers.js
import { getAllPlatformsService, addPlatformService, updatePlatformService, deletePlatformService, getPlatformByIdService } from '../services/platform_services.js';

// Contrôleur pour récupérer toutes les plateformes
export const getAllPlatformsController = async (req, res) => {
  try {
    const platforms = await getAllPlatformsService();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des plateformes' });
  }
};

// Contrôleur pour récupérer une plateforme par son ID
export const getPlatformByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformByIdService(id);
    if (platform) {
      res.status(200).json(platform);
    } else {
      res.status(404).json({ message: 'Plateforme non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la plateforme' });
  }
};

// Contrôleur pour ajouter une plateforme
export const addPlatformController = async (req, res) => {
  const { name, type } = req.body;
  try {
    const newPlatform = await addPlatformService(name, type);
    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la plateforme' });
  }
};

// Contrôleur pour mettre à jour une plateforme
export const updatePlatformController = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const updatedPlatform = await updatePlatformService(id, name, type);
    res.status(200).json(updatedPlatform);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la plateforme' });
  }
};

// Contrôleur pour supprimer une plateforme
export const deletePlatformController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlatform = await deletePlatformService(id);
    res.status(200).json(deletedPlatform);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la plateforme' });
  }
};
