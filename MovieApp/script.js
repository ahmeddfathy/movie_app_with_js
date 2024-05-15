// script.js
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
const peopleContainer = document.getElementById('people-container');
const pagination = document.getElementById('pagination');

const nums = new Array(20).fill(1).map((ele, index) => index + 1);

async function getAllTrendingPeople(pageNumber) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=${pageNumber}`);
        const data = await response.json();
        const trendingPeople = data.results;
        
        // Clear previous content
        peopleContainer.innerHTML = '';

        trendingPeople.forEach(person => {
            const personDiv = document.createElement('div');
            personDiv.className = 'col-md-2 gy-3';
            personDiv.addEventListener('click', () => getActorDetails(person.id));

            const actorDisplay = document.createElement('div');
            actorDisplay.className = 'actorsDisplay';

            const img = document.createElement('img');
            img.src = imgBaseUrl + person.profile_path;
            img.className = 'w-100';
            img.alt = '';

            const name = document.createElement('h2');
            name.className = 'h5 text-center mt-2';
            name.textContent = person.name;

            actorDisplay.appendChild(img);
            actorDisplay.appendChild(name);
            personDiv.appendChild(actorDisplay);

            peopleContainer.appendChild(personDiv);
        });
    } catch (error) {
        console.error('Error fetching trending people:', error);
    }
}

function getActorDetails(id) {
    // Implement your navigation logic here
    console.log('Navigating to actor details with ID:', id);
}

nums.forEach(pageNumber => {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.addEventListener('click', () => getAllTrendingPeople(pageNumber));

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link bg-transparent text-white';
    pageLink.textContent = pageNumber;

    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
});

// Initial load
getAllTrendingPeople(1);
