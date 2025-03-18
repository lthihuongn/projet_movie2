import { fetchTrendingAll, fetchTrendingSeries } from "./fetch.js";
import { setupButtons } from "./button.js";
import { searchMixedContent, createSearchWrapper } from "./search.js";

document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingAll();
    fetchTrendingSeries();
    setupButtons();
});
