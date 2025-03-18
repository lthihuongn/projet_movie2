import { displayMixedContent } from './display.js';

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/500x750?text=Image+indisponible';

// Sélection des éléments du DOM
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

// Fonction pour afficher dynamiquement la section .wrapper.search
export function createSearchWrapper() {
    let searchWrapper = document.querySelector('.wrapper-search');

    if (!searchWrapper) {
        searchWrapper = document.createElement('div');
        searchWrapper.classList.add('wrapper', 'search');
        document.body.insertBefore(searchWrapper, document.querySelector('footer'));
    }

    return searchWrapper;
}

// Fonction pour rechercher films et séries via l'API TMDb
export async function searchMixedContent(query) {
    try {
        const [moviesResponse, seriesResponse] = await Promise.all([
            fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`),
            fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`)
        ]);

        const moviesData = await moviesResponse.json();
        const seriesData = await seriesResponse.json();

        const results = [...(moviesData.results || []), ...(seriesData.results || [])];

        const searchWrapper = createSearchWrapper();

        if (results.length > 0) {
            searchWrapper.innerHTML = ''; // Nettoyage avant d'afficher de nouveaux résultats
            displayMixedContent(results, searchWrapper);  // Affiche les résultats trouvés
        } else {
            searchWrapper.innerHTML = `<p>Aucun résultat trouvé pour "${query}".</p>`;
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

// Gestion du bouton de recherche
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        searchMixedContent(query); // Lance la recherche uniquement si le champ n'est pas vide
    }
});

// Permet de lancer la recherche avec la touche "Entrée"
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchMixedContent(query);
        }
    }
});
