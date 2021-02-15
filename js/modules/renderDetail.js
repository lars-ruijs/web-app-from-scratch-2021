import { getDate } from '/js/modules/helpers.js';

export function renderAstroDetail(data) {

    const container = document.querySelector("#detail");
    
    // Create info button (link to HD img or video url)
    const infoButton = document.createElement("a");

    if (data.media_type === "video") {
        const astroVideo = document.createElement("iframe");
        astroVideo.src = data.url ? data.url : '../img/not-found.png';
        astroVideo.setAttribute("frameborder", "0");
        astroVideo.setAttribute("allowfullscreen", '');

        // Append video to the figure element
        container.appendChild(astroVideo);

        // Set info button to 'View this video' and the href to the video url
        infoButton.textContent = "View this video";
        infoButton.href = data.url ? data.url : '';
    }

    // Other media type (image) > create img element
    else {
        const astroImg = document.createElement("img");
        astroImg.src = data.url ? data.url : '../img/not-found.png';
        container.appendChild(astroImg);

        // Set info button to "Download this photo" and href to img HD url
        infoButton.textContent = "Download this photo";
        infoButton.href = data.hdurl ? data.hdurl : '';
    }

    const astroTitle = document.createElement("h2");
    astroTitle.textContent = data.title ? data.title : "We searched te whole universe, but couldn't find this date.";
    container.appendChild(astroTitle);

    const astroDescription = document.createElement("p");
    astroDescription.textContent = data.explanation ? data.explanation : "There is no additional explanation for this. We are sorry.";
    container.appendChild(astroDescription);

    // Create p element > Set content to "Picture by:" > Append inside container
    const copyrightTitle = document.createElement("p");
    copyrightTitle.textContent = "Picture by:";
    container.appendChild(copyrightTitle);

    // Create p element > Set content to author of image > Append inside container
    const author = document.createElement("p");
    author.textContent = data.copyright ? data.copyright : "NASA";
    container.appendChild(author);

    // Create p element > Set content to "Featured on:" > Append inside container
    const featuredTitle = document.createElement("p");
    featuredTitle.textContent = "Featured on:";
    container.appendChild(featuredTitle);

    // Create p element > Set content to date of image > Append inside container
    const featuredDate = document.createElement("p");
    featuredDate.textContent = data.date ? getDate(data.date) : "A day in the universe";
    container.appendChild(featuredDate);

    // Append the info button as last item. 
    infoButton.setAttribute("target", "_blank");
    container.appendChild(infoButton);
}

export function renderRoverDetail(data) {
    console.log("ROVERDATA", data);
}