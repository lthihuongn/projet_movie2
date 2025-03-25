import {displayMixedContent, displaySearch} from './display.js';

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/500x750?text=Image+indisponible';

// Sélection des éléments du DOM
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

// Fonction pour créer et afficher la section de recherche (uniquement si elle n'existe pas déjà)
export function createSearchWrapper() {
    let searchWrapper = document.querySelector('.wrapper.search');

    if (!searchWrapper) {
        searchWrapper = document.createElement('div');
        searchWrapper.classList.add('wrapper', 'search');
        searchWrapper.innerHTML = `
            <h2>Résultats de la recherche</h2>
            <button class="close-search">Quitter</button>
            <div class="search-results-container" id="search-results">
                
            </div>
            
        `;

        // On l'ajoute juste avant la section des tendances (donc à la place de wrapper)
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) {
            document.body.insertBefore(searchWrapper, wrapper);  // Insère la div au-dessus de .wrapper
        } else {
            // Si .wrapper n'existe pas, l'ajoute à la fin du body
            document.body.appendChild(searchWrapper);
        }

        // Ajouter un écouteur d'événements au bouton "Quitter" pour fermer la recherche
        const closeSearchButton = searchWrapper.querySelector('.close-search');
        closeSearchButton.addEventListener('click', () => {
            searchWrapper.style.display = 'none';  // Cache la section de recherche quand on clique sur "Quitter"
        });
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

        const searchWrapper = createSearchWrapper();  // Appel pour créer ou récupérer la section de recherche
        const resultsContainer = searchWrapper.querySelector('.search-results-container');  // Conteneur des résultats

        // On vide la div avant de la remplir avec les nouveaux résultats
        resultsContainer.innerHTML = '';  // Vide la div avant d'afficher de nouveaux résultats

        if (results.length > 0) {
            // Afficher les résultats directement dans la div de recherche
            displaySearch(results);  // On affiche les résultats dans la div .search-results-container
        } else {
            resultsContainer.innerHTML = `<p>Aucun résultat trouvé pour "${query}".</p>`;
        }

        // Affiche la section de recherche si elle est cachée
        searchWrapper.style.display = 'block';
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

// Gestion du bouton de recherche
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        searchMixedContent(query);  // Lance la recherche uniquement si le champ n'est pas vide
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
