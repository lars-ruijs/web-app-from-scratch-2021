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

// const demoData = [{copyright: "Eddie Guscott", date: "2004-05-11", explanation: "M13 is one of the most prominent and best known globular clusters.  Visible with binoculars in the constellation of Hercules, M13 is frequently one of the first objects found by curious sky gazers seeking celestials wonders beyond normal human vision.   M13 is a colossal home to over 100,000 stars, spans over 150  light years across, lies over 20,000 light years distant, and is over 12 billion years old.  At the 1974 dedication of Arecibo Observatory, a radio message about Earth was sent in the direction of M13.  The reason for the low abundance of unusual blue straggler stars in M13 is currently unknown.", hdurl: "https://apod.nasa.gov/apod/image/0405/m13_guscott_big.jpg", media_type: "image", service_version: "v1", title: "M13: The Great Globular Cluster in Hercules", url: "https://apod.nasa.gov/apod/image/0405/m13_guscott.jpg"}, {copyright: "Adam Block", date: "2005-04-06", explanation: "M7 is one of the most prominent open clusters of stars on the sky.  The cluster, dominated by bright blue stars, can be seen with the naked eye in a dark sky in the tail of the constellation of Scorpius.  M7 contains about 100 stars in total, is about 200 million years old, spans 25 light-years across, and lies about 1000 light-years away.   This color picture was taken recently at the Kitt Peak National Observatory in Arizona, USA as part of the Advanced Observers Program. The M7 star cluster has been known since ancient times, being noted by Ptolemy in the year 130 AD.  Also visible is a dark dust cloud near the bottom of the frame, and literally millions of unrelated stars towards the Galactic center.", hdurl: "https://apod.nasa.gov/apod/image/0504/m7_cook_big.jpg", media_type: "image", service_version: "v1", title: "The M7 Open Star Cluster in Scorpius", url: "https://apod.nasa.gov/apod/image/0504/m7_cook.jpg"}];

function getData(slug, query) {
console.log(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`);
        const data = fetch(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`)
                 .then(response => response.json())
                 .catch(error => console.error("Error with fetch", error));
        return data;
}

async function renderAstronomy() {
    const astronomyPictures = await getData(astronomyBase, "count=4");
    //const astronomyPictures = demoData;
    const container = document.querySelector("section.astronomy");
    const images = astronomyPictures.map(d => d.hdurl);

    for (const i in images) {
        const article = document.createElement("article");

        const astroImage = document.createElement("img");
        astroImage.src = images[i];
        article.appendChild(astroImage);

        const astroTitle = document.createElement("h2");
        astroTitle.textContent = astronomyPictures[i].title;
        article.appendChild(astroTitle);

        const featuredTitle = document.createElement("p");
        featuredTitle.classList.add("bold");
        featuredTitle.textContent = "Featured on:";
        article.appendChild(featuredTitle);

        const featuredDate = document.createElement("p");
        featuredDate.textContent = astronomyPictures[i].date;
        article.appendChild(featuredDate);

        const infoButton = document.createElement("button");
        infoButton.textContent = "About this photo";
        article.appendChild(infoButton);

        container.appendChild(article);
    }
    console.log(astronomyPictures, images);
}

renderAstronomy();