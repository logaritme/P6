import { PhotographerFactory } from '../factories/Photographer.js';

let focusProfileNum = 1;

async function getPhotographers() {
  // Will store the datas in data just when they are retrieved from the fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const TemplatePhotographer = new PhotographerFactory(photographer);
    TemplatePhotographer.setUserCardDOM();
    focusProfileNum++;
  });
}

async function init() {
  // Will store the datas in photographers
  // just when they are retrieved from the fetch contained in the function getPhotographers
  const photographers = await getPhotographers();
  displayData(photographers);
}

// Starts the series of nested functions
init();

export { focusProfileNum };
