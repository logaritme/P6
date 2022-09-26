/////////////////
// ALL IMPORTS //
// Import: factories
import { PhotographerFactory } from '../factories/Photographer.js';
import { MediaFactory } from '../factories/Media.js';

// Import: utils
import { wholeContactForm } from '../utils/contactForm.js';

// NOTE: Manage focus via this kind of code :
// setTimeout("gFocusItemAsGlobalVariable.focus();",0);

////////////
// FETCHS //

/*
async function getAllTheJSONDatas() {
  // Stocking the datas in "data" just when they arrive from the fetch
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  return JSON.parse(JSON.stringify(data));
}
const fullJSONContent = getAllTheJSONDatas();
*/

async function getPhotographers() {
  const data = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .catch((err) => console.log(err, ': Temporary failed to fetch data'));
  return JSON.parse(JSON.stringify(data.photographers));
}

const photographers = getPhotographers();

async function getMedias() {
  const data = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .catch((err) => console.log(err, ': Temporary failed to fetch data'));
  return JSON.parse(JSON.stringify(data.media));
}
const medias = getMedias();

// END: FETCHS //
/////////////////

////////////////
// VAR GLOBAL //

// Theses let MUST have to be available globally
let mediasFiltereds; // Good behaviour to be an array when declared here undefined
let theIndex = null; // To be a number
let theIndexBis = null; // To be a number
// and transiting through the setTheIndex.js file

// The let mediasInLightBoxes will be so an array of all the ids of medias matching to a photographer
let mediasInLightBoxes = [];
// Array only with Ids of the medias
let mediasIdInLightBox = [];
// This variable has to be global
let newIdMediaShownInLightBox = null;

// Contains one of the 3 ways to sort the medias + Access

// Theses let declared are declared globally
let mediasSortedLikes; // To be an array
let mediasSortedDate; // To be an array
let mediasSortedTitle; // To be an array
let focusPhotosStackNum = 6;

// Variable globale déclarée mais isolée en l 102 : Pourquoi pas ici avec les autres???
let photographer;

// END: VAR GLOBAL //
/////////////////////

///////////////
// DROP-DOWN //

// Declares variables of DOM for: Drop-Down + Arrow Next/Prev
const selected = document.querySelector('.selected');
const selectFullBox = document.querySelector('#selectFullBox'); // Accessibility
const selectBox = document.querySelector('.select-box'); // Accessibility
const labelPopulariteAccess = document.querySelector('#option-popularite'); // Accessibility
const optionTitreAccess = document.querySelector('#option-titre'); // Accessibility
const optionDateAccess = document.querySelector('#option-date'); // Accessibility
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

const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

// Set two variables to get the current value text in the DOM to get date, titre and popularité

// Declare variable to get text just after his DOM's catching
let popValue = optionPopulariteId[0].innerText;

// Returns only the photographer matching to the id displayed in the url
const id = parseInt(new URLSearchParams(location.search).get('id'));

// First of all, function to display the medias on the webpage to use them after
// ( I don't see any objection to modularize function displayData )
function displayData(photographers, medias) {
  photographer = photographers.find((photographer) => photographer.id === id);
  const TemplatePhotographer = new PhotographerFactory(photographer);
  TemplatePhotographer.setPhotographerPageHeaderDOM();
  TemplatePhotographer.setInsertPriceCardDOM();

  // Accessibility: Setting the focus on the button
  document.getElementById('contactButtonOpen').focus();
  wholeContactForm();

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
  let numbersOfLikesInsert = `${totalLikes}`;

  // Uses the MediaFactory to generate the insert's DOM
  const TemplateLikesInsert = new MediaFactory(photographer);
  TemplateLikesInsert.getInsertLikesCardDOM();

  // Node DOM to set on the total number of likes in the insert
  document.querySelector('footer>div>div>span').textContent = numbersOfLikesInsert;

  // For each mediasFiltered create photo's DOM
  mediasFiltereds.forEach((mediasFiltered) => {
    const TemplateMedia = new MediaFactory(mediasFiltered, medias);
    TemplateMedia.setPhotosCardDOM();
    focusPhotosStackNum++;
  });

  canModifyOrderMediasFiltereds();
  return mediasFiltereds;
}

