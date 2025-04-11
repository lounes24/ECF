// services/platform_services.js
import { getAllPlatforms, addPlatform, updatePlatform, deletePlatform, getPlatformById } from '../repositories/platform_repositories.js';

// Service pour obtenir toutes les plateformes
export const getAllPlatformsService = async () => {
  try {
    const platforms = await getAllPlatforms();
    return platforms;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des plateformes');
  }
};

// Service pour récupérer une plateforme par son ID
export const getPlatformByIdService = async (id) => {
  try {
    const platform = await getPlatformById(id);
    return platform;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de la plateforme');
  }
};

// Service pour ajouter une nouvelle plateforme
export const addPlatformService = async (name, type) => {
  try {
    const newPlatform = await addPlatform(name, type);
    return newPlatform;
  } catch (error) {
    throw new Error('Erreur lors de l\'ajout de la plateforme');
  }
};

// Service pour mettre à jour une plateforme
export const updatePlatformService = async (id, name, type) => {
  try {
    const updatedPlatform = await updatePlatform(id, name, type);
    return updatedPlatform;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la plateforme');
  }
};

// Service pour supprimer une plateforme
export const deletePlatformService = async (id) => {
  try {
    const deletedPlatform = await deletePlatform(id);
    return deletedPlatform;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la plateforme');
  }
};
