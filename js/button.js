import {
    fetchTrendingToday,
    fetchTrendingThisWeek
} from "./fetch_filter_tendances.js";

import {
    fetchTopRatedSeries,
    fetchPopularSeries
} from "./fetch_filter_seriesTV.js";

export function setupButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const buttonText = button.textContent.trim().toLowerCase();

            switch (buttonText) {
                case "aujourd'hui":
                    fetchTrendingToday();
                    break;
                case "cette semaine":
                    fetchTrendingThisWeek();
                    break;
                case "mieux notées":
                    fetchTopRatedSeries();
                    break;
                case "populaires":
                    fetchPopularSeries();
                    break;
                case "mieux notées !":
                    fetchTopRatedMovies();
                    break;
                case "populaires !":
                    fetchPopularMovies();
                    break;
                default:
                    console.warn(`Bouton non reconnu : ${buttonText}`);
            }
        });
    });
}
