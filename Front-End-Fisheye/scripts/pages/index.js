import { PhotographerFactory } from '../factories/Photographer.js';

async function getPhotographers() {
  // Stockera les données dans data dès leur arrivée suite au fetch
  const data = await fetch('./data/photographers.json').then((response) =>
    response.json()
  );
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const TemplatePhotographer = new PhotographerFactory(photographer);
    TemplatePhotographer.setUserCardDOM();
  });
}

async function init() {
  // Stockera les données dans photographers
  // dès leur arrivée suite au fetch contenu dans la fonction getPhotographers
  const photographers = await getPhotographers();
  displayData(photographers);
}

// Fait démarrer la série de fonctions imbriquées
init();


