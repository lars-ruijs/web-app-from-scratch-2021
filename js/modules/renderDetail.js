import { getDate, removeLoader } from '/js/modules/helpers.js';

export function renderAstroDetail(data) {
    window.scrollTo(0, 0);
    removeLoader(); 

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

    const astroTitle = document.createElement("h2");
    astroTitle.textContent = data.title ? data.title : "We searched the whole universe, but couldn't find your requested date.";
    container.appendChild(astroTitle);

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

export function renderRoverDetail(data) {
    window.scrollTo(0, 0);
    removeLoader(); 
    const container = document.querySelector("#detail");

    // If no data, add "Not found image"
    if(!data) {
        const notFoundImg = document.createElement("img");
        notFoundImg.src = '../img/not-found.png';
        container.appendChild(notFoundImg);
    }

    const roverName = document.createElement("h2");
    roverName.textContent = data ? data[0].rover.name : "We searched te whole universe, but couldn't find this rover.";
    container.appendChild(roverName);

    const roverStatus = document.createElement("p");
    roverStatus.textContent = data ? data[0].rover.status : "The rover and/or mars sol you requested are not found. Try again with a different sol or check the spelling of the rover.";
    roverStatus.classList.add(data ? data[0].rover.status : "404");
    container.appendChild(roverStatus);

    if(data) {
        const roverInfoBox = document.createElement("div");
        roverInfoBox.classList.add("roverlaunchland");

        const rocketImg = document.createElement("img");
        rocketImg.src = "../img/rocket.svg";
        roverInfoBox.appendChild(rocketImg);

        const launchedContainer = document.createElement("div");

        const launchedTitle = document.createElement("p");
        launchedTitle.textContent = "Launched on:";
        launchedContainer.appendChild(launchedTitle);

        const roverLaunched = document.createElement("p");
        roverLaunched.textContent = data ? getDate(data[0].rover.launch_date) : "404";
        launchedContainer.appendChild(roverLaunched);

        roverInfoBox.appendChild(launchedContainer);

        const planetImg = document.createElement("img");
        planetImg.src = "../img/planet.svg";
        roverInfoBox.appendChild(planetImg);

        const landedContainer = document.createElement("div");

        const landedTitle = document.createElement("p");
        landedTitle.textContent = "Landed on:";
        landedContainer.appendChild(landedTitle);

        const roverLanded = document.createElement("p");
        roverLanded.textContent = data ? getDate(data[0].rover.landing_date) : "404";
        landedContainer.appendChild(roverLanded);

        roverInfoBox.appendChild(landedContainer);

        container.appendChild(roverInfoBox);

        const photoTitle = document.createElement("h2");
        photoTitle.textContent = "Photo's:";
        container.appendChild(photoTitle);

        const photoDescription = document.createElement("p");
        photoDescription.textContent = `These picture(s) were taken on sol ${data[0].sol}, which is equal to ${getDate(data[0].earth_date)} on Earth.`;
        photoDescription.classList.add("description");
        container.appendChild(photoDescription);

        const photos = data.map(data => data.img_src);

        const photoContainer = document.createElement("div");
        photoContainer.classList.add("photocontainer");

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

        container.appendChild(photoContainer);

    }
}