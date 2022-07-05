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
  // Et n'instancie donc que les medias ayant id === id
  const mediasFiltereds = medias.filter((media) => media.photographerId === id);
  let totalLikes = 0;

  mediasFiltereds.forEach((mediasFiltered) => {
    totalLikes += mediasFiltered.likes;

    // Try to increment likes on clicking on the heart ( let's see about decrement later)
    // 1. Listener or onclick on the heart elmt
    // 2. Create a function that increment +1 (or ++) and store this in the var newValue (to create)
    //    ( base value var oldValueLike (to create) is the media.likes or this._likes in the factory)
    // 3. Inject this var newValueLike using textContent in the span appropriated
    // 4. Use classList contains/add/remove "liked" class to know what to do when user is clicking on the heart
    // Try now

    /*console.log(medias.likes);
    function addLike() {
      newValueLike = oldValueLike++;
      }
      addLike();
      console.info("newValueLike:", newValueLike);*/
    // END of Try now
  });

  // Display the total numbersOfLikesInsert in the span
  let numbersOfLikesInsert = totalLikes;
  console.log(numbersOfLikesInsert);

  const TemplateLikesInsert = new mediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();

  document.querySelector('footer>div>div>span').textContent = numbersOfLikesInsert;

  // This is returning the const = mediasFiltereds;
  mediasFiltereds.forEach((mediasFiltered) => {
    // Declares variables for addLike function
    let oldValueLike = mediasFiltered.likes; // 88
    // Function called by the listener
    function addLike() {
      oldValueLike = oldValueLike +1;
      console.info('inFunctionNewValueLike:', oldValueLike);
      return oldValueLike;
    }
    const iconeHeart = document.querySelectorAll('section>a>figcaption>div>i');
    iconeHeart.forEach((clickHeart) => clickHeart.addEventListener('click', addLike));
    console.info('oldValueLike:', oldValueLike); // 88
    // Plays the mediaFactory on each media filtered
    const TemplateMedia = new mediaFactory(mediasFiltered);
    TemplateMedia.getPhotosCardDOM();

    document.querySelectorAll(`#likes-${medias.id}`).textContent = oldValueLike;
    console.info('oldValueLike:', oldValueLike); // 88
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
