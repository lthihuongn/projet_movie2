const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/500x750?text=Image+indisponible';

export function displayMixedContent(content) {
    const gridTendances = document.querySelector('#tendances');
    gridTendances.innerHTML = '';

    const limitedContent = content.slice(0, 4);

    const contentElements = limitedContent.map(item => {
        const score = Math.round(item.vote_average * 10);
        const title = item.title || item.name;
        const releaseDate = item.release_date || item.first_air_date || 'Date inconnue';
        const mediaType = item.media_type === 'movie' ? 'movie' : 'tv';

        const contentElement = document.createElement('div');
        contentElement.classList.add('movie');

        contentElement.innerHTML = `
            <a href="focus.html?type=${mediaType}&id=${item.id}">
                
                <img src="${item.poster_path ? IMG_BASE_URL + item.poster_path : PLACEHOLDER_IMG}" 
                     alt="${title}">
                <div class="score">
                    <p>${score}%</p>
                </div>
                <h4>${title}</h4>
                <span>${new Date(releaseDate).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        })}</span>
            </a>
        `;
        return contentElement;
    });

    gridTendances.append(...contentElements);
}

export function displaySeries(series) {
    const gridTendances = document.querySelector('#populaires');
    gridTendances.innerHTML = '';

    const limitedContent = series.slice(0, 4);

    const seriesElements = limitedContent.map(serie => {
        const score = Math.round(serie.vote_average * 10); // Conversion en pourcentage
        const serieElement = document.createElement('div');
        serieElement.classList.add('serie');
        serieElement.innerHTML = `
            <a href="focus.html?type=tv&id=${serie.id}">
                <img src="${serie.poster_path ? IMG_BASE_URL + serie.poster_path : PLACEHOLDER_IMG}" 
                     alt="${serie.name}">
                <div class="score">
                    <p>${score}%</p>
                </div>
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

export function displayMovies(movies) {
    const gridTendances = document.querySelector('#populaire2');
    gridTendances.innerHTML = '';
    const limitedContent = movies.slice(0, 4);

    const movieElements = limitedContent.map(movie => {
        const score = Math.round(movie.vote_average * 10);
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie2');
        movieElement.innerHTML = `
            <a href="focus.html?type=tv&id=${movies.id}">
                <img src="${movie.poster_path ? IMG_BASE_URL + movie.poster_path : PLACEHOLDER_IMG}" 
                     alt="${movie.name}">
                <div class="score">
                    <p>${score}%</p>
                </div>
                <h4>${movie.name}</h4>
                <span>${new Date(movie.first_air_date).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        })}</span>
            </a>
        `;
        return movieElement;
    });

    gridTendances.append(...movieElements);
}

export function displaySearch(content) {
    const gridTendances = document.querySelector('#search-results');
    gridTendances.innerHTML = '';

    const limitedContent = content.slice(0, 8);

    const contentElements = limitedContent.map(item => {
        const score = Math.round(item.vote_average * 10);
        const title = item.title || item.name;
        const releaseDate = item.release_date || item.first_air_date || 'Date inconnue';
        const mediaType = item.media_type === 'movie' ? 'movie' : 'tv';

        const contentElement = document.createElement('div');
        contentElement.classList.add('movie');

        contentElement.innerHTML = `
            <a href="focus.html?type=${mediaType}&id=${item.id}">
                
                <img src="${item.poster_path ? IMG_BASE_URL + item.poster_path : PLACEHOLDER_IMG}" 
                     alt="${title}">
                <div class="score">
                    <p>${score}%</p>
                </div>
                <h4>${title}</h4>
                <span>${new Date(releaseDate).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'long', year: 'numeric'
        })}</span>
            </a>
        `;
        return contentElement;
    });

    gridTendances.append(...contentElements);
}

