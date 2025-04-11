import { getAllDisponibilites, addDisponibilite, getDisponibiliteById, deleteDisponibilite, getDisponibilitesWithDetails } from '../repositories/disponibilite_repositories.js';

// Fonction pour récupérer toutes les disponibilités avec les noms de séries et de plateformes
export const getAllDisponibilitesService = async () => {
  try {
    const disponibilites = await getDisponibilitesWithDetails();
    return disponibilites;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des disponibilités');
  }
};

// Fonction pour récupérer une disponibilité par son ID (à mettre à jour si nécessaire)
export const getDisponibiliteByIdService = async (id) => {
  try {
    const disponibilite = await getDisponibiliteById(id);
    return disponibilite;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de la disponibilité');
  }
};

// Fonction pour ajouter une disponibilité
export const addDisponibiliteService = async (series_id, platforms_id, date_ajout) => {
  try {
    const newDisponibilite = await addDisponibilite(series_id, platforms_id, date_ajout);
    return newDisponibilite;
  } catch (error) {
    throw new Error('Erreur lors de l\'ajout de la disponibilité');
  }
};

// Fonction pour supprimer une disponibilité
export const deleteDisponibiliteService = async (series_id, platforms_id) => {
  try {
    const deletedDisponibilite = await deleteDisponibilite(series_id, platforms_id);
    return deletedDisponibilite;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la disponibilité');
  }
};
