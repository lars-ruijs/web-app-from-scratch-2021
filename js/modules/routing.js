import { getData } from '/js/modules/helpers.js';
import { setItem, parseItem } from '/js/modules/data.js';
import { renderAstronomy, renderRover} from '/js/modules/renderOverview.js';
import { renderAstroDetail, renderRoverDetail} from '/js/modules/renderDetail.js';
import { removeAllChildNodes, randomNum } from '/js/modules/helpers.js';


export default async function handleRouting() {
    const overview = document.querySelector("#overview");
    const detail = document.querySelector("#detail");
    
    const astronomyBase = "planetary/apod";
    const roverBase = "mars-photos/api/v1/rovers/";
    const rovers = ['Curiosity', 'Opportunity', 'Spirit'];

    routie({
        '': async () => {

            removeAllChildNodes(detail);

            const overviewItems = document.querySelectorAll("#overview article");

            if (overviewItems.length > 0) {
                overview.classList.remove("hide");
            }

            else {
                overview.classList.remove("hide");
                const astronomyData = await getData(astronomyBase, "count=6");
                const roverData = [];
                rovers.forEach(rover => {
                    const data = getData(`${roverBase+rover}/photos`, `sol=${randomNum()}`);
                    roverData.push(data);
                });

                const dataObject = {rover: await Promise.all(roverData), astronomy: astronomyData}; 
                
                setItem("rover", dataObject.rover);
                setItem("astronomy", dataObject.astronomy);

                renderAstronomy(dataObject.astronomy);
                renderRover(dataObject.rover);
            }
        },
        'astronomy/:date': async (date) => {
            removeAllChildNodes(detail);
            overview.classList.add("hide");

            const localData = localStorage.astronomy ? parseItem("astronomy") : [];
            const filteredData = localData.filter(element => element.date == date);

            if (filteredData.length > 0) {
                console.log("DATA in Local Storage");
                renderAstroDetail(filteredData[0]);
            }

            else {
                console.log("DATA not in Local Storage");
                const astronomyData = await getData(astronomyBase, `date=${date}`);
                renderAstroDetail(astronomyData);
            }
        },
        'rover/:name/:sol': async (name, sol) => {
            removeAllChildNodes(detail);
            overview.classList.add("hide");

            const localData = localStorage.rover ? parseItem("rover") : [];
            const filteredData = [];

            localData.forEach(rover => {
               const filtered = rover.photos.filter(element => element.rover.name == name && element.sol == sol);
               if (filtered.length > 0){
                filteredData.push(filtered); 
               }
            });

            if (filteredData.length > 0) {
                console.log("DATA in Local Storage");
            }

            else {
                console.log("DATA not in Local Storage");
                const roverData = await getData(`${roverBase+name}/photos`, `sol=${sol}`);
                renderRoverDetail(roverData);
            }
        }
      });
}
