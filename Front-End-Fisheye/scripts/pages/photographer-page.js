import { photographerFactory } from '../factories/Photographer.js';
import { mediaFactory } from '../factories/Media.js';
// import { UserCardDOM } from '../templates/getUserCardDOM.js'
// import { PhotographerPageHeaderDOM } from '../templates/getPhotographerPageHeaderDOM.js'

async function getAllTheJSONDatas() {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data));
}

const fullJSONContent = getAllTheJSONDatas();
// Debug
// console.info("All JSON's data:", fullJSONContent);

async function getPhotographers() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data.photographers));
}

const photographers = getPhotographers();
// Debug
// console.info("All the photographers:", photographers);

async function getMedias() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data.media));
}

const medias = getMedias();
// Debug
// console.info("All the media(pic+vid):", medias);

// Ne retourne que le photographe correspondant à l'id affiché dans l'url
async function displayData(photographers, medias) {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const photographer = photographers.find((photographer) => photographer.id === id);
  const TemplatePhotographer = new photographerFactory(photographer);
  TemplatePhotographer.getPhotographerPageHeaderDOM();
  TemplatePhotographer.getInsertPriceCardDOM();

  // Retrieves only the medias's photographer who has the id displayed in the url
  // And instances so only the medias having id === id
  const mediasFiltereds = medias.filter((media) => media.photographerId === id);
  let totalLikes = 0;

  mediasFiltereds.forEach((mediasFiltered) => {
    totalLikes += mediasFiltered.likes;
  });
  // Display the total numbersOfLikesInsert in the span
  let numbersOfLikesInsert = totalLikes;
  const TemplateLikesInsert = new mediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();
  // Node DOM to set on the total number of likes in the insert
  document.querySelector('footer>div>div>span').textContent = numbersOfLikesInsert;

  // This is returning the const = mediasFiltereds;
  mediasFiltereds.forEach((mediasFiltered) => {
    // QUESTION MENTOR: Why I can't inject this let oldValueLike using textContent in the span appropriated ?
    // Next step-> Have to use classList contains/add/remove "liked" class to know what to do when user is clicking on the heart
    // Plays the mediaFactory on each media filtered
    const TemplateMedia = new mediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
    // Debug
    // console.info('NodeListSpan(afterInjection):', spanNumber);
  });
}

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  const allTheJSONDatas = await getAllTheJSONDatas();
  displayData(photographers, medias, allTheJSONDatas);
}

// Starts the series of nested functions
init();



// Listener on click on the heart plays function addLike
// const iconeHeart = document.querySelectorAll('section>a>figcaption>div>i');
// iconeHeart.forEach((clickHeart) => clickHeart.addEventListener('click', addLike));
