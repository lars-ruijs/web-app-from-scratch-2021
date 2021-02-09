import { renderAstronomy, renderRover} from '/js/modules/renderOverview.js';
import { renderAstroDetail, renderRoverDetail} from '/js/modules/renderDetail.js';
import { removeAllChildNodes } from '/js/modules/helpers.js';


export default async function handleRouting(data) {
    const overview = document.querySelector("#overview");
    const detail = document.querySelector("#detail");

    routie({
        '': () => {
            removeAllChildNodes(detail);

            if (overview.classList.contains("hide")) {
                overview.classList.remove("hide");
            }

            else {
                renderAstronomy(data.astronomy);
                renderRover(data.rover);
            }
        },
        'astronomy/:date': (date) => {
            removeAllChildNodes(detail);
            overview.classList.add("hide");
            renderAstroDetail(data.astronomy, date);
        },
        'rover/:name/:sol': (name, sol) => {
            removeAllChildNodes(detail);
            overview.classList.add("hide");
            renderRoverDetail(data.rover, sol);
        }
      });
}