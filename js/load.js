import { fetchTrendingAll, fetchTrendingSeries, fetchTrendingMovies } from "./fetch.js";
import { setupButtons } from "./button.js";
import { searchMixedContent, createSearchWrapper } from "./search.js";  // ne pas toucher !!!!

document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingAll();
    fetchTrendingSeries();
    fetchTrendingMovies();
    setupButtons();

});
