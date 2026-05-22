// https://www.omdbapi.com/?apikey=f5e43e2a&
// https://img.omdbapi.com/?apikey=f5e43e2a&

const movieListEl = document.querySelector(".movie-list");
const moviesWrapper = document.querySelector('.movie-list');
const loadingSpinner = document.querySelector('.movies__loading--spinner');
let movies;

async function getMovies(searchTerm = 'avengers') {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=f5e43e2a&s=${searchTerm}`);
    const moviesData = await movies.json();
    return moviesData.Search;
}

function showMovieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/index.html`;
    console.log(imdbID);
}

async function searchMovies() {
    const searchInput = document.getElementById('search').value.trim().toLowerCase();
    if (!searchInput) {
        movies = [];
        moviesWrapper.innerHTML = "";
        return;
    }
    loadingSpinner.classList.add("movies__loading");
    moviesWrapper.innerHTML = '';
    movies = await getMovies(searchInput);
    renderFilteredMovies(movies);
    loadingSpinner.classList.remove('movies__loading');
}

function renderFilteredMovies(filteredMovies) {

    if (!filteredMovies || filteredMovies.length === 0) {
        moviesWrapper.innerHTML = '<p class = "search__fail">No movies found. Try another search.</p>';
        return;
    }

    const moviesHTML = filteredMovies.map((movie) => {
        return `<div class="movie" onClick="showMovieInfo('${movie.imdbID}')">
                        <img src="${movie.Poster}" class="movie-poster">
                            <div class="movie__info--container">
                                <h3>Title: ${movie.Title}</h3>
                                <p><b>Release Year: </b>${movie.Year}</p>
                                <p><b>Media Type: </b>${movie.Type}</p>
                            </div>
                        </div>`;
    }).join('');

    moviesWrapper.innerHTML = moviesHTML;
}

function filterMovies(event) {
    renderMovies(event.target.value);
}

async function renderMovies(filter) {
    loadingSpinner.classList.add("movies__loading");

    if (!movies) {
        movies = await getMovies();
    }
    if (filter === 'NEW_TO_OLD') {
        movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filter === 'OLD_TO_NEW') {
        movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (filter === 'A_TO_Z') {
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'Z_TO_A') {
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    renderFilteredMovies(movies);

    const moviesHTML = movies
        .map((movie) => {
            return `<div class="movie" onClick="showMovieInfo('${movie.imdbID}')">
                        <img src="${movie.Poster}" class="movie-poster">
                            <div class="movie__info--container">
                                <h3>Title: ${movie.Title}</h3>
                                <p><b>Release Year: </b>${movie.Year}</p>
                                <p><b>Media Type: </b>${movie.Type}</p>
                            </div>
                        </div>`;
        }).join('');

    moviesWrapper.innerHTML = moviesHTML;
    loadingSpinner.classList.remove('movies__loading');
}

function main() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchMovies);
    const filter = document.getElementById('filter');
    filter.addEventListener('change', filterMovies);
}

main();


