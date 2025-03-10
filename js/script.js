const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/500x750?text=Image+indisponible';

async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        if (data.results) displayMovies(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

async function fetchTrendingSeries() {
    try {
        const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        if (data.results) displaySeries(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
    }
}

function displayMovies(movies) {
    const gridTendances = document.querySelector('#tendances');
    gridTendances.innerHTML = '';

    const movieElements = movies.map(movie => {
        const score = Math.round(movie.vote_average * 10); // Conversion en pourcentage
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <a href="focus.html?type=movie&id=${movie.id}">
           
                <img src="${movie.poster_path ? IMG_BASE_URL + movie.poster_path : PLACEHOLDER_IMG}" 
                     alt="${movie.title}">
                <div class="score">
                    <p>${score}%</p>
                </div>
                <h4>${movie.title}</h4>
                <span>${new Date(movie.release_date).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        })}</span>
            </a>
        `;
        return movieElement;
    });

    gridTendances.append(...movieElements);
}

function displaySeries(series) {
    const gridTendances = document.querySelector('#populaires');
    gridTendances.innerHTML = '';

    const seriesElements = series.map(serie => {
        const serieElement = document.createElement('div');
        serieElement.classList.add('serie');
        serieElement.innerHTML = `
            <a href="focus.html?type=tv&id=${serie.id}">
                <img src="${serie.poster_path ? IMG_BASE_URL + serie.poster_path : PLACEHOLDER_IMG}" 
                     alt="${serie.name}">
                <h4>${serie.name}</h4>
                <span>${new Date(serie.first_air_date).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        })}</span>
            </a>
        `;
        return serieElement;
    });

    gridTendances.append(...seriesElements);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingMovies();
    fetchTrendingSeries();
});
