export default function render(astronomy, rover, date) {
    const overview = document.querySelector("#overview");
    const articles = document.querySelectorAll("section.astronomy article");

    if(!date && articles.length === 0) {
        renderAstronomy(astronomy);
        renderRover(rover);
    }
    else if(!date && articles.length > 0) {
        overview.classList.remove("hide");
    }
    else if(date) {
        overview.classList.add("hide");
    }
}

function renderAstronomy(data) {
   const astronomyPictures = data;
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

async function renderRover(data) {
     const rovers = data;
     const container = document.querySelector("section.rovers");
 
     for (const i in rovers) {
        const article = document.createElement("article");

        const roverImage = document.createElement("img");
        roverImage.src = rovers[i].latest_photos[0].img_src;
        article.appendChild(roverImage);

        const roverTitle = document.createElement("h2");
        roverTitle.textContent = rovers[i].latest_photos[0].rover.name;
        article.appendChild(roverTitle);

        const createdDate = document.createElement("p");
        createdDate.textContent = getDate(rovers[i].latest_photos[0].earth_date);
        article.appendChild(createdDate);

        const infoButton = document.createElement("button");
        infoButton.textContent = "More details";
        article.appendChild(infoButton);

        container.appendChild(article);
    }
 }

function getDate(date) {
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const month = dateObject.toLocaleString("en-US", {month: "long"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    return `${month} ${day}, ${year}`;
}