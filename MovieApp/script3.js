        // Define the base URL for images
        const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

        // Initialize an empty array for trending movies
        const TrendingMovies = [];

        // Create an array of numbers
        const nums = new Array(20).fill(1).map((ele, index) => index + 1);

        // Simulate the behavior of useNavigate
        function useNavigate() {
            return {
                navigate: (options) => {
                    // Implement your navigation logic here
                    console.log('Navigating to:', options.pathname, 'with search:', options.search);
                }
            };
        }

        // Simulate the behavior of useEffect
        function useEffect(callback) {
            callback();
        }

        // Define the function to get trending movies
        async function getAllTrendings(pageNumber) {
            try {
                // Make an HTTP request to get movie data
                // Replace this with your actual data fetching code
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`);
                const data = await response.json();
                TrendingMovies.length = 0; // Clear the array
                TrendingMovies.push(...data.results);
                renderTrendingMovies();
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        }

        // Function to display movie details when clicked
        function showMovieDetails(movie) {
            const movieDetails = document.getElementById('movie-details');
            movieDetails.style.background = "gray";
            movieDetails.innerHTML = `
                <img src="${imgBaseUrl + movie.poster_path}" class="w-100" alt="">
                <h2 class="h5 text-center mt-2 ">${movie.title}</h2>
             
                    <span>${Math.floor(movie.vote_average)}<i class="fa-star"></i></span>
                </div>
                <p>Overview: ${movie.overview}</p>
                <p>Release Date: ${movie.release_date}</p>
            `;
            // Show the card
            movieDetails.style.display = 'block';
        }

        // Function to hide movie details
        function hideMovieDetails() {
            const movieDetails = document.getElementById('movie-details');
            movieDetails.style.display = 'none';
        }

        // Update the click event for movie cards to show details
        function renderTrendingMovies() {
            const movieContainer = document.getElementById('movie-container');
            movieContainer.innerHTML = '';

            TrendingMovies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.className = 'col-md-2 gy-3';

                movieDiv.addEventListener('click', () => {
                    // Hide all other elements
                    const allMovieDivs = document.querySelectorAll('.col-md-2.gy-3');
                    allMovieDivs.forEach(div => {
                        div.style.display = 'none';
                    });

                    showMovieDetails(movie);
                });

                const movieDisplay = document.createElement('div');
                movieDisplay.className = 'movieDisplay position-relative';

                const movieImage = document.createElement('img');
                movieImage.src = imgBaseUrl + movie.poster_path;
                movieImage.className = 'w-100';
                movieImage.alt = '';

                const movieTitle = document.createElement('h2');
                movieTitle.className = 'h5 text-center mt-2';
                movieTitle.textContent = movie.title;

                const movieRating = document.createElement('div');
                movieRating.className = 'bg-warning w-25 position-absolute top-0 end-0 text-center';
                movieRating.innerHTML = `<span>${Math.floor(movie.vote_average)}<i class="fa-star"></i></span>`;

                movieDisplay.appendChild(movieImage);
                movieDisplay.appendChild(movieTitle);
                movieDisplay.appendChild(movieRating);

                movieDiv.appendChild(movieDisplay);
                movieContainer.appendChild(movieDiv);
            });
        }

        // Initialize the trending movies
        useEffect(() => {
            getAllTrendings(1);
        });