// DROP-DOWN ==> 3 SORTING: functions declared to be call by (2) listeners
// Sort the medias and redisplay them
function sortedLike(medias) {
  mediasSortedLikes = mediasFiltereds;
  mediasSortedLikes.sort(function (a, b) {
    return b.likes - a.likes;
  });

  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';

  // For each mediasFiltered create photo's DOM
  mediasSortedLikes.forEach((mediasSortedLike) => {
    const TemplateMedia = new MediaFactory(mediasSortedLike, medias);
    TemplateMedia.setPhotosCardDOM();
    focusPhotosStackNum++;
  });
  mediasIdInLightBox = [];
}

function sortedAZ(medias) {
  mediasSortedTitle = mediasFiltereds;
  mediasSortedTitle.sort((a, b) => a.title.localeCompare(b.title, 'fr', { ignorePunctuation: true }));

  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';

  // For each mediasFiltered create photo's DOM
  mediasSortedTitle.forEach((mediasSortedTitle) => {
    const TemplateMedia = new MediaFactory(mediasSortedTitle, medias);
    TemplateMedia.setPhotosCardDOM();
    focusPhotosStackNum++;
  });
  mediasIdInLightBox = [];
}

function sortedDate(medias) {
  mediasSortedDate = mediasFiltereds;
  mediasSortedDate.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // Empties the content first of all
  document.querySelector('.photos-displaying').innerHTML = '';

  // For each mediasFiltered create photo's DOM
  mediasSortedDate.forEach((mediasSortedDate) => {
    const TemplateMedia = new MediaFactory(mediasSortedDate, medias);
    TemplateMedia.setPhotosCardDOM();
    focusPhotosStackNum++;
  });
  mediasIdInLightBox = [];
}

// Modifies mediasInLightBoxes and refining to get ids
function canModifyOrderMediasFiltereds() {
  if (mediasSortedLikes !== undefined) {
    mediasInLightBoxes = mediasSortedLikes;
    return mediasInLightBoxes;
  } else if (mediasSortedDate !== undefined) {
    mediasInLightBoxes = mediasSortedDate;
    return mediasInLightBoxes;
  } else if (mediasSortedTitle !== undefined) {
    mediasInLightBoxes = mediasSortedTitle;
    return mediasInLightBoxes;
  } else if (mediasFiltereds) {
    mediasInLightBoxes = mediasFiltereds;
    return mediasInLightBoxes;
  } else {
    console.log('Error in the array of medias Sorted or mediasInLightBoxes');
  }

  // Refines to retrieve only the ids in the array
  for (let i = 0; i < mediasInLightBoxes.length; i++) {
    let mediasIdInLightBox = [];
    mediasIdInLightBox.push(mediasInLightBoxes[i].id);
  }
}

// ( Think about the option of close it clicking anywhere )
// Opens/Closes the dropdown and reverse the chevron ( Dynamic DOM )

// Accessibility: Enter&Escape to toggle and reverse chevron
// ( A transformer en switch les deux commençant par selectFullBox. )

selectFullBox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    optionsContainer.classList.toggle('active');
    iconeSort.classList.toggle('reverse-chevron');
    selected.classList.remove('border-radius');
    twoOptions.setAttribute('aria-expanded', 'true');
    selectFullBox.setAttribute('aria-expanded', 'true');
    selectFullBox.focus();
  }
});
selectFullBox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    optionsContainer.classList.remove('active');
    iconeSort.classList.remove('reverse-chevron');
    selected.classList.add('border-radius');
    twoOptions.setAttribute('aria-expanded', 'false');
    labelPopularite.setAttribute('aria-expanded', 'false');
    selectFullBox.focus();
  }
});

/* Nouveau switch à tester
selectFullBox.addEventListener('keyup', (evt) => {
  switch (evt.key) {
    case 'Enter':
      evt.preventDefault();
      optionsContainer.classList('active');
      iconeSort.classList.toggle('reverse-chevron');
      selected.classList.toggle('border-radius');
      twoOptions.setAttribute('aria-expanded', 'true');
      selectFullBox.setAttribute('aria-expanded', 'true');
    break;
    case 'Escape':
      evt.preventDefault();
      optionsContainer.classList.remove('active');
      iconeSort.classList.remove('reverse-chevron');
      selected.classList.remove('border-radius');
      twoOptions.setAttribute('aria-expanded', 'false');
      labelPopularite.setAttribute('aria-expanded', 'false');
      selectFullBox.focus();
      break;
  }
})
*/

