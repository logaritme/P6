import { PhotographerFactory } from '../factories/Photographer.js';
import { MediaFactory } from '../factories/Media.js';
import { LightBoxFactory } from '../factories/LightBox.js';
import { injectionFirstMediaLightBox } from '../utils/injectionFirstMediaLightBox.js';
// import { addLike } from '../utils/addLike.js';
// import { openLightBox } from '../utils/lightBox.js';
// import { closeLightBox } from '../utils/lightBox.js';

// import { UserCardDOM } from '../templates/setUserCardDOM.js'
// import { PhotographerPageHeaderDOM } from '../templates/setPhotographerPageHeaderDOM.js'

// FETCHS //
////////////

async function getAllTheJSONDatas() {
  // Stockera les données dans data dès leur arrivée suite au fetch
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

// This let MUST have to be available globally
let mediasFiltereds;

// DROP-DOWN //
///////////////

// Declares variables of DOM
const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');
const optionsList = document.querySelectorAll('.option');
const optionDate = document.querySelector('.label-date');
const optionDateId = document.getElementsByClassName('label-date');
const optionTitre = document.querySelector('.label-titre');
const optionTitreId = document.getElementsByClassName('label-titre');
const chevronContainer = document.querySelector('.icon-chevron-container');
const iconeSort = document.querySelector('.fas.fa-angle-down');
const labelPopularite = document.querySelector('.label-popularite');
const optionPopulariteId = document.getElementsByClassName('label-popularite');

// DROP-DOWN // ==> 3 SORTING: functions declared to be call by (2) listeners
///////////////
// These lets MUST have to be available globally
let mediasSortedLikes;
let mediasSortedDate;
let mediasSortedTitle;

function sortedLike() {
  mediasSortedLikes = mediasFiltereds.sort(function (a, b) {
    return b.likes - a.likes;
  });
  console.log(mediasSortedLikes);
}

function sortedDate() {
  mediasSortedDate = mediasFiltereds.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  console.log(mediasSortedDate);
}

function sortedAZ() {
  mediasSortedTitle = mediasFiltereds.sort((a, b) => a.title.localeCompare(b.title, 'fr', { ignorePunctuation: true }));
  console.log(mediasSortedTitle);
}

// Think about the option of close it clicking anywhere
// Opens/Closes the dropdown and reverse the chevron
chevronContainer.addEventListener('click', function buttonUpdated(evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  console.log('Ça ouvre/ferme le dropdown!!!');
});

// Set variables to get the current value text in the DOM
let popValue = optionPopulariteId[0].innerText;

optionDate.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionDateId[0].innerText;
  optionDate.innerHTML = popValue;
  popValue = optionPopulariteId[0].innerText;
});

optionTitre.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionTitreId[0].innerText;
  optionTitre.innerHTML = popValue;
  popValue = optionPopulariteId[0].innerText;
});

labelPopularite.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
});

console.log('Environ 25% du code parcouru!');

labelPopularite.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (popValue === 'Popularité') {
    console.log('sortedLike()');
    sortedLike();
  } else if (popValue === 'Date') {
    console.log('sortedDate()');
    sortedDate();
  } else if (popValue === 'Titre') {
    console.log('sortedAZ()');
    sortedAZ();
  } else console.error('Text inserted: Error');
});

optionsList.forEach((obj) => {
  obj.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (popValue === 'Popularité') {
      console.log('sortedLike()');
      sortedLike();
    } else if (popValue === 'Date') {
      console.log('sortedDate()');
      sortedDate();
    } else if (popValue === 'Titre') {
      console.log('sortedAZ()');
      sortedAZ();
    } else console.error('Text inserted: Error');
  });
});

