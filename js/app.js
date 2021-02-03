// RANDOM ASTRONOMY PICTURES (4)
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=4

// LATEST PICTURES PER ROVER
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY

// FILTER PER SOL
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

// INFO PER ROVER (launch date, arrival, status, max-sol, max-date and camera's)
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY

const apiBase = "https://api.nasa.gov/";
const astronomyBase = "planetary/apod";
const roverBase = "mars-photos/api/v1/rovers/";
const rovers = ['curiosity', 'opportunity', 'spirit'];
const key = "O0U6zcZfaAGpJjFRQ8kcpVdts9kgWlh7PnjXiQaK";

function getData(slug, query) {
console.log(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`);
        const data = fetch(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`)
                 .then(response => response.json())
                 .catch(error => console.error("Error with fetch", error));
        return data;
}

async function renderData() {
    const astronomyPictures = await getData(astronomyBase, "count=4");
    console.log(astronomyPictures);
}

renderData();