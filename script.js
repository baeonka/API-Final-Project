// https://www.omdbapi.com/?apikey=f5e43e2a&
// https://img.omdbapi.com/?apikey=f5e43e2a&

const movieListEl = document.querySelector(".movie-list");
let movies;

async function getMovies() {
    const movies = await fetch ("https://www.omdbapi.com/?apikey=f5e43e2a&s=avengers");
    const moviesData = await movies.json();
    return moviesData.Search;
}

function showMovieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/index.html`
    console.log(imdbID)
}

function filterMovies(event) {
    renderMovies(event.target.value)
}

async function renderMovies(filter) {
    const moviesWrapper = document.querySelector('.movie-list');
    const loadingSpinner = document.querySelector('.movies__loading--spinner')
    loadingSpinner.classList += " movies__loading";

    if (!movies) {
        movies = await getMovies();
    }
    loadingSpinner.classList.remove('movies__loading')

    if (filter === 'NEW_TO_OLD') {
        movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }
    else if (filter === 'OLD_TO_NEW') {
        movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }
    else if (filter === 'A_TO_Z') {
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    else if (filter === 'Z_TO_A') {
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    const moviesHTML = movies
    .map((movie) => {
        return `<div class="movie" onClick="showMovieInfo('${movie.imdbID}')">
                        <img src="${movie.Poster}" class="movie-poster">
                            <div class="movie__info--container">
                                <h3>Title: ${movie.Title}</h3>
                                <p><b>Release Year: </b>${movie.Year}</p>
                                <p><b>Media Type: </b>${movie.Type}</p>
                            </div>
                        </div>`
    }).join('');

    moviesWrapper.innerHTML = moviesHTML;
}

renderMovies();