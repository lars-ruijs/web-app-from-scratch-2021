export function renderAstroDetail(data) {
    console.log(data);

    // const current = data.filter(element => element.date == date);
    // console.log(current);

    const container = document.querySelector("#detail");

    const astroImg = document.createElement("img");
    astroImg.src = data.url ? data.url : '../img/no-picture.png';
    container.appendChild(astroImg);

    const astroTitle = document.createElement("h2");
    astroTitle.textContent = data.title ? data.title : "This date was not found";
    container.appendChild(astroTitle);

    const astroDescription = document.createElement("p");
    astroDescription.textContent = data.explanation ? data.explanation : "No additional explanation for this photo.";
    container.appendChild(astroDescription);
}

export function renderRoverDetail(data) {
    console.log("ROVERDATA", data);
}