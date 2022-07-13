import { photographerFactory } from '../factories/Photographer.js';
import { mediaFactory } from '../factories/Media.js';
import { lightBox } from '../factories/LightBox.js';
import { openLightBox } from '../utils/lightBox.js';
import { closeLightBox } from '../utils/lightBox.js';

// import { closeLightBox } from '../utils/lightBox.js';
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

export const medias = getMedias();
// Debug
// console.info("All the media(pic+vid):", medias);

// Ne retourne que le photographe correspondant à l'id affiché dans l'url
function displayData(photographers, medias) {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const photographer = photographers.find((photographer) => photographer.id === id);
  const TemplatePhotographer = new photographerFactory(photographer);
  TemplatePhotographer.getPhotographerPageHeaderDOM();
  TemplatePhotographer.getInsertPriceCardDOM();

  // Retrieves only the medias's photographer who has the id displayed in the url
  // And instances so only the medias having id === id
  const mediasFiltereds = medias.filter((media) => media.photographerId === id);
  // Initialization var to 0
  let totalLikes = 0;
  // Add to totalLikes var each media.like corresponding to one photographer
  mediasFiltereds.forEach((mediasFiltered) => {
    totalLikes += mediasFiltered.likes;
  });
  // Display the total numbersOfLikesInsert in a new var
  let numbersOfLikesInsert = totalLikes;
  // Uses the mediaFactory to generate the insert's DOM
  const TemplateLikesInsert = new mediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();
  // Node DOM to set on the total number of likes in the insert
  document.querySelector('footer>div>div>span').textContent = numbersOfLikesInsert;

  // This is returning the const = mediasFiltereds;
  // for each mediasFiltered create photo's DOM
  mediasFiltereds.forEach((mediasFiltered) => {
    const TemplateMedia = new mediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
  });
  // This is returning the const = mediasFiltereds;
  // FOR EACH ( ce n'est pas ce qui est demandé, le pb viens de là?)
  // mediasFiltered it creates a lightbox DOM
  mediasFiltereds.forEach((mediasFiltered) => {
    const TemplateMedia = new lightBox(mediasFiltered, medias);
    TemplateMedia.getLightBoxImgDOM();
    // I have to hidde previous photo(s)/video(s)
    // and also I have to hidde the next photo(s)/video(s)
    // on the visible part of the lightBox opened.
    // How to do?
  });
}

// Displays lightbox by instancing the right function dedenping on image or video
// function displayLightBox(medias) {
// if (isThereImage !== undefined)
// {
// const TemplateLightBox = new lightBox(medias);
// TemplateLightBox.getLightBoxImgDOM();
// }
// else {
//   const TemplateLightBox = new LightBox(medias);
//   TemplateLightBox.getLightBoxVideoDOM();
// }
// }

// function closeLightBox() {}

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  const allTheJSONDatas = await getAllTheJSONDatas();
  displayData(photographers, medias, allTheJSONDatas);
  openLightBox(medias);
  closeLightBox(medias);
}

// Starts the series of nested functions
init();

// Ancien listener pour les coeurs ( pas pratique -> voie abandonnée)
// Listener on click on the heart plays function addLike
// const iconeHeart = document.querySelectorAll('section>a>figcaption>div>i');
// iconeHeart.forEach((clickHeart) => clickHeart.addEventListener('click', addLike));
