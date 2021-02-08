import getData from '/js/modules/fetch.js';

const astronomyBase = "planetary/apod";
const roverBase = "mars-photos/api/v1/rovers/";
const rovers = ['curiosity', 'opportunity', 'spirit'];

export default async function theData() {
    const astronomyData = await getData(astronomyBase, "count=6");
    const roverData = [];
    rovers.forEach(rover => {
        const data = getData(`${roverBase+rover}/latest_photos`);
        roverData.push(data);
    });
    const dataObject = {rover: await Promise.all(roverData), astronomy: astronomyData}; 
    return dataObject;
}