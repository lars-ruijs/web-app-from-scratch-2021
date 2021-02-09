import { renderAstronomy, renderRover} from '/js/modules/renderOverview.js';
import { renderAstroDetail, renderRoverDetail} from '/js/modules/renderDetail.js';

export default async function handleRouting(data) {
    const overview = document.querySelector("#overview");

    routie({
        '': () => {
            if (overview.classList.contains("hide")) {
                overview.classList.remove("hide");
            }

            else {
                renderAstronomy(data.astronomy);
                renderRover(data.rover);
            }
        },
        'astronomy/:date': (date) => {
            overview.classList.add("hide");
            renderAstroDetail(data.astronomy, date);
        },
        'rover/:name/:sol': (name, sol) => {
            overview.classList.add("hide");
            renderRoverDetail(data.rover, sol);
        }
      });
}