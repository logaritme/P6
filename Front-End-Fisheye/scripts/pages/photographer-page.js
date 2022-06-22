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
    // Implémentation sur un élément du DOM pour afficher ma card-header
    const photographersHeaderSection = document.querySelector(
      '.photographer-header'
    );
    // console.table(TemplatePhotographer);
    photographersHeaderSection.appendChild(
      TemplatePhotographer.getPhotographerPageHeaderDOM()
    );
    return photographersHeaderSection;
  });

  medias.forEach((media) => {
    // const allPhotographerNames = new photographerFactory(photographers);
    const TemplateMedia = new mediaFactory(media);
    // Implémentation sur un élément du DOM pour afficher ma card-photos
    const photosSection = document.querySelector('.photos-displaying');
    // HINT: let mediasToAdd = '';
    photosSection.appendChild(TemplateMedia.getPhotosCardDOM());
    return photosSection;
  });
}
async function init() {
  // Récupère les datas des photographers et medias
  const photographers = await getPhotographers();
  const medias = await getMedia();
  displayData(photographers, medias);
}

// Fait démarrer la série de fonctions imbriquées
init();
