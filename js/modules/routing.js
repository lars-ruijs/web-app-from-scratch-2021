import theData from '/js/modules/data.js';
import render from '/js/modules/render.js';

export default async function handleRouting() {
    const overview = document.querySelector("#overview");
    const data = await theData();

    routie({
        '': () => {
            const articles = document.querySelectorAll("section#overview section.astronomy article");
            
            if (articles.length === 0) {
                render(data);
            }

            else if (articles.length > 0) {
                overview.classList.remove("hide");
            }
          console.log(data);
        },
        'astronomy/:date': (date) => {
            overview.classList.add("hide");
            render(data, date);
            console.log(date);
        },
        'rover/:name/:sol': (name, sol) => {
            console.log(name, sol);
        }
      });
}