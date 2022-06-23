import { photographerFactory } from '../factories/Photographer.js';
import { mediaFactory } from '../factories/Media.js';
// import { UserCardDOM } from '../templates/getUserCardDOM.js'
// import { PhotographerPageHeaderDOM } from '../templates/getPhotographerPageHeaderDOM.js'

async function getPhotographers() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function getMedia() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const medias = JSON.parse(JSON.stringify(data.media));
  return medias;
}

async function displayData(photographers, medias) {
  // Use array.sort to sort videos and images?
  photographers.forEach((photographer) => {
    const TemplatePhotographer = new photographerFactory(photographer);
    TemplatePhotographer.getPhotographerPageHeaderDOM();
  });

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
  const medias = await getMedia();
  displayData(photographers, medias);
}

// Starts the series of nested functions
init();

// Pour obtenir tous les photographes:
// const allPhotographerNames = new photographerFactory(photographers);
