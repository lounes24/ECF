import { 
  getAllSeries, 
  addSeries, 
  updateSeries, 
  deleteSeries, 
  getSeriesById,
  getAllSeriesWithPlatforms 
} from '../models/serie_models.js';

// Fonction pour obtenir toutes les séries
export const getAllSeriesService = async () => {
  try {
    const series = await getAllSeries();
    return series;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des séries: ${error.message}`);
  }
};

// Fonction pour obtenir toutes les séries avec leurs plateformes associées
export const getAllSeriesWithPlatformsService = async () => {
  try {
    const seriesWithPlatforms = await getAllSeriesWithPlatforms();
    return seriesWithPlatforms;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des séries avec leurs plateformes: ${error.message}`);
  }
};

// Fonction pour ajouter une série
export const addSerieService = async (title, gender, release_date) => {
  try {
    const newSerie = await addSeries(title, gender, release_date);
    return newSerie; // Ajoute une confirmation avec les données de la série ajoutée
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout de la série: ${error.message}`);
  }
};

// Fonction pour mettre à jour une série
export const updateSerieService = async (id, title, gender, release_date) => {
  try {
    const updatedSerie = await updateSeries(id, title, gender, release_date);
    if (!updatedSerie) throw new Error('Série non trouvée');
    return updatedSerie;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la série: ${error.message}`);
  }
};

// Fonction pour supprimer une série
export const deleteSerieService = async (id) => {
  try {
    const deletedSerie = await deleteSeries(id);
    if (!deletedSerie) throw new Error('Série non trouvée');
    return deletedSerie; // Renvoie un message de confirmation de suppression
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la série: ${error.message}`);
  }
};

// Fonction pour obtenir une série par ID
export const getSerieByIdService = async (id) => {
  try {
    const serie = await getSeriesById(id);
    if (!serie) throw new Error('Série non trouvée');
    return serie;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la série par ID: ${error.message}`);
  }
};
