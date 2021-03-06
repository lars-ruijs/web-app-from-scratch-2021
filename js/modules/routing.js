import { getData, removeAllChildNodes, randomNum, loader} from "/js/modules/helpers.js";
import { setItem, parseItem } from "/js/modules/localStorage.js";
import { renderAstronomy, renderRover } from "/js/modules/renderOverview.js";
import { renderAstroDetail, renderRoverDetail} from "/js/modules/renderDetail.js";

export default async function handleRouting() {

  // URL bases and Rover names (used for calling getData function).
  const astronomyBase = "planetary/apod";
  const roverBase = "mars-photos/api/v1/rovers/";
  const rovers = ["Perseverance", "Curiosity", "Opportunity", "Spirit"];

  // Select the overview and detail container
  const overview = document.querySelector("#overview");
  const detail = document.querySelector("#detail");

  routie({

    // Home (overview) page
    "": async () => {

      // Remove all elements inside the detail section. Remove the hide class (if present).
      removeAllChildNodes(detail);
      overview.classList.remove("hide");

      // Select all articles inside the overview section (if any)
      const overviewItems = document.querySelectorAll("#overview article");

      // If there are no articles in the overview section > fetch and render data.
      if (overviewItems.length <= 0) {
        // Add loading animation
        loader();

        // Fetch 6 astronomy pictures
        const astronomyData = await getData(astronomyBase, "count=6");

        // Fetch the max sol (max date) for each rover > fetch photo data for random sol > push to array
        const roverData = [];

        for (const rover of rovers) {
          const roverInfo = await getData(`${roverBase + rover}`);
          const maxSol = roverInfo.rover.max_sol;
          const data = await getData(
            `${roverBase + rover}/photos`,
            `sol=${randomNum(maxSol)}`
          );

          // If no pictures for this sol > fetch for sol 1
          if(data.photos.length == 0) {
            const defaultData = await getData(
              `${roverBase + rover}/photos`,`sol=1`
            );
            roverData.push(defaultData);
          }

          // Else, push data to array.
          else {
            roverData.push(data);
          }
        }

        // Store the fetched data inside LocalStorage.
        setItem("astronomy", astronomyData);
        setItem("rover", roverData);

        // Render the overview sections.
        renderAstronomy(astronomyData);
        renderRover(roverData);
      }
    },

    // Astronomy (detail) page
    "astronomy/:date": async (date) => {

      // Add loading animation
      loader();

      // Remove existing elements inside the detail section (if any) and add "hide" class to overview section.
      removeAllChildNodes(detail);
      overview.classList.add("hide");

      // Check if there is astronomy data in local storage. If so, filter on requested date.
      const localData = localStorage.astronomy ? parseItem("astronomy") : [];
      const filteredData = localData.filter((element) => element.date === date);

      // If data for requested date is available from local storage > render detailpage without re-fetching.
      if (filteredData.length > 0) {
        renderAstroDetail(filteredData[0]);
      }

      // If data for the requested date is not available from local storage > fetch data and render detailpage.
      else {
        const astronomyData = await getData(astronomyBase, `date=${date}`);
        renderAstroDetail(astronomyData);
      }
    },

    // Rover (detail) page
    "rover/:name/:sol": async (name, sol) => {
      
      // Add loading animation
      loader();

      // Remove existing elements inside the detail section (if any) and add "hide" class to overview section.
      removeAllChildNodes(detail);
      overview.classList.add("hide");

      // Check if there is rover data in local storage.
      const localData = localStorage.rover ? parseItem("rover") : [];
      const filteredData = [];

      // Filter the local storage data on the requested rover and sol (a Mars day). Push it to the filteredData array.
      localData.forEach((rover) => {
        const filtered = rover.photos.filter(
          (element) => element.rover.name == name && element.sol == sol
        );
        if (filtered.length > 0) {
          filteredData.push(...filtered);
        }
      });

      // If data for requested rover and sol is available from local storage > render detailpage without re-fetching.
      if (filteredData.length > 0) {
        renderRoverDetail(filteredData);
      }

      // If data for the requested rover and sol is not available from local storage > fetch data and render detailpage.
      else {
        const roverData = await getData(
          `${roverBase + name}/photos`,
          `sol=${sol}`
        );
        renderRoverDetail(roverData.photos);
      }
    },
  });
}
