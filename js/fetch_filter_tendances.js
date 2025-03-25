import { displayMixedContent } from "./display.js";

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendingToday() {
    await fetchFilteredData(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=fr-FR`);
}

export async function fetchTrendingThisWeek() {
    await fetchFilteredData(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=fr-FR`);
}

async function fetchFilteredData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            displayMixedContent(data.results.slice(0, 4));
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des tendances :", error);
    }
}
