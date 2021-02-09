export function renderAstroDetail(data, date) {
    console.log(data);

    const current = data.filter(element => element.date == date);
    console.log(current);

    const container = document.querySelector("#detail");

    const astroImg = document.createElement("img");
    astroImg.src = current[0] ? current[0].url : '../img/no-picture.png';
    container.appendChild(astroImg);

    const astroTitle = document.createElement("h2");
    astroTitle.textContent = current[0] ? current[0].title : "This date was not found";
    container.appendChild(astroTitle);

    const astroDescription = document.createElement("p");
    astroDescription.textContent = current[0]? current[0].explanation : "Searching new dates and force reloading is not supported yet!";
    container.appendChild(astroDescription);
}

export function renderRoverDetail() {
    
}