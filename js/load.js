import { fetchTrendingAll, fetchTrendingSeries } from "./fetch.js";
import { setupButtons } from "./button.js";

document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingAll();
    fetchTrendingSeries();
    setupButtons();
});