// Returns only the photographer matching to the id displayed in the url
export function displayData(photographers, medias) {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const photographer = photographers.find((photographer) => photographer.id === id);
  const TemplatePhotographer = new PhotographerFactory(photographer);
  TemplatePhotographer.setPhotographerPageHeaderDOM();
  TemplatePhotographer.setInsertPriceCardDOM();

  // Retrieves only the medias's photographer who has the id displayed in the url
  // and instances so only the medias having id === id
  mediasFiltereds = medias.filter((media) => media.photographerId === id);
  // Initialization var to 0
  let totalLikes = 0;
  // Add to totalLikes var each media.like corresponding to one photographer
  mediasFiltereds.forEach((mediasFiltered) => {
    totalLikes += mediasFiltered.likes;
  });
  // Display the total numbersOfLikesInsert in a new var
  let numbersOfLikesInsert = totalLikes;
  // Uses the MediaFactory to generate the insert's DOM
  const TemplateLikesInsert = new MediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();
  // Node DOM to set on the total number of likes in the insert
  document.querySelector('footer>div>div>span').textContent = numbersOfLikesInsert;

  // This is returning the const = mediasFiltereds;
  // for each mediasFiltered create photo's DOM
  mediasFiltereds.forEach((mediasFiltered) => {
    const TemplateMedia = new MediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
  });
  // This is returning the const = mediasFiltereds;
  // FOR EACH ( ce n'est pas ce qui est demandé, le pb viens de là?)
  // mediasFiltered it creates a lightbox DOM
  mediasFiltereds.forEach((mediasFiltered) => {
    const TemplateMedia = new LightBoxFactory(mediasFiltered, medias);
    TemplateMedia.getLightBoxImgDOM();
  });
  return mediasFiltereds;
}

// const functionResult = displayData(photographers, medias);
// console.log(functionResult);

// lightBox.js file exported here manually

// import { mediasFiltereds } from '../pages/photographer-page.js';
// import { displayData } from '../pages/photographer-page.js';
// import { LightBoxFactory } from '../factories/LightBox.js';
// import { medias } from '../pages/photographer-page.js';
// import { MediaFactory } from '../factories/Media.js';

// LIGHTBOX //
//////////////

// Declares variables of DOM

// Opens & Closes
const modalLightBox = document.querySelector('#LightBox_modal');
const mediaLinks = document.querySelectorAll('.photos-displaying section a');
const closeModalLightBox = document.querySelector('.close-lightbox');
// Retrieves: The div containing parent of img/video of lightbox + Parent of img/video + The img/video itself;
const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
const parentimgInLightBox = document.querySelector('.flex-center.as-img');
const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');

console.log('Environ 50% du code parcouru!');

