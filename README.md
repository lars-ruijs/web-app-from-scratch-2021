# Web App From Scratch

In this course we will learn how to create a single page web application without the use of frameworks or unnecessary libraries. So with vanilla HTML, CSS and JavaScript. Data is loaded from your own chosen external API and then displayed in the interface.

## Link to live preview

My first version is available live [here](https://pictures-from-space.netlify.app/).

## Concept idea

For my concept, I want to use data from the NASA API. Below I have put down a sketch and a digital sketch as an idea of what data I want to show and how the interaction will work in general. Keep in mind that this is still purely a concept and my current version is nowhere near it.

<img width="50%" alt="schets van concept" src="https://user-images.githubusercontent.com/60745347/107011834-7e80eb00-6798-11eb-96db-6ced7cfd4d46.JPG" />

![image](https://user-images.githubusercontent.com/60745347/107009754-bfc3cb80-6795-11eb-8a85-6db245c938f6.png)

## Data

The data I plan to use for my concept comes from NASA. In doing so, I am using two APIs from NASA. The first API contains data from the "Astronomy Picture of the Day" website. The second API contains data from "Mars Rover Photos". Below I have posted an overview of the data contained in these APIs:

**From the "Astronomy Picture of the Day" dataset:**

- `copyright`: information about the person or organization that has a copyright on this image (if applicable), example output: `"Eddie Guscott"`
- `date`: the date the picture was featured as Astronomy Picture of the Day (formatted as YYYY-MM-DD), example output: `"2004-05-11"`
- `explanation`: an explanation about the picture, example output: `"M13 is one of the most prominent..."`
- `hdurl`: link to the HD version of the image, example output:`"https://apod.nasa.gov/apod/image/0405/m13_guscott_big.jpg"`
- `title`: title of the image., example output: `"M13: The Great Globular Cluster in Hercules"`
- `url`: link to the image (lower quality version), example output:`"https://apod.nasa.gov/apod/image/0405/m13_guscott.jpg"`

**From the "latest Mars Rover Photos" dataset:**

- `img_src`: link to the image taken by the Mars Rover, example output: `"https://mars.nasa.gov/msl-raw/FRB_665678231EDR_F341M_.JPG"`
- `earth_date`: the date the picture was taken, based on earth dates (formatted as YYYY-MM-DD), example output: `"2004-05-11"`
- `camera`: an object with information about which rover camera took the picture, example output: `{full_name: "Front Hazard Avoidance Camera", name: "FHAZ"}`
- `rover`: an object with information about the rover that took the picture, example output:`{landing_date: "2012-08-06", launch_date: "2011-11-26", name: "Curiosity", status: "active"}`

## How to install

Comming soon

## License

This repository is licensed as MIT • ©️ 2021 Lars Ruijs

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
