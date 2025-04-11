import { getAllSeriesService, addSerieService, updateSerieService, deleteSerieService, getSerieByIdService } from '../services/serie_services.js';
import { getAllSeriesWithPlatformsService } from '../services/serie_services.js';  // Ajout de l'import de la fonction

// Fonction pour gérer la récupération de toutes les séries
export const getAllSeriesController = async (req, res) => {
  try {
    const series = await getAllSeriesService();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des séries' });
  }
};

// Fonction pour gérer l'ajout d'une série
export const addSerieController = async (req, res) => {
  const { title, gender, release_date } = req.body;
  try {
    const newSerie = await addSerieService(title, gender, release_date);
    res.status(201).json(newSerie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la série' });
  }
};

// Fonction pour gérer la mise à jour d'une série par ID
export const updateSerieController = async (req, res) => {
  const { id } = req.params;  // Récupère l'ID de la série depuis les paramètres de l'URL
  const { title, gender, release_date } = req.body;
  try {
    const updatedSerie = await updateSerieService(id, title, gender, release_date);
    if (updatedSerie) {
      res.status(200).json(updatedSerie);
    } else {
      res.status(404).json({ message: 'Série non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la série' });
  }
};

// Fonction pour gérer la suppression d'une série par ID
export const deleteSerieController = async (req, res) => {
  const { id } = req.params;  // Récupère l'ID de la série depuis les paramètres de l'URL
  try {
    const deletedSerie = await deleteSerieService(id);
    if (deletedSerie) {
      res.status(200).json({ message: 'Série supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Série non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la série' });
  }
};

// Fonction pour récupérer une série par ID
export const getSerieByIdController = async (req, res) => {
  const { id } = req.params;  // Récupère l'ID de la série depuis les paramètres de l'URL
  try {
    const serie = await getSerieByIdService(id);
    if (serie) {
      res.status(200).json(serie);
    } else {
      res.status(404).json({ message: 'Série non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la série' });
  }
};

// Fonction pour récupérer toutes les séries avec leurs plateformes
export const getAllSeriesWithPlatformsController = async (req, res) => {
  try {
    const seriesWithPlatforms = await getAllSeriesWithPlatformsService();
    res.status(200).json(seriesWithPlatforms);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des séries avec plateformes' });
  }
};
