// Turn data into a string format and save it to Local Storage
export function setItem(key, data) {
    localStorage[key] = JSON.stringify(data);
}

// Get data from local storage and parse it into a JSON object
export function parseItem(key) {
    const parsedData = JSON.parse(localStorage.getItem(key));
    return parsedData;
}
