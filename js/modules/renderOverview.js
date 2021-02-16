import { getDate, removeLoader } from '/js/modules/helpers.js';

// Astrononmy overview section
export function renderAstronomy(data) {
    removeLoader(); 

    // Set data value to local variable and select the astronomy container. 
    const astronomyData = data;
    const container = document.querySelector("section.astronomy");

    // Array with all the image URL's
    const images = astronomyData.map(data => data.url);

    // Repeat rendering for all images
    for (const i in images) {

        // Create article and figure element
        const article = document.createElement("article");
        const astroFigure = document.createElement("figure");

        // If the media_type is a video > create an iframe element
        if (astronomyData[i].media_type === "video") {
            const astroVideo = document.createElement("iframe");
            astroVideo.src = images[i] ? images[i] : '../img/no-picture.png';
            astroVideo.setAttribute("frameborder", "0");
            astroVideo.setAttribute("allowfullscreen", '');

            // Append video to the figure element
            astroFigure.appendChild(astroVideo);
        }

        // Other media type (image) > create img element
        else {
            const astroImage = document.createElement("img");

            // In case of a missing or incorrect image url > show 'no picture found' image.
            astroImage.src = images[i] ? images[i] : '../img/no-picture.png';
            astroImage.onerror = () => astroImage.src = '../img/no-picture.png';

            // Append the img to the figure element
            astroFigure.appendChild(astroImage);
        }
        
        // Append the figure to the article
        article.appendChild(astroFigure);

        // Create h2 element > Set content to title of image > Append inside article
        const astroTitle = document.createElement("h2");
        astroTitle.textContent = astronomyData[i].title ? astronomyData[i].title : "No words to describe this image..." ;
        article.appendChild(astroTitle);

        // Create p element > Set content to "Featured on:" > Append inside article
        const featuredTitle = document.createElement("p");
        featuredTitle.textContent = "Featured on:";
        article.appendChild(featuredTitle);

        // Create p element > Set content to date of image > Append inside article
        const featuredDate = document.createElement("p");
        featuredDate.textContent = astronomyData[i].date ? getDate(astronomyData[i].date) : "A day in the universe";
        article.appendChild(featuredDate);

        // Create a element > Set content to "About this photo" and href to #astronomy + date of image > Append inside article
        const infoButton = document.createElement("a");
        infoButton.textContent = "About this photo";
        infoButton.href = `#astronomy/${astronomyData[i].date}`;
        article.appendChild(infoButton);

        // Append article to astronomy container
        container.appendChild(article);
    }
}

// Rover overview section
export function renderRover(data) {
    // Set data value to local variable and select the astronomy container. 
     const rovers = data;
     const container = document.querySelector("section.rovers");
 
    // Repeat rendering for all rovers
     for (const i in rovers) {

        // Only render if the mars rover has photo data
        if (rovers[i].photos[0]) {

            // Create article and figure element
            const article = document.createElement("article");
            const roverFigure = document.createElement("figure");

            // Create img element > Set source to img_src (replace http for https) > Append image to figure element
            const roverImage = document.createElement("img");
            roverImage.src = rovers[i].photos[0].img_src ? rovers[i].photos[0].img_src.replace("http", "https") : '../img/no-picture.png';
            roverImage.onerror = () => roverImage.src = '../img/no-picture.png';
            roverFigure.appendChild(roverImage);

            // Append figure to article
            article.appendChild(roverFigure);

            // Create h2 element > Set content to rover name > Append to article
            const roverTitle = document.createElement("h2");
            roverTitle.textContent = rovers[i].photos[0].rover.name ? rovers[i].photos[0].rover.name : "Unkwnown rover";
            article.appendChild(roverTitle);

            // Create p element > Set content to image date > Append to article
            const createdDate = document.createElement("p");
            createdDate.textContent = rovers[i].photos[0].earth_date ? getDate(rovers[i].photos[0].earth_date) : "A day on Mars";
            article.appendChild(createdDate);
            
            // Create a element > Set content to "More details" and href to #rover + rover name + sol (day on Mars) > Append to article
            const infoButton = document.createElement("a");
            infoButton.textContent = "More details";
            infoButton.href = `#rover/${rovers[i].photos[0].rover.name}/${rovers[i].photos[0].sol}`;
            article.appendChild(infoButton);

            // Append article to rover container
            container.appendChild(article);
        }
    }
 }