// Another way to open/close dropDown by click on the chevron
chevronContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  selectFullBox.focus();
});

// Open/close dropDown Date
optionDate.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionDateId[0].innerText;
  optionDate.innerHTML = popValue;
  popValue = optionPopulariteId[0].innerText;
  selectFullBox.focus();
});

// Accessibility version of open/close dropDown Date
optionDateAccess.addEventListener('keyup', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    optionsContainer.classList.remove('active');
    iconeSort.classList.remove('reverse-chevron');
    // selected.classList.toggle('border-radius');
    labelPopularite.innerHTML = optionDateId[0].innerText;
    optionDate.innerHTML = popValue;
    popValue = optionPopulariteId[0].innerText;
    selectFullBox.focus();
  }
});

// Open/close dropDown
optionTitre.addEventListener('click', function (evt) {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  labelPopularite.innerHTML = optionTitreId[0].innerText;
  optionTitre.innerHTML = popValue;
  popValue = optionPopulariteId[0].innerText;
  selectFullBox.focus();
});

// Accessibility version of open/close dropDown Titre
optionTitreAccess.addEventListener('keyup', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();

    console.log("Hi!");
    optionsContainer.classList.remove('active');
    iconeSort.classList.remove('reverse-chevron');
    // selected.classList.toggle('border-radius');
    labelPopularite.innerHTML = optionTitreId[0].innerText;
    optionTitre.innerHTML = popValue;
    popValue = optionPopulariteId[0].innerText;
    selectFullBox.focus();
  }
});


// Accessibility to remove border-radius properly
labelPopularite.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    console.log("Hello");
    optionsContainer.classList.add('active');
    iconeSort.classList.toggle('reverse-chevron');
    selected.classList.add('border-radius');
    console.log(selected);
    selectFullBox.focus();
};
});

// Open/close dropDown
labelPopularite.addEventListener('click', (evt) => {
  evt.preventDefault();
  optionsContainer.classList.toggle('active');
  iconeSort.classList.toggle('reverse-chevron');
  selected.classList.toggle('border-radius');
  console.log("Hi!");
  selectFullBox.focus();
});




// Sort medias
labelPopularite.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (popValue === 'Popularité') {
    sortedLike(medias);
    console.log(mediasSortedLikes);
  } else if (popValue === 'Date') {
    sortedDate(medias);
    console.log(mediasSortedDate);
  } else if (popValue === 'Titre') {
    sortedAZ(medias);
    console.log(mediasSortedTitle);
  } else console.error('Text inserted: Error');
  canModifyOrderMediasFiltereds();
  openLightBox(evt);
  console.log('Index after injection:', theIndex);
  selectFullBox.focus();
});

// Sort the medias by the appropriated selection
optionsList.forEach((obj) => {
  obj.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (popValue === 'Popularité') {
      sortedLike(medias);
      console.log(mediasSortedLikes);
    } else if (popValue === 'Date') {
      sortedDate(medias);
      console.log(mediasSortedDate);
    } else if (popValue === 'Titre') {
      sortedAZ(medias);
      console.log(mediasSortedTitle);
    } else console.error('Text inserted: Error');
    canModifyOrderMediasFiltereds();
    openLightBox(evt);
    selectFullBox.focus();
  });
});
// Accessibility (2)versionsnecessary of sort the mediasSorted...
optionTitreAccess.addEventListener('keyup', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    if (popValue === 'Popularité') {
      sortedLike(medias);
    } else if (popValue === 'Date') {
      sortedDate(medias);
    } else if (popValue === 'Titre') {
      sortedAZ(medias);
    } else console.error('Text inserted: Error');
    canModifyOrderMediasFiltereds();
    openLightBox(evt);
    selectFullBox.focus();
  }
});
optionDateAccess.addEventListener('keyup', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    if (popValue === 'Popularité') {
      sortedLike(medias);
    } else if (popValue === 'Date') {
      sortedDate(medias);
    } else if (popValue === 'Titre') {
      sortedAZ(medias);
    } else console.error('Text inserted: Error');
    canModifyOrderMediasFiltereds();
    openLightBox(evt);
    selectFullBox.focus();
  }
});

// END: DROP-DOWN //
////////////////////

//////////////
// LIGHTBOX //

// Declares variables of DOM

