import express from 'express';
import { 
  getAllDisponibilitesController, 
  addDisponibiliteController, 
  getDisponibiliteByIdController, 
  deleteDisponibiliteController 
} from '../controllers/disponibilite_controllers.js';

const router = express.Router();

// Route pour récupérer toutes les disponibilités
router.get('/', getAllDisponibilitesController); // Simplifié pour /api/disponibilites

// Route pour récupérer une disponibilité par son ID
router.get('/:id', getDisponibiliteByIdController); // Simplifié pour /api/disponibilites/:id

// Route pour ajouter une disponibilité
router.post('/', addDisponibiliteController); // Simplifié pour /api/disponibilites

// Route pour supprimer une disponibilité par ID
router.delete('/:id', deleteDisponibiliteController); // Simplifié pour /api/disponibilites/:id

export default router;
