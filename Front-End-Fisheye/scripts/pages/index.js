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

// Ancienne fonction displayData tenté avec map sans succès
// async function displayData(photographers) {
//   photographers
//     .map((photographer) => new PhotographerFactory(photographer))
//     .forEach((photographer) => {
//       const TemplatePhotographer = new UserCardDOM(photographer);
//       const photographersSection = document.querySelector(
//         '.photographer_section'
//       );
//       console.table(TemplatePhotographer);
//       photographersSection.appendChild(TemplatePhotographer.setUserCardDOM);
//       return photographersSection;
//     });
// }


// Au cas où je veuille obtenir tous les photographes:
// const allPhotographerNames = new PhotographerFactory(photographers);
