export default function render(data, date) {
    if(!date) {
        renderAstronomy(data.astronomy);
        renderRover(data.rover);
    }
    else if(date) {
        console.log("I could render date");
    }
}

function renderAstronomy(data) {
    const astronomyPictures = data;
    const container = document.querySelector("section.astronomy");
    const images = astronomyPictures.map(data => data.url);

    for (const i in images) {
        const article = document.createElement("article");

        const astroFigure = document.createElement("figure");

        if (astronomyPictures[i].media_type === "video") {
            const astroVideo = document.createElement("iframe");
            astroVideo.src = images[i] ? images[i] : '../img/no-picture.png';
            astroVideo.setAttribute("frameborder", "0");
            astroVideo.setAttribute("allowfullscreen", '');
            astroFigure.appendChild(astroVideo);
        }

        else {
            const astroImage = document.createElement("img");
            astroImage.src = images[i] ? images[i] : '../img/no-picture.png';
            astroImage.onerror = () => astroImage.src = '../img/no-picture.png';
            astroFigure.appendChild(astroImage);
        }
        
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
        if (rovers[i].photos[0]) {
            const article = document.createElement("article");

            const roverFigure = document.createElement("figure");

            const roverImage = document.createElement("img");
            roverImage.src = rovers[i].photos[0].img_src;
            roverFigure.appendChild(roverImage);

            article.appendChild(roverFigure);

            const roverTitle = document.createElement("h2");
            roverTitle.textContent = rovers[i].photos[0].rover.name;
            article.appendChild(roverTitle);

            const createdDate = document.createElement("p");
            createdDate.textContent = getDate(rovers[i].photos[0].earth_date);
            article.appendChild(createdDate);

            const infoButton = document.createElement("a");
            infoButton.textContent = "More details";
            infoButton.href = `#rover/${rovers[i].photos[0].rover.name}/${rovers[i].photos[0].sol}`;
            article.appendChild(infoButton);

            container.appendChild(article);
        }
    }
 }

function getDate(date) {
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const month = dateObject.toLocaleString("en-US", {month: "long"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    return `${month} ${day}, ${year}`;
}