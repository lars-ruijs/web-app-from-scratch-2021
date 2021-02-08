import theData from '/js/modules/data.js';
import render from '/js/modules/render.js';

export default async function handleRouting() {

    const data = await theData();

    routie({
        '': () => {
         render(data.astronomy, data.rover);
          console.log("HALLO DEFAULT");
          console.log(data);
        },
        'astronomy/:date': (date) => {
        render(data.astronomy, data.rover, date);
          console.log(date);
        }
      });
}