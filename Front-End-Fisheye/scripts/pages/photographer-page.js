import { photographerFactory } from '../factories/Photographer.js';
import { mediaFactory } from '../factories/Media.js';
// import { UserCardDOM } from '../templates/getUserCardDOM.js'
// import { PhotographerPageHeaderDOM } from '../templates/getPhotographerPageHeaderDOM.js'

async function getAllTheJSONDatas() {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const allTheJSONDatas = JSON.parse(JSON.stringify(data));
  return allTheJSONDatas;
}

async function getPhotographers() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function getMedias() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const medias = JSON.parse(JSON.stringify(data.media));
  return medias;
}

// Ne retourne que le photographe correspondant à l'id affiché dans l'url
async function displayData(photographers, medias) {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const photographer = photographers.find((photographer) => photographer.id === id);
  const TemplatePhotographer = new photographerFactory(photographer);
  TemplatePhotographer.getPhotographerPageHeaderDOM();
  TemplatePhotographer.getInsertPriceCardDOM();

  // Cela ne retourne que les medias du photographe ayant l'id affiché dans l'url
  // Et n'instancie donc que les medias ayant id = id
  const mediasFiltereds = medias.filter((media) => media.photographerId === id);
  let totalLikes = 0;
  mediasFiltereds.forEach((mediasFiltered) => {
    totalLikes += mediasFiltered.likes;
  });
  // Display the total numbersOfLikesInsert in the span
  let numbersOfLikesInsert = totalLikes;
  console.log(numbersOfLikesInsert);


  const TemplateLikesInsert = new mediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();

  const displayTotalLikesInsert = document.querySelector('footer>div>div>span');
  displayTotalLikesInsert.textContent = numbersOfLikesInsert;

  // ce qui retournera la const = mediasFiltereds;
  mediasFiltereds.forEach((mediasFiltered) => {
    // Plays the mediaFactory on each media filtered

    const TemplateMedia = new mediaFactory(mediasFiltered);
    TemplateMedia.getPhotosCardDOM();
    // const TemplateLikesMedia = new mediaFactory(mediasFiltered);
    // TemplateLikesMedia.getInsertLikesCardDOM();
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
