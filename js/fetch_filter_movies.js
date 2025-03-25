import { displayMovies } from "./display.js";

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTopRatedMovies() {
    await fetchFilteredData(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`);
}

export async function fetchPopularMovies() {
    await fetchFilteredData(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
}

async function fetchFilteredData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
    }
}
