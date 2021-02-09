import getData from '/js/modules/fetch.js';

const astronomyBase = "planetary/apod";
const roverBase = "mars-photos/api/v1/rovers/";
const rovers = ['curiosity', 'opportunity', 'spirit'];

const demoData = [{copyright: "Eddie Guscott", date: "2004-05-11", explanation: "M13 is one of the most prominent and best known globular clusters.  Visible with binoculars in the constellation of Hercules, M13 is frequently one of the first objects found by curious sky gazers seeking celestials wonders beyond normal human vision.   M13 is a colossal home to over 100,000 stars, spans over 150  light years across, lies over 20,000 light years distant, and is over 12 billion years old.  At the 1974 dedication of Arecibo Observatory, a radio message about Earth was sent in the direction of M13.  The reason for the low abundance of unusual blue straggler stars in M13 is currently unknown.", hdurl: "https://apod.nasa.gov/apod/image/0405/m13_guscott_big.jpg", media_type: "image", service_version: "v1", title: "M13: The Great Globular Cluster in Hercules", url: "https://apod.nasa.gov/apod/image/0405/m13_guscott.jpg"}, {copyright: "Adam Block", date: "2005-04-06", explanation: "M7 is one of the most prominent open clusters of stars on the sky.  The cluster, dominated by bright blue stars, can be seen with the naked eye in a dark sky in the tail of the constellation of Scorpius.  M7 contains about 100 stars in total, is about 200 million years old, spans 25 light-years across, and lies about 1000 light-years away.   This color picture was taken recently at the Kitt Peak National Observatory in Arizona, USA as part of the Advanced Observers Program. The M7 star cluster has been known since ancient times, being noted by Ptolemy in the year 130 AD.  Also visible is a dark dust cloud near the bottom of the frame, and literally millions of unrelated stars towards the Galactic center.", hdurl: "https://apod.nasa.gov/apod/image/0504/m7_cook_big.jpg", media_type: "image", service_version: "v1", title: "The M7 Open Star Cluster in Scorpius", url: "https://apod.nasa.gov/apod/image/0504/m7_cook.jpg"}, {date: "2020-06-16", explanation: "Welcome to the quadranscentennial year of the Astronomy Picture of the Day.  Perhaps a source of consistency for some, APOD is still here. To help celebrate APOD's Silver Anniversary, some of APOD's TVAoTaSMD have recorded a birthday greeting and thanks to APOD's readership in today's featured video.  Many have also highlighted a few of their favorite APOD images. In collaboration with NASA through APOD, these and other volunteers help to inform the world, in most major world languages and over most major media platforms, of NASA and humanity's growing knowledge, active exploration, and inspiring visualizations of the amazing astronomical universe in which we live. APOD's founders (still alive!) would also like to offer a sincere thank you -- not only to our TVAoTaSMD -- but to APOD's readership for continued interest, support, and many gracious communications over the years.", media_type: "video", service_version: "v1", title: "APOD is 25 Years Old Today", url: "https://www.youtube.com/embed/bhJ0MotUblo"}];

const roverDemoData = [{photos: []}, {photos: [{earth_date: "2007-12-25", id: 157896, img_src: "http://mars.nasa.gov/mer/gallery/all/1/p/1392/1P251769485EFF8800P2410L7M1-BR.JPG", rover: {landing_date: "2004-01-25", launch_date: "2003-07-07", name: "Opportunity", status: "complete"}}]}, {photos: [{earth_date: "2007-12-25", id: 157896, img_src: "http://mars.nasa.gov/mer/gallery/all/1/p/1392/1P251769485EFF8800P2410L7M1-BR.JPG", rover: {landing_date: "2004-01-25", launch_date: "2003-07-07", name: "Spirit", status: "complete"}}]}];

export default async function theData() {
    const astronomyData = await getData(astronomyBase, "count=6");
    //const astronomyData = demoData;
    //const roverData = roverDemoData;
    const random = Math.floor(Math.random() * 2100);
    const roverData = [];
    rovers.forEach(rover => {
        const data = getData(`${roverBase+rover}/photos`, `sol=${random}`);
        roverData.push(data);
    });
    // console.log("RANDOM", random);
    const dataObject = {rover: await Promise.all(roverData), astronomy: astronomyData}; 
    //const dataObject = {rover: roverData, astronomy: astronomyData};
    return dataObject;
}