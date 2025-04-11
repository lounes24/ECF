import { loginUser } from './api.js';

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche la soumission classique du formulaire

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Appel à l'API pour la connexion
    const data = await loginUser(email, password);

    // Si la connexion est réussie, on peut stocker le token et rediriger
    localStorage.setItem('authToken', data.token); // Stocke le token dans le localStorage

    // Redirection après connexion réussie
    window.location.href = '/dashboard.html'; // Remplace par la page que tu veux
  } catch (error) {
    errorMessage.textContent = error.message; // Affiche l'erreur dans la page
  }
});
