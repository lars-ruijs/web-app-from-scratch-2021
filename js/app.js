// RANDOM ASTRONOMY PICTURES (4)
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=4

// LATEST PICTURES PER ROVER
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY

// FILTER PER SOL
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

// INFO PER ROVER (launch date, arrival, status, max-sol, max-date and camera's)
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY

import handleRouting from "/js/modules/routing.js";

function init() {
  handleRouting();
}

init();
