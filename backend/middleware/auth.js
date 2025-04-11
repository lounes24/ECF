import jwt from 'jsonwebtoken'; // Assure-toi d'avoir installé le package jsonwebtoken avec npm install jsonwebtoken

// Middleware pour vérifier le token JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token depuis le header 'Authorization'

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  // Vérifie le token avec la clé secrète
  jwt.verify(token, 'votre_clé_secrète', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = decoded; // Ajoute l'utilisateur décodé à la requête
    next(); // Passe au prochain middleware ou à la route
  });
};
