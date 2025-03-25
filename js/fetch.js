import { displayMixedContent, displaySeries } from "./display.js";

const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';


export async function fetchTrendingAll() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=c9969067a3218ce43c4915860fb5a681&language=fr-FR');
        const data = await response.json();

        if (data.results) displayMixedContent(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des tendances :", error);
    }
}

export async function fetchTrendingSeries() {
    try {
        const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        if (data.results) displaySeries(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
    }
}

export async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();

        if (data.results) displayMovies(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

