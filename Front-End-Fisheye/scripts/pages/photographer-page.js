import { PhotographerFactory } from '../factories/Photographer.js';
import { MediaFactory } from '../factories/Media.js';
import { LightBoxFactory } from '../factories/LightBox.js';
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
let dateValue = optionDateId[0].innerText;
let titreValue = optionTitreId[0].innerText;

optionDate.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionDateId[0].innerText;
  optionDate.innerHTML = popValue;
  dateValue = optionDateId[0].innerText;
  titreValue = optionTitreId[0].innerText;
  popValue = optionPopulariteId[0].innerText;
});

optionTitre.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionTitreId[0].innerText;
  optionTitre.innerHTML = popValue;
  titreValue = optionTitreId[0].innerText;
  dateValue = optionDateId[0].innerText;
  popValue = optionPopulariteId[0].innerText;
});

labelPopularite.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
});

labelPopularite.addEventListener('click', function (evt) {
  evt.preventDefault();
  console.log(popValue);
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
    console.log(popValue);
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

// Ne retourne que le photographe correspondant à l'id affiché dans l'url
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
console.log('Environ 25% du code parcouru!');

// const functionResult = displayData(photographers, medias);
// console.log(functionResult);

// lightBox.js file exported here manually

// import { mediasFiltereds } from '../pages/photographer-page.js';
// import { displayData } from '../pages/photographer-page.js';
// import { LightBoxFactory } from '../factories/LightBox.js';
// import { medias } from '../pages/photographer-page.js';
// import { MediaFactory } from '../factories/Media.js';

// Récupère la div qui va contenir l'image/la video de la lightbox
// const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');

// Opens the LightBox and activate all the others functions related to the lightBox
// export
function openLightBox() {
  const realModalContent = document.getElementById('LightBox_modal');
  const modalContents = document.querySelectorAll('.photos-displaying section a');
  for (let modalContent of modalContents) {
    modalContent.addEventListener('click', function (e) {
      e.preventDefault();
      realModalContent.classList.remove('hidden');
      realModalContent.classList.add('show');
      console.log('Ça ouvre la lightBox!!!');
    });
    // const TemplateLightBox = new lightBox(medias);
    // TemplateLightBox.getLightBoxImgDOM();
  }

  const modaleLightBox = document.querySelector('#LightBox_modal');
  const closeModaleLightBox = document.querySelector('.close-lightbox');
  const mediaLinks = document.querySelectorAll('.photos-displaying section a');
  // console.info('9 à 11 liens:', mediaLinks);

  // Close the modal by clicking on the cross with a listener
  closeModaleLightBox.addEventListener('click', function () {
    modaleLightBox.classList.remove('show');
    modaleLightBox.classList.add('hidden');
  });

  // Gère toutes les fonctions liées à l'affichage du contenu de la lightbox
  function displayLightBox(mediasFiltereds) {
    // Crée 1 array vide qui pendra la valeur:
    // - des medias non triés (affichage d'origine sur la page d'arrivée d'un photographe)
    // - ou des medias triés ( triés par le "select")
    // La let mediasInLightBoxes sera donc un array de tous les id de media correspondant à un photographe
    let mediasInLightBoxes = []; /* ou let mediasInLightBoxes; */
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

    const currentMediaShownInLightBoxs = document.querySelectorAll('body :nth-child(4) a');
    let idInLightBox;
    let theIndex;
    for (let currentMediaShownInLightBox of currentMediaShownInLightBoxs) {
      currentMediaShownInLightBox.addEventListener('click', (element) => {
        idInLightBox = element.path[2].id;
        theIndex = justMediasIdInLightBox.findIndex((element) => element == idInLightBox); /*<-pb ici*/
        console.log(justMediasIdInLightBox);
        console.log('Id récupérée:', idInLightBox);
        console.log('index selon le click sur image:', theIndex);
      });
    }
    console.log('Environ 50% du code parcouru!');

    // let allIdMediasFiltereds = [];
    // for (let i = 0; i < mediasFiltereds.length; i++) {
    //   allIdMediasFiltereds = [allIdMediasFiltereds + mediasFiltereds[i].id + ', '];
    //   console.log(allIdMediasFiltereds);
    // }

    // Info: Récupère en l'occurence un number situé entre 0 et 9 (voire jusqu'à 10 ou 11 )

    // Récupère le click sur les boutons prev et next de la fonction: listener()
    // et navigue sur les index

    // Récupère l'index du media précédent vers la gauche

    function nextPrevDisplayMedia() {
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
      const modaleLightBox = document.querySelector('#LightBox_modal');
      const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
      const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
      const parentimgInLightBox = document.querySelector('.flex-center.as-img');
      const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
      // Adds the img of the clicked mediaLink
      const photoShown = modaleLightBox.querySelector('.content-lightBox div figure div img');
      const videoShown = modaleLightBox.querySelector('.content-lightBox div figure div video');
      const photoVideoH2 = modaleLightBox.querySelector('.content-lightBox div figure figcaption h2');
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
      modaleLightBox.classList.remove('hidden');
      modaleLightBox.classList.add('show');
    }

    let newIdMediaShownInLightBox;

    function previous() {
      if (theIndex === -1) {
        console.log('error');
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
      displayMedia();
    }
    // Récupère l'index du media suivant vers la droite
    function next() {
      if (theIndex === -1) {
        console.log('error');
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
        nextPrevDisplayMedia();
        console.log('Lis la ligne else du next:', theIndex);
        console.log('Id ("Next"):', newIdMediaShownInLightBox);
      }
      displayMedia();
    }

    function displayMedia() {
      const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
      const mediaLinks = document.querySelectorAll('.photos-displaying section a');
      // console.info('9 à 11 liens:', mediaLinks);

      // Integrates the media into the HTML via .src .alt .id to be displayed in the lightBox (.injectedLightBoxCont)
      function injectionFirstMediaLightBox() {
        for (let mediaLink of mediaLinks) {
          mediaLink.addEventListener('click', function (e) {
            // const modaleLightBox = document.querySelector('#LightBox_modal');
            // const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
            // const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
            // const parentimgInLightBox = document.querySelector('.flex-center.as-img');
            // const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
            // Disable default behavior
            e.preventDefault();
            // Adds the img of the clicked mediaLink
            // const photoShown = modaleLightBox.querySelector('.content-lightBox div figure div img');
            // const videoShown = modaleLightBox.querySelector('.content-lightBox div figure div video');
            // const photoVideoH2 = modaleLightBox.querySelector('.content-lightBox div figure figcaption h2');
            // const sourceName = photoShown.src = this.href;
            // console.log(sourceName);
            // const regex1 = new RegExp('*jpg');
            // const regex2 = new RegExp('*mp4');
            // (/([\w-]+\.)+[\w-]{3}$/)
            // (/([\w-]+\.)+[\w-]{2}([4]){1}$/)
            newIdMediaShownInLightBox = justMediasIdInLightBox[theIndex];
            nextPrevDisplayMedia();
            console.log(justMediasIdInLightBox);
            console.log("Lis l'injectionFirstMedia:", theIndex);
            console.log('Id ("First"):', newIdMediaShownInLightBox);
          });
        }
        console.log('Environ 75% du code parcouru!');
      }
      injectionFirstMediaLightBox();
    }
    displayMedia();

    function listenPrevNextKeysUp() {
      document.querySelector('.previous').addEventListener('click', () => {
        previous();
      });

      document.querySelector('.next').addEventListener('click', () => {
        next();
      });
      // Accessibilitée
      // Switche sur les 3 touches que l'utilisateur peut taper au clavier
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
    listenPrevNextKeysUp();
  }
  displayLightBox(mediasFiltereds);
}

// Closes modal form on cross "X"
// export
function closeLightBoxBis() {
  const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
  const realModalContent = document.getElementById('LightBox_modal');
  const modalContent = document.querySelector('.close-lightbox');
  const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
  const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
  const parentimgInLightBox = document.querySelector('.flex-center.as-img');
  const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
  // Vide le contenu de la lightbox ( title && (image || video) )
  injectedLightBoxCont.innerHTML = '';
  // Invisibility of video
  parentvideoInLightBox.classList.add('hidden');
  parentvideoInLightBox.classList.remove('show');
  videoInLightBox.classList.add('hidden');
  videoInLightBox.classList.remove('show');
  // Invisibility of image
  parentimgInLightBox.classList.add('hidden');
  parentimgInLightBox.classList.remove('show');
  imgInLightBox.classList.add('hidden');
  imgInLightBox.classList.remove('show');

  // Ferme la lightbox en ajoutant la class hidden
  realModalContent.classList.add('hidden');
  console.log('Ça ferme la lightBox!');
}
function closeLightBox() {
  const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
  const realModalContent = document.getElementById('LightBox_modal');
  const modalContent = document.querySelector('.close-lightbox');
  const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
  const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
  const parentimgInLightBox = document.querySelector('.flex-center.as-img');
  const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
  modalContent.addEventListener('click', function () {
    // Vide le contenu de la lightbox ( title && (image || video) )
    injectedLightBoxCont.innerHTML = '';
    // Invisibility of video
    parentvideoInLightBox.classList.add('hidden');
    parentvideoInLightBox.classList.remove('show');
    videoInLightBox.classList.add('hidden');
    videoInLightBox.classList.remove('show');
    // Invisibility of image
    parentimgInLightBox.classList.add('hidden');
    parentimgInLightBox.classList.remove('show');
    imgInLightBox.classList.add('hidden');
    imgInLightBox.classList.remove('show');
    // Ferme la lightbox en ajoutant la class hidden
    realModalContent.classList.add('hidden');
    console.log('Ça ferme la lightBox!');
  });
}

// END: lightBox.js file exported here manually

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  const allTheJSONDatas = await getAllTheJSONDatas();
  displayData(photographers, medias, allTheJSONDatas);
  openLightBox();
  closeLightBox(medias);
  console.log('Là 100% du code est parcouru!');
}

// Starts the series of nested functions      z
init();
