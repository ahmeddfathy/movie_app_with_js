   // Define the base URL for images
   const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

   // Initialize an empty array for trending TV shows
   const TrendingTV = [];

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

   // Define the function to get trending TV shows
   async function getAllTrendings(pageNumber) {
       try {
           // Make an HTTP request to get TV show data
           // Replace this with your actual data fetching code
           const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
           const data = await response.json();
           TrendingTV.length = 0; // Clear the array
           TrendingTV.push(...data.results);
           renderTrendingTV();
       } catch (error) {
           console.error('Error fetching trending TV shows:', error);
       }
   }

   // Function to display TV show details when clicked
   function showTvDetails(tv) {
       const tvDetails = document.getElementById('tv-details');
       tvDetails.innerHTML = `
           <img src="${imgBaseUrl + tv.poster_path}" class="w-100 " alt="">
           <h2 class="h5 text-center mt-2">${tv.name}</h2>
           <div class="bg-info w-25 position-absolute top-0 end-0 text-center">
               <span>${Math.floor(tv.vote_average)}<i class="fa-star"></i></span>
           </div>
           <p>Overview: ${tv.overview}</p>
           <p>First Air Date: ${tv.first_air_date}</p>
       `;
       // Show the card
       tvDetails.style.display = 'flex';
       tvDetails.style.height = 'fit-content';
       tvDetails.style.color = 'black';

       // Hide all other TV cards
       const allTvCards = document.querySelectorAll('.tv-card');
       allTvCards.forEach(card => {
           if (card !== tvDetails) {
               card.classList.add('hidden');
           }
       });
   }

   // Function to hide TV show details
   function hideTvDetails() {
       const tvDetails = document.getElementById('tv-details');
       tvDetails.style.display = 'none';

       // Show all TV cards
       const allTvCards = document.querySelectorAll('.tv-card');
       allTvCards.forEach(card => {
           card.classList.remove('hidden');
       });
   }

   // Update the click event for TV show cards to show details
   function renderTrendingTV() {
       const tvContainer = document.getElementById('tv-container');
       tvContainer.innerHTML = '';

       TrendingTV.forEach(tv => {
           const tvDiv = document.createElement('div');
           tvDiv.className = 'col-md-2 gy-3 tv-card';

           tvDiv.addEventListener('click', () => {
               showTvDetails(tv);
           });

           const tvDisplay = document.createElement('div');
           tvDisplay.className = 'TvshowesDisplay position-relative';

           const tvImage = document.createElement('img');
           tvImage.src = imgBaseUrl + tv.poster_path;
           tvImage.className = 'w-100';
           tvImage.alt = '';

           const tvName = document.createElement('h2');
           tvName.className = 'h5 text-center mt-2';
           tvName.textContent = tv.name;
           tvName.style.color = 'black'

           const tvRating = document.createElement('div');
           tvRating.className = 'bg-info w-25 position-absolute top-0 end-0 text-center';
           tvRating.innerHTML = `<span>${Math.floor(tv.vote_average)}<i class="fa-star"></i></span>`;
           
           tvDisplay.appendChild(tvImage);
           tvDisplay.appendChild(tvName);
           tvDisplay.appendChild(tvRating);

           tvDiv.appendChild(tvDisplay);
           tvContainer.appendChild(tvDiv);
       });
   }

   // Initialize the trending TV shows
   useEffect(() => {
       getAllTrendings(1);
   });

 


nums.forEach(pageNumber => {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.addEventListener('click', () => getAllTrendings(pageNumber));

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link bg-transparent text-white';
    pageLink.textContent = pageNumber;

    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
});

// Initial load
getAllTrendings(1);

