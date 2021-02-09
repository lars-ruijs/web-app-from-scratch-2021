// RANDOM ASTRONOMY PICTURES (4)
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=4

// LATEST PICTURES PER ROVER
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY

// FILTER PER SOL
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

// INFO PER ROVER (launch date, arrival, status, max-sol, max-date and camera's)
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY

import { getData } from '/js/modules/helpers.js';
import handleRouting from '/js/modules/routing.js';

const astronomyBase = "planetary/apod";
const roverBase = "mars-photos/api/v1/rovers/";
const rovers = ['curiosity', 'opportunity', 'spirit'];

async function init() {
    const astronomyData = await getData(astronomyBase, "count=6");
    const random = Math.floor(Math.random() * 2100);
    const roverData = [];
    rovers.forEach(rover => {
        const data = getData(`${roverBase+rover}/photos`, `sol=${random}`);
        roverData.push(data);
    });
    const dataObject = {rover: await Promise.all(roverData), astronomy: astronomyData}; 
    
    handleRouting(dataObject);
}

init();