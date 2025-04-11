// routes/platform_routes.js
import express from 'express';
import { getAllPlatformsController, addPlatformController, updatePlatformController, deletePlatformController, getPlatformByIdController } from '../controllers/platform_controllers.js';

const router = express.Router();

// Route pour récupérer toutes les plateformes
router.get('/', getAllPlatformsController);

// Route pour récupérer une plateforme par son ID
router.get('/:id', getPlatformByIdController);

// Route pour ajouter une nouvelle plateforme
router.post('/', addPlatformController);

// Route pour mettre à jour une plateforme existante
router.put('/:id', updatePlatformController);

// Route pour supprimer une plateforme
router.delete('/:id', deletePlatformController);

export default router;
