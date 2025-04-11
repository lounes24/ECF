import express from 'express';
import dotenv from 'dotenv'; // Import de dotenv
import serieRoutes from './routes/serie_routes.js';
import userRoutes from './routes/user_routes.js'; // Import des routes utilisateurs
import platformRoutes from './routes/platform_routes.js'; // Import des routes plateformes
import disponibiliteRoutes from './routes/disponibilite_routes.js'; // Import des routes de disponibilité
import path from 'path'; // Import de path    
import { fileURLToPath } from 'url'; // Import de fileURLToPath

dotenv.config(); // Charge les variables d'environnement du fichier .env

const app = express();

// Obtenez le chemin absolu du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Récupère le répertoire courant

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques (CSS, JS, HTML) depuis le dossier frontend
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));  // Sert tous les fichiers de frontend

// Utilisation des routes API
app.use('/api/series', serieRoutes);  // Routes pour les séries
app.use('/api/users', userRoutes);    // Routes pour les utilisateurs
app.use('/api/platforms', platformRoutes);  // Routes pour les plateformes
app.use('/api/disponibilites', disponibiliteRoutes);  // Routes pour les disponibilités

// Route pour renvoyer index.html (page de connexion) si on accède à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));  // Renvoie index.html depuis frontend/public
});

// Nouvelle route pour afficher dashboard.html
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'dashboard.html'));  // Renvoie dashboard.html depuis frontend/public
});

const PORT = process.env.PORT || 3000;  // Utilisation du port défini dans .env ou par défaut 3000
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
