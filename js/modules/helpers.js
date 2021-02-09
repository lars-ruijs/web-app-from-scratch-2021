const apiBase = "https://api.nasa.gov/";
const key = "O0U6zcZfaAGpJjFRQ8kcpVdts9kgWlh7PnjXiQaK";

export function getData(slug, query) {
    const data = fetch(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`)
                .then(response => response.json())
                .catch(error => console.error("Error with fetch", error));
    return data;
}

export function getDate(date) {
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const month = dateObject.toLocaleString("en-US", {month: "long"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    return `${month} ${day}, ${year}`;
}

export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}