import { getDate, removeLoader } from '/js/modules/helpers.js';

export function renderAstroDetail(data) {
    // Scroll to top and remove loader
    window.scrollTo(0, 0);
    removeLoader(); 

    // Select detailpage container
    const container = document.querySelector("#detail");
    
    // Create info button (link to HD img or video url)
    const infoButton = document.createElement("a");

    // If media type is video > create iframe element
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

        // Set info button to "Open this photo" and href to img HD url
        infoButton.textContent = "Open this photo";
        infoButton.href = data.hdurl ? data.hdurl : '';
    }

    // Title of image
    const astroTitle = document.createElement("h2");
    astroTitle.textContent = data.title ? data.title : "We searched the whole universe, but couldn't find your requested date.";
    container.appendChild(astroTitle);

    // Description of image
    const astroDescription = document.createElement("p");
    astroDescription.textContent = data.explanation ? data.explanation : "There is no additional explanation for this image. We are sorry.";
    
    // If API gives error message, show error. 
    if(data.msg) {
        astroDescription.textContent = data.msg;
    }

    container.appendChild(astroDescription);

    // Only render this if the API doesn't give an error code. 
    if(!data.code){
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
}

// Render rover detailpage
export function renderRoverDetail(data) {
    // Scroll to top and remove loader
    window.scrollTo(0, 0);
    removeLoader(); 

    // Select detailpage container
    const container = document.querySelector("#detail");

    // If no data, add "Not found image" and error message
    if(!data || data.length == 0) {
        const notFoundImg = document.createElement("img");
        notFoundImg.src = '../img/not-found.png';
        container.appendChild(notFoundImg);

        const notFoundTitle = document.createElement("h2");
        notFoundTitle.textContent = "We searched te whole universe, but couldn't find this rover.";
        container.appendChild(notFoundTitle);

        const notFoundText = document.createElement("p");
        notFoundText.textContent = "The rover and/or mars sol you requested are not found. Try again with a different sol or check the spelling of the rover.";
        container.appendChild(notFoundText);
    }

    // If there is data > render the detail page.
    else {
        // Name of rover (e.g. "Spirit")
        const roverName = document.createElement("h2");
        roverName.textContent = data ? data[0].rover.name : "Unknown Rover.";
        container.appendChild(roverName);

        // Status of rover (active or complete)
        const roverStatus = document.createElement("p");
        roverStatus.textContent = data ? data[0].rover.status : "Unknown Status";
        roverStatus.classList.add(data ? data[0].rover.status : "404");
        container.appendChild(roverStatus);

        // Grid wrapper for launch and landing info
        const roverInfoBox = document.createElement("div");
        roverInfoBox.classList.add("roverlaunchland");

        const rocketImg = document.createElement("img");
        rocketImg.src = "../img/rocket.svg";
        roverInfoBox.appendChild(rocketImg);

        // Wrapper for launched data
        const launchedContainer = document.createElement("div");

        const launchedTitle = document.createElement("p");
        launchedTitle.textContent = "Launched on:";
        launchedContainer.appendChild(launchedTitle);

        const roverLaunched = document.createElement("p");
        roverLaunched.textContent = data ? getDate(data[0].rover.launch_date) : "A day in the universe";
        launchedContainer.appendChild(roverLaunched);

        // Append launch info to the grid wrapper
        roverInfoBox.appendChild(launchedContainer);

        const planetImg = document.createElement("img");
        planetImg.src = "../img/planet.svg";
        roverInfoBox.appendChild(planetImg);

        // Wrapper for landed data
        const landedContainer = document.createElement("div");

        const landedTitle = document.createElement("p");
        landedTitle.textContent = "Landed on:";
        landedContainer.appendChild(landedTitle);

        const roverLanded = document.createElement("p");
        roverLanded.textContent = data ? getDate(data[0].rover.landing_date) : "A day in the universe";
        landedContainer.appendChild(roverLanded);

        // Append landing info to grid wrapper
        roverInfoBox.appendChild(landedContainer);

        // Append grid wrapper to container
        container.appendChild(roverInfoBox);

        
        const photoTitle = document.createElement("h2");
        photoTitle.textContent = "Photo's:";
        container.appendChild(photoTitle);

        const photoDescription = document.createElement("p");
        photoDescription.textContent = `These picture(s) were taken on sol ${data[0].sol}, which is equal to ${getDate(data[0].earth_date)} on Earth.`;
        photoDescription.classList.add("description");
        container.appendChild(photoDescription);

        // Array with all photos
        const photos = data.map(data => data.img_src);

        // Create a grid wrapper for the photos
        const photoContainer = document.createElement("div");
        photoContainer.classList.add("photocontainer");

        // For each photo > append figure element with image and figcaption
        photos.forEach((photo, i) => {
            const roverFigure = document.createElement("figure");

            const roverImg = document.createElement("img");
            roverImg.src = photo;
            roverFigure.appendChild(roverImg);

            const roverFigCaption = document.createElement("figcaption");

            const roverCam = document.createElement("p");
            roverCam.textContent = data[i].camera ? data[i].camera.full_name : "Unknown camera";
            roverFigCaption.appendChild(roverCam);

            roverFigure.appendChild(roverFigCaption);
            photoContainer.appendChild(roverFigure);
        });

        // Add the photo grid to the container
        container.appendChild(photoContainer);
    }
}