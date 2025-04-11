document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/series/with-platforms', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Affichage des séries
            const seriesContainer = document.getElementById('series-container');
            data.forEach(serie => {
                const serieElement = document.createElement('div');
                serieElement.classList.add('serie');
                serieElement.innerHTML = `
                    <h2>${serie.series_title}</h2>
                    <p>Plateforme : ${serie.platform_name}</p>
                    <p>Date d'ajout : ${serie.date_ajout}</p>
                `;
                seriesContainer.appendChild(serieElement);
            });
        } else {
            throw new Error('Erreur lors du chargement des séries');
        }
    } catch (error) {
        console.error('Erreur:', error.message);
    }
});

// Fonction pour gérer la déconnexion
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('authToken'); // Supprime le token
    window.location.href = 'login.html'; // Redirige vers la page de connexion
});
