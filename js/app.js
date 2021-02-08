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

routie('astronomy/:date', (date) => {
    console.log(date);
});


function getData(slug, query) {
console.log(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`);
    const data = fetch(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`)
                .then(response => response.json())
                .catch(error => console.error("Error with fetch", error));
    return data;
}

async function renderAstronomy() {
    const astronomyPictures = await getData(astronomyBase, "count=6");
    const container = document.querySelector("section.astronomy");
    const images = astronomyPictures.map(data => data.url);

    for (const i in images) {
        const article = document.createElement("article");

        const astroFigure = document.createElement("figure");

        const astroImage = document.createElement("img");
        astroImage.src = images[i] ? images[i] : '../img/no-picture.png';
        astroImage.onerror = () => astroImage.src = '../img/no-picture.png';
        astroFigure.appendChild(astroImage);
        
        article.appendChild(astroFigure);

        const astroTitle = document.createElement("h2");
        astroTitle.textContent = astronomyPictures[i].title;
        article.appendChild(astroTitle);

        const featuredTitle = document.createElement("p");
        featuredTitle.classList.add("bold");
        featuredTitle.textContent = "Featured on:";
        article.appendChild(featuredTitle);

        const featuredDate = document.createElement("p");
        featuredDate.textContent = getDate(astronomyPictures[i].date);
        article.appendChild(featuredDate);

        const infoButton = document.createElement("a");
        infoButton.textContent = "About this photo";
        infoButton.href = `#astronomy/${astronomyPictures[i].date}`;
        article.appendChild(infoButton);

        container.appendChild(article);
    }
    console.log(astronomyPictures, images);
}

renderAstronomy();

async function renderRover() {
     const container = document.querySelector("section.rovers");
 
     for (const i in rovers) {
        const roverPictures = await getData(`${roverBase+rovers[i]}/latest_photos`);

        const article = document.createElement("article");

        const roverImage = document.createElement("img");
        roverImage.src = roverPictures.latest_photos[0].img_src;
        article.appendChild(roverImage);

        const roverTitle = document.createElement("h2");
        roverTitle.textContent = roverPictures.latest_photos[0].rover.name;
        article.appendChild(roverTitle);

        const createdDate = document.createElement("p");
        createdDate.textContent = getDate(roverPictures.latest_photos[0].earth_date);
        article.appendChild(createdDate);

        const infoButton = document.createElement("button");
        infoButton.textContent = "More details";
        article.appendChild(infoButton);

        container.appendChild(article);
        console.log(rovers[i], roverPictures);
     }
 }

//renderRover();

function getDate(date) {
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const month = dateObject.toLocaleString("en-US", {month: "long"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    return `${month} ${day}, ${year}`;
}