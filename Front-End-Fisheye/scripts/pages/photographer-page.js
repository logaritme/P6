import { PhotographerFactory } from '../factories/Photographer.js';
import { MediaFactory } from '../factories/Media.js';
import { LightBoxFactory } from '../factories/LightBox.js';
import { injectionFirstMediaLightBox } from '../utils/injectionFirstMediaLightBox.js';
import { theIndexBis } from '../utils/injectionFirstMediaLightBox.js';

// FETCHS //
////////////

async function getAllTheJSONDatas() {
  // Stocking the datas in "data" just when they arrive from the fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data));
}

const fullJSONContent = getAllTheJSONDatas();

async function getPhotographers() {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data.photographers));
}

const photographers = getPhotographers();

async function getMedias() {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data.media));
}

export const medias = getMedias();

// This let MUST have to be available globally
let mediasFiltereds;
// This let MUST have to be available globally
export let theIndex = Number;

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

function sortedLike(medias) {
  const mediasSortedLikes = mediasFiltereds;
  mediasSortedLikes.sort(function (a, b) {
    return b.likes - a.likes;
  });
  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';
  // For each mediasFiltered create photo's DOM
  mediasSortedLikes.forEach((mediasFiltered) => {
    const TemplateMedia = new MediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
  });
  // For each mediasFiltered it creates a lightbox DOM
  mediasSortedLikes.forEach((mediasFiltered) => {
    const TemplateMedia = new LightBoxFactory(mediasFiltered, medias);
    TemplateMedia.getLightBoxImgDOM();
  });
  return mediasSortedLikes; // I can't use my lightBox on each new sorting, HOW TO DO ?
}
// Restart the new sort by the same way as to display photos-displaying at the first time on the page

function sortedDate() {
  const mediasSortedDate = mediasFiltereds;
  mediasSortedDate.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';
  // For each mediasFiltered create photo's DOM
  mediasSortedDate.forEach((mediasFiltered) => {
    const TemplateMedia = new MediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
  });
  // For each mediasFiltered it creates a lightbox DOM
  mediasSortedDate.forEach((mediasFiltered) => {
    const TemplateMedia = new LightBoxFactory(mediasFiltered, medias);
    TemplateMedia.getLightBoxImgDOM();
  });
  return mediasSortedDate;
}

function sortedAZ() {
  const mediasSortedTitle = mediasFiltereds;
  mediasSortedTitle.sort((a, b) => a.title.localeCompare(b.title, 'fr', { ignorePunctuation: true }));
  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';
  // For each mediasFiltered create photo's DOM
  mediasSortedTitle.forEach((mediasFiltered) => {
    const TemplateMedia = new MediaFactory(mediasFiltered, medias);
    TemplateMedia.getPhotosCardDOM();
  });
  // For each mediasFiltered it creates a lightbox DOM
  mediasSortedTitle.forEach((mediasFiltered) => {
    const TemplateMedia = new LightBoxFactory(mediasFiltered, medias);
    TemplateMedia.getLightBoxImgDOM();
  });
  return mediasSortedTitle;
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
    sortedLike();
  } else if (popValue === 'Date') {
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
      sortedLike();
    } else if (popValue === 'Date') {
      sortedDate();
    } else if (popValue === 'Titre') {
      console.log('sortedAZ()');
      sortedAZ();
    } else console.error('Text inserted: Error');
  });
});
// Returns only the photographer matching to the id displayed in the url
export function displayData(photographers, medias) {
  // console.log('il rentre dans displayData');
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
  // console.log('First time mediasFiltereds:', mediasFiltereds);

  return mediasFiltereds;
}
// lightBox.js file exported here manually

// LIGHTBOX //
//////////////

// Declares variables of DOM

// Opens & Closes
const modalLightBox = document.querySelector('#LightBox_modal');
// mediaLinks to click on the picture...
export const mediaLinks = document.querySelectorAll('.dimensions-photos-grapher-page');
const closeModalLightBox = document.querySelector('.close-lightbox');
// Retrieves: The div containing parent of img/video of lightbox + Parent of img/video + The img/video itself;
const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
const parentimgInLightBox = document.querySelector('.flex-center.as-img');
const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');

console.log('Environ 50% du code parcouru!');

// The let mediasInLightBoxes will be so an array of all the ids of medias matching to a photographer
let mediasInLightBoxes = []; /* or let mediasInLightBoxes; */
// Array only with Ids of the medias
export let justMediasIdInLightBox = [];
// export let idInLightBox;

