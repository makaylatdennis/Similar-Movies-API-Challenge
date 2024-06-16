function setError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerText = message;
}

function movieValue() {
  const movie = document.getElementById("movieInput").value;
  if (movie.trim() === "") {
    setError("Movie entry required");
  }
  return movie;
}

function searchMovie() {
  const entry = movieValue();
  if (!entry) return;

  const api_endpoint = `http://localhost:3000/search`;

  const data = { query: entry };

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(api_endpoint, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unable to reach network");
      }
      return res.json();
    })

    .then((data) => {
      const movieContainer = document.getElementById("movies-container");
      let movieIndex = "";
              
      for (let i = 0; i < data.results.length; i++) {
        let movie = data.results[i];
        let movieItems = `
                <div class="movie" id=${movie.id}>
                    <h2>${movie.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.overview}</p>

                </div>`;
                // console.log(movieItems)
        movieIndex += movieItems;
      }

      movieContainer.innerHTML = movieIndex;
      loadSimilar()
    })
    .catch((error) => {
        console.log(error)
      setError(`Error: ${error.message}`);
    });
}

function similarMovies(id) {
  const api_endpoint = `http://localhost:3000/similar`;

  const data = { id };

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(api_endpoint, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unable to reach network");
      }
      return res.json();
    })

    .then((data) => {
      const movieContainer = document.getElementById("movies-container");
      let movieIndex = "";
              
      for (let i = 0; i < data.results.length; i++) {
        let movie = data.results[i];
        let movieItems = `
                <div class="movie" id=${movie.id}>
                    <h2>${movie.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.overview}</p>

                </div>`;
                // console.log(movieItems)
        movieIndex += movieItems;
      }

      movieContainer.innerHTML = movieIndex;
      loadSimilar()
    })
    .catch((error) => {
        console.log(error)
      setError(`Error: ${error.message}`);
    });
}





document.getElementById("search").addEventListener("click", function () {
  searchMovie();
});

function loadSimilar(){
var movieClick = document.getElementsByClassName("movie")

for(let i=0; i<movieClick.length; i++){
  movieClick[i].addEventListener("click", function () {
    console.log('here')
    similarMovies(movieClick[i].id);
  });
}
}


