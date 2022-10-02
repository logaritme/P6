// Manages index.html page

import { PhotographersFactory } from '../factories/Photographers.js';

async function getPhotographers() {
  // Will store the datas in data just when they are retrieved from the fetch
  const data = await fetch('../Front-End-Fisheye/data/photographers.json')
    .then((response) => response.json())
    .catch((err) => alert(err, ': Failed to fetch data'));
  const photographers = JSON.parse(JSON.stringify(data.photographers));
  return photographers;
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const TemplatePhotographer = new PhotographersFactory(photographer);
    TemplatePhotographer.setUserCardDOM();
  });
}

async function init() {
  // Will store the datas in photographers just when
  // they are retrieved from the fetch contained in the function getPhotographers
  const photographers = await getPhotographers();
  displayData(photographers);
}

// Starts the series of nested functions
init();
