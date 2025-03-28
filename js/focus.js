const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/500x750?text=Image+indisponible';

const params = new URLSearchParams(window.location.search);
const type = params.get('type');
const id = params.get('id');

async function fetchDetails() {
    if (!type || !id) {
        displayError("Type ou ID manquant dans l'URL.");
        return;
    }

    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=fr-FR`;
    const creditsUrl = `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=fr-FR`;

    try {
        const [detailsResponse, creditsResponse] = await Promise.all([
            fetch(url).then(res => {
                if (!res.ok) throw new Error(`Erreur ${res.status} : Contenu non trouvé`);
                return res.json();
            }),
            fetch(creditsUrl).then(res => {
                if (!res.ok) throw new Error(`Erreur ${res.status} : Casting non trouvé`);
                return res.json();
            })
        ]);

        displayDetails(detailsResponse, creditsResponse.cast);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
        displayError("Erreur 404 : Contenu non trouvé.");
    }
}

function displayDetails(details, cast) {
    const focusContainer = document.querySelector('.focus-container');

    focusContainer.innerHTML = `
        <div class="banner">
            <div class="content">
                <img src="${details.poster_path ? IMG_BASE_URL + details.poster_path : PLACEHOLDER_IMG}" 
                     alt="${details.title || details.name}">
                <div class="right">
                    <div class="top">
                        <div class="score">${Math.round(details.vote_average * 10)}%</div>
                        <div class="title-date">
                            <h1>${details.title || details.name} 
                                (${new Date(details.release_date || details.first_air_date).getFullYear()})
                            </h1>
                            <span>${new Date(details.release_date || details.first_air_date)
        .toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })}
                            </span>
                        </div>
                    </div>
                    <div class="synopsis">
                        <h2>Synopsis</h2>
                        <p>${details.overview || 'Synopsis non disponible.'}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="casting">
            <h2>Casting</h2>
            <div class="actors">
                ${cast.slice(0, 8).map(actor => `
                    <div class="actor">
                        <img src="${actor.profile_path ? IMG_BASE_URL + actor.profile_path : PLACEHOLDER_IMG}" 
                             alt="${actor.name}">
                        <h4>${actor.name}</h4>
                        <span>${actor.character}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const banner = document.querySelector('.focus-container .banner');

    if (details.backdrop_path) {
        banner.style.backgroundImage = `url(${IMG_BASE_URL + details.backdrop_path})`;
    } else {
        banner.style.backgroundImage = `url("./../img/bg.png")`;
    }

    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center';
}


function displayError(message) {
    const focusContainer = document.querySelector('.focus-container');
    focusContainer.innerHTML = `
        <div class="error-message">
            <h1>${message}</h1>
            <p>Veuillez vérifier l'URL ou revenir à la page d'accueil.</p>
            <a href="./index.html" class="btn-home">Retour à l'accueil</a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', fetchDetails);