// Opens & Closes
const modalLightBox = document.querySelector('#LightBox_modal');
// MediaLinks to click on a picture...
const mediaLinks = document.querySelectorAll('.dimensions-photos-grapher-page');
const closeModalLightBox = document.querySelector('.close-lightbox');
// Retrieves: The div containing parent of img/video of lightbox + Parent of img/video + The img/video itself;
const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
const parentimgInLightBox = document.querySelector('.flex-center.as-img');
const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');

// When open the LightBox set the focus on the current media ( or only video ? )
// And also when display previous/next function ???

function previous() {
  if (theIndex !== null) {
    // Based on theIndex
    if (theIndex === -1) {
      console.log('Error in previous() based on theIndex');
    } else if (theIndex === 0) {
      theIndex = mediasInLightBoxes.length - 1;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex--;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  } else {
    // Based on theIndexBis
    if (theIndexBis === -1) {
      console.log('Error in previous() based on theIndexBis');
    } else if (theIndexBis === 0) {
      theIndex = mediasInLightBoxes.length - 1;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex = theIndexBis - 1;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  }
}
function next() {
  if (theIndex !== null) {
    // Based on theIndex
    if (theIndex === -1) {
      console.log('Error in next() based on theIndex');
    } else if (theIndex === mediasInLightBoxes.length - 1) {
      theIndex = 0;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex++;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  } else {
    // Based on theIndexBis
    if (theIndexBis === -1) {
      console.log('Error in next() based on theIndexBis');
    } else if (theIndexBis === mediasInLightBoxes.length - 1) {
      theIndex = 0;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex = theIndexBis + 1;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  }
}

// nextPrevDisplayMedia renvoi le bon array de medias pour obtenir un newIdMediaShownInLightBox
function nextPrevDisplayMedia() {
  let mediasFiltModified;

  // In case of sorting by pop date or title the original mediasFiltereds is modified
  if (mediasSortedLikes !== undefined) {
    // Assigns the value of mediasSortedLikes to mediasFiltereds
    mediasFiltModified = mediasSortedLikes;
    console.log(mediasSortedLikes);
    console.log(mediasFiltModified);
    // return mediasFiltereds;
  } else if (mediasSortedDate !== undefined) {
    mediasFiltModified = mediasSortedDate;
    // return mediasFiltereds;
  } else if (mediasSortedTitle !== undefined) {
    mediasFiltModified = mediasSortedTitle;
    // return mediasFiltereds;

    // Le else if suivant ne sert à rien non ???
  } else if (mediasFiltereds.length > 0) {
    mediasFiltModified = mediasFiltereds;
    // return mediasFiltereds;
  } else console.log('Error in the array of mediasFiltereds in nextPrevFirstMediaLightBox()');

  const titleCurrentMediaInLightBox = mediasFiltModified.find((x) => x.id === newIdMediaShownInLightBox).title;
  const imageCurrentMediaInLightBox = mediasFiltModified.find((x) => x.id === newIdMediaShownInLightBox).image;
  const videoCurrentMediaInLightBox = mediasFiltModified.find((x) => x.id === newIdMediaShownInLightBox).video;
  const photographerIDCurrentMediaInLightBox = mediasFiltModified.find(
    (x) => x.id === newIdMediaShownInLightBox
  ).photographerId;

  console.log(titleCurrentMediaInLightBox);

  // Set again undefined this var
  mediasFiltModified = undefined;

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

// MAIN FUNCTION played by a click
//    Declares openLightBox:
function openLightBox(elementClicked) {
  // Declares 4 functions
  function setMediasIdInLightBox() {
    // console.log(mediasFilteredsInside);
    // We refine to retrieve only the ids in the array
    const medCopyMediasFiltereds = Object.assign([{}], mediasFiltereds);
    let mediasIdInLightBox = [];
    for (const medCopyMediasFiltered in medCopyMediasFiltereds) {
      mediasIdInLightBox.push(medCopyMediasFiltereds[medCopyMediasFiltered].id);
    }
    // console.log(mediasIdInLightBox);
    return mediasIdInLightBox;
  }

  function setCurrentIndexInLightBox(elementClicked) {
    // Defines theIndexBis( id is casted to Number)
    const medCopyMediasFiltereds = Object.assign([{}], mediasFiltereds);
    if (elementClicked.path !== undefined) {
      theIndex = setMediasIdInLightBox(medCopyMediasFiltereds).findIndex(
        (elt) => elt === Number(elementClicked.path[1].id)
      );
    } else {
      theIndex = setMediasIdInLightBox(medCopyMediasFiltereds).findIndex((elt) => elt === Number(elementClicked.id));
      console.log(theIndex);
    }
    return theIndex;
  }

  // Doesn't contain any return
  function displayTheFirstMediaInLightBox(elementClicked) {
    // Actions to display the first media into the lightBox
    const modalLightBox = document.querySelector('#LightBox_modal');
    const parentimgInLightBox = document.querySelector('.flex-center.as-img');
    const parentvideoInLightBox = document.querySelector('.flex-center.as-video');
    const imgInLightBox = document.querySelector('.as-img.injected-content-lightBox');
    const videoInLightBox = document.querySelector('.as-video.injected-content-lightBox');
    // Adds the img of the clicked mediaLink
    const photoShown = modalLightBox.querySelector('.content-lightBox div figure div img');
    const videoShown = modalLightBox.querySelector('.content-lightBox div figure div video');
    const photoVideoH2 = modalLightBox.querySelector('.content-lightBox div figure figcaption h2');

    const regex1 = /([\w-]+\.)+[\w-]{2}([4]){1}$/;

    let paragraphSrc;
    let altPhotoShown;
    let idPhotoShown;

    const getSrcAltIdMedia = (elementClicked) => {
      if (elementClicked.path !== undefined) {
        paragraphSrc = elementClicked.path[1].getAttribute('src');
        altPhotoShown = elementClicked.path[1].getAttribute('alt');
        idPhotoShown = elementClicked.path[1].getAttribute('id');
      } else {
        paragraphSrc = elementClicked.getAttribute('src');
        altPhotoShown = elementClicked.getAttribute('alt');
        idPhotoShown = elementClicked.getAttribute('id');
      }
    };
    getSrcAltIdMedia(elementClicked);

    if (paragraphSrc.match(regex1) === null) {
      // Invisibility of video
      parentvideoInLightBox.classList.add('hidden');
      parentvideoInLightBox.classList.remove('show');
      videoInLightBox.classList.add('hidden');
      videoInLightBox.classList.remove('show');

      // Image of mediaLink clicked -> modal lightBox

      photoShown.src = paragraphSrc;
      photoShown.alt = altPhotoShown;
      photoShown.id = idPhotoShown;

      // Visibility of image
      parentimgInLightBox.classList.remove('hidden');
      parentimgInLightBox.classList.add('show');
      imgInLightBox.classList.remove('hidden');
      imgInLightBox.classList.add('show');
    } else {
      // Invisibility of image
      parentimgInLightBox.classList.add('hidden');
      parentimgInLightBox.classList.remove('show');
      imgInLightBox.classList.add('hidden');
      imgInLightBox.classList.remove('show');

      // Video of mediaLink clicked -> modal lightBox
      videoShown.src = paragraphSrc;
      videoShown.alt = altPhotoShown;
      videoShown.id = idPhotoShown;

      // Visibility of video
      parentvideoInLightBox.classList.remove('hidden');
      parentvideoInLightBox.classList.add('show');
      videoInLightBox.classList.remove('hidden');
      videoInLightBox.classList.add('show');
    }
    // Title of image or video of mediaLinks clicked -> modal lightBox
    photoVideoH2.style.fontSize = '32px';
    photoVideoH2.style.color = '#901C1C';
    photoVideoH2.textContent = altPhotoShown;

    // Visibility of the #LightBox_modal
    modalLightBox.classList.remove('hidden');
    modalLightBox.classList.add('show');
  }

  function setTheIndexBis(elementClicked) {
    const medCopyMediasFiltereds = Object.assign([{}], mediasFiltereds);

    if (elementClicked.path !== undefined) {
      theIndexBis = setMediasIdInLightBox(medCopyMediasFiltereds).findIndex(
        (elt) => elt === Number(elementClicked.path[1].id)
      );
    } else {
      theIndexBis = setMediasIdInLightBox(medCopyMediasFiltereds).findIndex((elt) => elt === Number(elementClicked.id));
      console.log(theIndexBis);
    }
    return theIndexBis;
  }

  // 4 functions executed here
  mediasIdInLightBox = setMediasIdInLightBox();
  theIndex = setCurrentIndexInLightBox(elementClicked);
  displayTheFirstMediaInLightBox(elementClicked);
  theIndexBis = setTheIndexBis(elementClicked);
}

///// END: MAIN FUNCTION /////
//////////////////////////////

//////////////////////
///// LISTENERS //////
// ???
// Listener opens function openLightBox()
window.addEventListener('click', () => {
  document.querySelectorAll('.media-links').forEach((openMediaLink) => {
    openMediaLink.addEventListener('click', (elementClicked) => {
      canModifyOrderMediasFiltereds();
      openLightBox(elementClicked);
    });
  });
});

// Listeners for Prev & Next & KeysUp Accessibility
// Retrieves button's click prev & next of the function: listener()
// & it browse on the indexes
previousBtn.addEventListener('click', () => {
  previous();
  nextPrevDisplayMedia();
  document.querySelector('.previous').focus();
});

nextBtn.addEventListener('click', () => {
  next();
  nextPrevDisplayMedia();
  document.querySelector('.next').focus();
});

// Iterate for accessibility -> prepareopenLightBox whenever that element is focused && key 'Enter' released
// Accessibility
// Switchs on the 3 keysup ( the user can type on the keyboard )
document.addEventListener('keyup', (evt) => {
  switch (evt.key) {
    case 'ArrowLeft':
      evt.preventDefault;
      previous();
      document.querySelector('.previous').focus();
      break;
    case 'ArrowRight':
      evt.preventDefault;
      next();
      document.querySelector('.next').focus();
      break;
    // Closes modal form using Escape key
    case 'Escape':
      // Reset the variables and close the lightBox
      theIndex = null;
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
      break;
    // Why not be more selectful than document for example div.photo-displaying for 'Enter???
    // Pourquoi j'ai mis le Enter là, dans ce listener ??? -> Car il enregistre les keyup on document
    case 'Enter':
      const mediaLinkAccess = document.querySelectorAll('.media-links'); // Use .dimensions-photos-grapher-page if doesn't work
      const keyOnLabelPop = document.getElementById('option-popularite');
      const keyOnLabelDate = document.getElementById('option-date');
      const keyOnLabelTitre = document.getElementById('option-titre');
      // Do it also for .label-date, .label-titre
      for (const eltEntered of mediaLinkAccess) {
        if (document.activeElement === eltEntered) {
          // console.log('One elt of mediaLinkAccess is focused');
          // console.log('Yes !! Enter is functionning on Medias !!');
          openLightBox(eltEntered);
        }
      }
      // Apparently theses three " if " are unuseful
      if (document.activeElement === keyOnLabelPop) {
        // console.log('keyOnLabelPop is focused');
        sortedLike(medias);
        // console.log('Yes !! Enter is functionning on Label Pop !!');
        canModifyOrderMediasFiltereds();
      }
      if (document.activeElement === keyOnLabelDate) {
        // console.log('keyOnLabelDate is focused');
        sortedDate(medias);
        // console.log('Yes !! Enter is functionning on Label Date !!');
        canModifyOrderMediasFiltereds();
      }
      if (document.activeElement === keyOnLabelTitre) {
        // console.log('keyOnLabelTitre is focused');
        sortedAZ(medias);
        // console.log('Yes !! Enter is functionning on Label  !!');
        canModifyOrderMediasFiltereds();
      }
      // document.querySelector('.previous').focus();
      break;
  }
});

// Closes modal lightBox on cross "X"
closeModalLightBox.addEventListener('click', () => {
  // Reset theIndex and theIndexBis
  // Ici utiliser une fonction qui renvoi la bonne valeur, null par exemple
  // changeToUndefinedOrNullNumber(); ???
  theIndex = null;
  theIndexBis;
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
});
///// END: LISTENERS /////
//////////////////////////

async function init() {
  // Retrieves photographers and medias data
  const photographers = await getPhotographers();
  const medias = await getMedias();
  mediasFiltereds = await displayData(photographers, medias);
}

// Starts the series of nested functions
init();

export {
  mediasFiltereds,
  mediasInLightBoxes,
  mediasIdInLightBox,
  mediasSortedTitle,
  mediasSortedDate,
  mediasSortedLikes,
  photographer,
  focusPhotosStackNum,
  newIdMediaShownInLightBox,
};

export { medias, mediaLinks, id };
export { theIndex, theIndexBis };
export { displayData, nextPrevDisplayMedia, canModifyOrderMediasFiltereds };
