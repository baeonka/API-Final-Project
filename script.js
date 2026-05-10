// https://www.omdbapi.com/?apikey=f5e43e2a&
// https://img.omdbapi.com/?apikey=f5e43e2a&

const movieListEl = document.querySelector(".movie-list");

async function main() {
    const movies = await fetch ("https://www.omdapi.com/?aipkey=f5e4332a&");
    const moviesData = await movies.json();
    movieListEl.innerHTML = moviesData.map((movie) => movieHTML(movie)).join("");
}

main();

function showMovieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/movie.html`
    console.log(imdbID)
}

function movieHTML(movie) {
    return `<div class="movie" onClick="showMovieInfo(${movie.imdbID})>
                        <div class=${movie.poster}"movie-poster">
                            <div class="movie__info--container">
                                <h3>${movie.title}Movie Title:</h3>
                                <p><b>Release Year:</b>${movie.year}2000</p>
                                <p><b>Media Type:</b>${movie.type} movie</p>
                            </div>
                        </div>
                    </div>`
}