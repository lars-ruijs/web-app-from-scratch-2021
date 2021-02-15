export function parseItem(key) {
    const parsedData = JSON.parse(localStorage.getItem(key));
    return parsedData;
}

export function setItem(key, data) {
    localStorage[key] = JSON.stringify(data);
}