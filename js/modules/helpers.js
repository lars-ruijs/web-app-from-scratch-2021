// Constant API settings (API base URL and API key)
const apiBase = "https://api.nasa.gov/";
const key = "O0U6zcZfaAGpJjFRQ8kcpVdts9kgWlh7PnjXiQaK";

// Fetch API data (based on a slug and optional query)
export function getData(slug, query) {
  const data = fetch(
    `${apiBase}${slug}?api_key=${key}${query ? "&" + query : ""}`
  )
    .then((response) => response.json())
    .catch((error) => console.error("Error with fetch", error));
  return data;
}

// Function used to return a human readable date (in US format)
// Example input: "2020-11-06". Example output: "November 6, 2020"
export function getDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.toLocaleString("en-US", { day: "numeric" });
  const month = dateObject.toLocaleString("en-US", { month: "long" });
  const year = dateObject.toLocaleString("en-US", { year: "numeric" });
  return `${month} ${day}, ${year}`;
}

// Remove child nodes for a given parent node
// Code adapted from: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Generate a random number between 0 and a given maximum value
export function randomNum(max) {
  const random = Math.floor(Math.random() * +max);
  return random;
}

// Create a loading animation and append it to the top of main.
export function loader() {
  const container = document.querySelector("main");
  const loadingImg = document.createElement("img");
  loadingImg.src = "../img/space-loading.gif";
  loadingImg.alt = "content is being loaded";
  loadingImg.classList.add("loader");
  container.prepend(loadingImg);
}

// Remove the loading animation.
export function removeLoader() {
  const loader = document.querySelector(".loader");
  loader.remove();
}
