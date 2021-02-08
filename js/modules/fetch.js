const apiBase = "https://api.nasa.gov/";
const key = "O0U6zcZfaAGpJjFRQ8kcpVdts9kgWlh7PnjXiQaK";

export default function getData(slug, query) {
    console.log(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`);
        const data = fetch(`${apiBase}${slug}?api_key=${key}${query ? '&'+query : ''}`)
                    .then(response => response.json())
                    .catch(error => console.error("Error with fetch", error));
        return data;
}