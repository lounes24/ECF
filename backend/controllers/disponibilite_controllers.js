import { getAllDisponibilitesService, addDisponibiliteService, getDisponibiliteByIdService, deleteDisponibiliteService } from '../services/disponibilite_services.js';

// Fonction pour récupérer toutes les disponibilités
export const getAllDisponibilitesController = async (req, res) => {
  try {
    const disponibilites = await getAllDisponibilitesService();
    res.status(200).json(disponibilites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des disponibilités' });
  }
};

// Fonction pour récupérer une disponibilité par son ID
export const getDisponibiliteByIdController = async (req, res) => {
  const { series_id, platforms_id } = req.params;  // Modification ici pour utiliser series_id et platforms_id
  try {
    const disponibilite = await getDisponibiliteByIdService(series_id, platforms_id);
    if (disponibilite) {
      res.status(200).json(disponibilite);
    } else {
      res.status(404).json({ message: 'Disponibilité non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la disponibilité' });
  }
};

// Fonction pour ajouter une disponibilité
export const addDisponibiliteController = async (req, res) => {
  const { series_id, platforms_id, date_ajout } = req.body;
  try {
    const newDisponibilite = await addDisponibiliteService(series_id, platforms_id, date_ajout);
    res.status(201).json(newDisponibilite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la disponibilité' });
  }
};

// Fonction pour supprimer une disponibilité
export const deleteDisponibiliteController = async (req, res) => {
  const { series_id, platforms_id } = req.params;  // Modification ici pour utiliser series_id et platforms_id
  try {
    const deletedDisponibilite = await deleteDisponibiliteService(series_id, platforms_id);
    res.status(200).json(deletedDisponibilite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la disponibilité' });
  }
};