// Opens the LightBox and activates all the others functions related to the lightBox
function openLightBox() {
  // Create an array empty that will take the value of:
  // - medias not sorted (original display on the landing page of a photographer)
  // - or medias sorted ( sorted by the "select")
  // console.log('Another time mediasFiltereds:', mediasFiltereds);
  if (mediasFiltereds.length > 0) {
    /* <-Change here to mediasSorteds when the "select" will be done*/

    mediasInLightBoxes = mediasFiltereds; /* <-Change here to mediasSorteds when the "select" will be done */
  } else {
    mediasInLightBoxes = mediasFiltereds;
  }

  // justMediasIdInLightBox = Array.from(justMediasIdInLightBox);
  for (let i = 0; i < mediasInLightBoxes.length; i++) {
    justMediasIdInLightBox.push(mediasInLightBoxes[i].id);
  }

  // Retrieves button's click prev & next of the function: listener()
  // & it browse on the indexes

  // Retrieves the index of previous media to the left
  let newIdMediaShownInLightBox;
  // How to set theIndex to the currrent index of injected first media???
  function previous() {
    if (theIndex !== Number) {
      // Based on theIndex
      if (theIndex === -1) {
        console.log('error');
      } else if (theIndex === 0) {
        theIndex = mediasInLightBoxes.length - 1;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
        console.log('theIndex after click ("Previous"):', theIndex);
        console.log('Id ("Previous"):', newIdMediaShownInLightBox);
        return theIndex;
      } else {
        theIndex--;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
  
        console.log('theIndex after click ("Previous"):', theIndex);
        console.log('Id ("Previous"):', newIdMediaShownInLightBox);
        return theIndex;
      }
    }

    else {
      // Based on theIndexBis
      if (theIndexBis === -1) {
        console.log('error');
      } else if (theIndexBis === 0) {
        theIndex = mediasInLightBoxes.length - 1;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
        console.log('theIndex after click ("Previous"):', theIndex);
        console.log('Id ("Previous"):', newIdMediaShownInLightBox);
        return theIndex;
      } else {
        theIndex = theIndexBis + 1;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
        console.log('theIndex after click ("Previous"):', theIndex);
        console.log('Id ("Previous"):', newIdMediaShownInLightBox);
        return theIndex;
      }
    }
  }
  // Retrieves the index of next media to the right
  function next() {
    if (theIndex !== Number) {
      // Based on theIndex
        if (theIndex === -1) {
        console.log('error');
      } else if (theIndex === mediasInLightBoxes.length - 1) {
        theIndex = 0;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
        console.log('theIndex after click ("Next"):', theIndex);
        console.log('Id ("Next"):', newIdMediaShownInLightBox);
        return theIndex;
      } else {
        theIndex++;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        console.log('theIndex after click ("Next"):', theIndex);
        console.log('Id ("Next"):', newIdMediaShownInLightBox);
        nextPrevDisplayMedia();
        return theIndex;
      }
    }
    
    else {
      // Based on theIndexBis
        if (theIndexBis === -1) {
        console.log('error');
      } else if (theIndexBis === mediasInLightBoxes.length - 1) {
        theIndex = 0;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        nextPrevDisplayMedia();
        console.log('theIndex after click ("Next"):', theIndex);
        console.log('Id ("Next"):', newIdMediaShownInLightBox);
        return theIndex;
      } else {
        theIndex = theIndexBis + 1;
        newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
        console.log('theIndex after click ("Next"):', theIndex);
        console.log('Id ("Next"):', newIdMediaShownInLightBox);
        nextPrevDisplayMedia();
        return theIndex;
      }
    }
  }
  injectionFirstMediaLightBox();

  function nextPrevDisplayMedia() {
    // console.log(newIdMediaShownInLightBox);
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
    photoVideoH2.style.color = '#901C1C';
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
      // Closes modal form using Escape key
      case 'Escape':
        theIndex = Number;
        theIndexBis;
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
        break;
    }
    console.log(e.key);
  });

}
// Closes modal form on cross "X"
closeModalLightBox.addEventListener('click', function () {
  // Clean lightBox content ( title && (image || video) )
  theIndex = Number;
  theIndexBis;
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
  // return theIndex, theIndexBis;
});

// END: lightBox.js file exported here manually

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  // const allTheJSONDatas = await getAllTheJSONDatas(); // <-Not useful?
  displayData(photographers, medias);
  openLightBox();

  console.log('Là 100% du code est parcouru!');
}

// Starts the series of nested functions
init();