// Opens the LightBox and activates all the others functions related to the lightBox
function openLightBox() {
  // Create an array empty that will take the value of:
  // - medias not sorted (original display on the landing page of a photographer)
  // - or medias sorted ( sorted by the "select")
  // The let mediasInLightBoxes will be so an array of all the ids of medias matching to a photographer
  let mediasInLightBoxes = []; /* or let mediasInLightBoxes; */
  if (mediasFiltereds.length > 0) {
    /* <-Change here to mediasSorteds when the "select" will be done*/

    mediasInLightBoxes = mediasFiltereds; /* <-Change here to mediasSorteds when the "select" will be done */
  } else {
    mediasInLightBoxes = mediasFiltereds;
  }
  // Array only with Ids of the medias
  let justMediasIdInLightBox = [];
  // justMediasIdInLightBox = Array.from(justMediasIdInLightBox);
  for (let i = 0; i < mediasInLightBoxes.length; i++) {
    justMediasIdInLightBox.push(mediasInLightBoxes[i].id);
  }

  // Récupère l'image qui à été cliquée en retriant "justMediasIdInLightBox" par l'id de l'image
  // medias.id = this._id;

  // const currentMediaShownInLightBoxs = document.querySelectorAll('body :nth-child(5) section a');
  let idInLightBox;
  let theIndex = 0;
  for (let mediaLink of mediaLinks) {
    mediaLink.addEventListener('click', (element) => {
      console.log(element.path[2].id);
      idInLightBox = element.path[2].id;
      theIndex = justMediasIdInLightBox.findIndex((element) => element == idInLightBox); /*<-pb ici*/
      console.log(justMediasIdInLightBox);
      console.log('Id récupérée:', idInLightBox);
      console.log('index selon le click sur image:', theIndex);
    });
  }
  console.log(theIndex);
  // let allIdMediasFiltereds = [];
  // for (let i = 0; i < mediasFiltereds.length; i++) {
  //   allIdMediasFiltereds = [allIdMediasFiltereds + mediasFiltereds[i].id + ', '];
  //   console.log(allIdMediasFiltereds);
  // }

  // Retrieves button's click prev & next of the function: listener()
  // & it browse on the indexes

  // Retrieves the index of previous media to the left

  let newIdMediaShownInLightBox;

  function previous() {
    if (theIndex === -1) {
      console.log('error');
      nextPrevDisplayMedia();
    } else if (theIndex === 0) {
      theIndex = mediasInLightBoxes.length - 1;
      newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
      nextPrevDisplayMedia();
      console.log('Lis la ligne else if du previous:', theIndex);
      console.log('Id ("Previous"):', newIdMediaShownInLightBox);
    } else {
      theIndex--;
      newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
      nextPrevDisplayMedia();
      // const TemplateMedia = new LightBoxFactory(newIdMediaShownInLightBox);
      // TemplateMedia.getLightBoxPrevNextDOM();
      console.log('Lis la ligne else du previous:', theIndex);
      console.log('Id ("Previous"):', newIdMediaShownInLightBox);
    }
    // Integrates the media into the HTML via .src .alt .id to be displayed in the lightBox (.injectedLightBoxCont)
    // GOT IT BY IMPORT : import { injectionFirstMediaLightBox } from '../utils/injectionFirstMediaLightBox.js';
    injectionFirstMediaLightBox();
  }
  // Retrieves the index of next media to the right
  function next() {
    if (theIndex === -1) {
      console.log('error');
      nextPrevDisplayMedia();
    } else if (theIndex === mediasInLightBoxes.length - 1) {
      theIndex = 0;
      newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
      nextPrevDisplayMedia();
      console.log('Lis la ligne else if du next:', theIndex);
      console.log('Id ("Next"):', newIdMediaShownInLightBox);
    } else {
      theIndex++;
      console.log('Array:', justMediasIdInLightBox);
      newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
      console.log('Lis la ligne else du next:', theIndex);
      console.log('Id ("Next"):', newIdMediaShownInLightBox);
      nextPrevDisplayMedia();
    }
    injectionFirstMediaLightBox();
  }
  injectionFirstMediaLightBox();
  
  function nextPrevDisplayMedia() {
    console.log(newIdMediaShownInLightBox);
    const titleCurrentMediaInLightBox = mediasFiltereds.find((x) => x.id === newIdMediaShownInLightBox).title;
    const imageCurrentMediaInLightBox = mediasFiltereds.find((x) => x.id === newIdMediaShownInLightBox).image;
    const videoCurrentMediaInLightBox = mediasFiltereds.find((x) => x.id === newIdMediaShownInLightBox).video;
    const photographerIDCurrentMediaInLightBox = mediasFiltereds.find(
      (x) => x.id === newIdMediaShownInLightBox
    ).photographerId;

    const nameOfPhotographer =
      photographerIDCurrentMediaInLightBox === 243
        ? 'Mimi'
        : photographerIDCurrentMediaInLightBox === 930
        ? 'Ellie'
        : photographerIDCurrentMediaInLightBox === 82
        ? 'Tracy'
        : photographerIDCurrentMediaInLightBox === 527
        ? 'Nabeel'
        : photographerIDCurrentMediaInLightBox === 925
        ? 'Rhode'
        : photographerIDCurrentMediaInLightBox === 195
        ? 'Marcel'
        : null;

    if (!nameOfPhotographer) {
      console.error('No name found');
      return false;
    }
    const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
    const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
    // Adds the img of the clicked mediaLink
    const photoShown = modalLightBox.querySelector('.content-lightBox div figure div img');
    const videoShown = modalLightBox.querySelector('.content-lightBox div figure div video');
    const photoVideoH2 = modalLightBox.querySelector('.content-lightBox div figure figcaption h2');
    if (imageCurrentMediaInLightBox !== undefined) {
      // Image of mediaLink clicked -> modal lightBox
      photoShown.src = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${imageCurrentMediaInLightBox}`;
      photoShown.alt = titleCurrentMediaInLightBox;
      photoShown.id = newIdMediaShownInLightBox;
      // Invisibility of video
      parentvideoInLightBox.classList.add('hidden');
      parentvideoInLightBox.classList.remove('show');
      videoInLightBox.classList.add('hidden');
      videoInLightBox.classList.remove('show');
      // Visibility of image
      parentimgInLightBox.classList.remove('hidden');
      parentimgInLightBox.classList.add('show');
      imgInLightBox.classList.remove('hidden');
      imgInLightBox.classList.add('show');
    } else if (videoCurrentMediaInLightBox !== undefined) {
      // Video of mediaLink clicked -> modal lightBox
      videoShown.src = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${videoCurrentMediaInLightBox}`;
      videoShown.alt = titleCurrentMediaInLightBox;
      videoShown.id = newIdMediaShownInLightBox;
      // Invisibility of image
      parentimgInLightBox.classList.add('hidden');
      parentimgInLightBox.classList.remove('show');
      imgInLightBox.classList.add('hidden');
      imgInLightBox.classList.remove('show');
      // Visibility of video
      parentvideoInLightBox.classList.remove('hidden');
      parentvideoInLightBox.classList.add('show');
      videoInLightBox.classList.remove('hidden');
      videoInLightBox.classList.add('show');
    } else {
      parentimgInLightBox.classList.add('hidden');
      parentvideoInLightBox.classList.add('hidden');
      imgInLightBox.classList.add('hidden');
      videoInLightBox.classList.add('hidden');
    }
    // Title of image or video of mediaLinks clicked -> modal lightBox
    photoVideoH2.style.fontSize = '32px';
    photoVideoH2.style.color = 'orange';
    photoVideoH2.textContent = titleCurrentMediaInLightBox;
    // Visibility of the #LightBox_modal
    modalLightBox.classList.remove('hidden');
    modalLightBox.classList.add('show');
  }

  // Listeners for Prev & Next & KeysUp Accessibility
  document.querySelector('.previous').addEventListener('click', () => {
    previous();
  });

  document.querySelector('.next').addEventListener('click', () => {
    next();
  });
  // Accessibility
  // Switchs the 3 keysup the user can type on the keyboard
  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        previous();
        break;
      case 'ArrowRight':
        next();
        break;
      case 'Escape':
        closeLightBoxBis();
        break;
    }
    console.log(e.key);
  });
}

// Closes modal form on cross "X"
// export
closeModalLightBox.addEventListener('click', function () {
  // Clean lightBox content ( title && (image || video) )
  injectedLightBoxCont.innerHTML = '';
  // Invisibility of video
  parentvideoInLightBox.classList.remove('show');
  videoInLightBox.classList.add('hidden');
  // Invisibility of image
  parentimgInLightBox.classList.remove('show');
  imgInLightBox.classList.add('hidden');
  // Closes the lightbox a hidden class
  modalLightBox.classList.remove('show');
  modalLightBox.classList.add('hidden');
  console.log('Ça ferme la lightBox!');
});

// END: lightBox.js file exported here manually

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  const allTheJSONDatas = await getAllTheJSONDatas();
  displayData(photographers, medias, allTheJSONDatas);
  openLightBox();

  console.log('Là 100% du code est parcouru!');
}

// Starts the series of nested functions      z
init();
