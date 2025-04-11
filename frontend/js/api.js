const apiUrl = 'http://localhost:3000'; // Remplace par l'URL de ton serveur API si nécessaire.

// Fonction de connexion
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/login`, {  // <-- Correction ici
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Renvoie les données du serveur (user et token)
    } else {
      throw new Error(data.message || 'Erreur lors de la connexion');
    }
  } catch (error) {
    console.error('Erreur:', error.message);
    throw error;
  }
};
