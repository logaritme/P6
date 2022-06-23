import { photographerFactory } from '../factories/Photographer.js';
import { mediaFactory } from '../factories/Media.js';
// import { UserCardDOM } from '../templates/getUserCardDOM.js'
// import { PhotographerPageHeaderDOM } from '../templates/getPhotographerPageHeaderDOM.js'

async function getAllTheJSONDatas() {
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const allTheJSONDatas = JSON.parse(JSON.stringify(data));
  return allTheJSONDatas;
}

async function getPhotographers() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function getMedias() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const medias = JSON.parse(JSON.stringify(data.media));
  return medias;
}

/* Retourner que le photographe correspondant à l'id affiché dans l'url */
async function displayData(photographers, medias) {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );
  const TemplatePhotographer = new photographerFactory(photographer);
  TemplatePhotographer.getPhotographerPageHeaderDOM();
  // Use array.sort to sort videos and images?
  medias.forEach((media) => {
    // Plays the mediaFactory on each media encountered
    const TemplateMedia = new mediaFactory(media);
    // HINT: let mediasToAdd = '';
    TemplateMedia.getPhotosCardDOM();
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

