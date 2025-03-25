import {displaySearch} from './display.js';

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';

const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

export function createSearchWrapper() {
    let searchWrapper = document.querySelector('.wrapper.search');

    if (!searchWrapper) {
        searchWrapper = document.createElement('div');
        searchWrapper.classList.add('wrapper', 'search');
        searchWrapper.innerHTML = `
            <h2>Résultats de la recherche</h2>
            <button class="close-search">Quitter</button>
            <div class="search-results-container" id="search-results">
                
            </div>`;
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) {
            document.body.insertBefore(searchWrapper, wrapper);
        } else {
            document.body.appendChild(searchWrapper);
        }

        const closeSearchButton = searchWrapper.querySelector('.close-search');
        closeSearchButton.addEventListener('click', () => {
            searchWrapper.style.display = 'none';
        });
    }

    return searchWrapper;
}


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
        const resultsContainer = searchWrapper.querySelector('.search-results-container');


        resultsContainer.innerHTML = '';

        if (results.length > 0) {
            displaySearch(results);
        } else {
            resultsContainer.innerHTML = `<p>Aucun résultat trouvé pour "${query}".</p>`;
        }

        searchWrapper.style.display = 'block';
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        searchMixedContent(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchMixedContent(query);
        }
    }
});
