// https://www.omdbapi.com/?apikey=f5e43e2a&
// https://img.omdbapi.com/?apikey=f5e43e2a&

const movieListEl = document.querySelector(".movie-list");

async function main() {
    const movies = await fetch ("https://www.omdapi.com/?apikey=f5e4332a&s=avengers");
    const moviesData = await movies.json();
    movieListEl.innerHTML = moviesData.Search.map(.)
}

main();

function showMovieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/movie.html`
    console.log(imdbID)
}

function movieHTML(movie) {
    return `<div class="movie" onClick="showMovieInfo(`${movie.imdbID}`)">
                        <img src"${movie.Poster}" class="movie-poster">
                            <div class="movie__info--container">
                                <h3>${movie.Title}Movie Title:</h3>
                                <p><b>Release Year:</b>${movie.Year}2000</p>
                                <p><b>Media Type:</b>${movie.Type} movie</p>
                            </div>
                        </div>
                    </div>`
}