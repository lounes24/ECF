import express from 'express';
import { verifyToken } from '../middleware/auth.js';  // Correction du chemin d'importation
import { 
  getAllSeriesController, 
  addSerieController, 
  updateSerieController, 
  deleteSerieController, 
  getSerieByIdController,
  getAllSeriesWithPlatformsController  // Ajout de l'import de la nouvelle fonction du controller
} from '../controllers/serie_controllers.js';

const router = express.Router();

// Route pour récupérer toutes les séries
router.get('/', getAllSeriesController);  // Récupérer toutes les séries

// Route pour récupérer toutes les séries avec leurs plateformes, accessible uniquement si l'utilisateur est authentifié
router.get('/with-platforms', verifyToken, getAllSeriesWithPlatformsController);  // Route protégée par vérification du token

// Route pour ajouter une série
router.post('/', addSerieController);  // Ajouter une série

// Route pour mettre à jour une série par ID
router.put('/:id', updateSerieController);  // Mettre à jour une série spécifique par ID

// Route pour supprimer une série par ID
router.delete('/:id', deleteSerieController);  // Supprimer une série par ID

// Route pour récupérer une série par ID
router.get('/:id', getSerieByIdController);  // Récupérer une série par son ID

export default router;
