// import { mediasFiltereds } from '../pages/photographer-page.js';
// import { displayData } from '../pages/photographer-page.js';
// import { LightBoxFactory } from '../factories/LightBox.js';
// import { medias } from '../pages/photographer-page.js';
// import { MediaFactory } from '../factories/Media.js';

// Récupère la div qui va contenir l'image/la video de la lightbox
// const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');

// Opens the LightBox and activate all the others functions related to the lightBox
// export
 function openLightBox(media) {
  console.log(mediasFiltereds);
  const realModalContent = document.getElementById('LightBox_modal');
  const modalContents = document.querySelectorAll('.photos-displaying section a');
  for (let modalContent of modalContents) {
    modalContent.addEventListener('click', function (e) {
      e.preventDefault();
      realModalContent.classList.remove('hidden');
      console.log('Ça ouvre la lightBox!!!');
    });
    // const TemplateLightBox = new lightBox(medias);
    // TemplateLightBox.getLightBoxImgDOM();
  }

  const modaleLightBox = document.querySelector('#LightBox_modal');
  const closeModaleLightBox = document.querySelector('.close-lightbox');
  const mediaLinks = document.querySelectorAll('.photos-displaying section a');
  console.info('9 à 11 liens:', mediaLinks);

  // Close the modal by clicking on the cross with a listener
  closeModaleLightBox.addEventListener('click', function () {
    modaleLightBox.classList.remove('show');
    modaleLightBox.classList.add('hidden');
  });
  /*
  // NO ERASE IT: Close the modal by clicking anywhere
  modaleLightBox.addEventListener('click', function () {
    modaleLightBox.classList.remove('show');
    modaleLightBox.classList.add('hidden');
  });
  */

  // /\ Work in progress /\
  // From one image to another one into the lightBox Working: NO!!!

  // Gère toutes les fonctions liées à l'affichage du contenu de la lightbox
  function displayLightBox(media) {
    // Crée 1 array vide qui pendra la valeur:
    // - des medias non triés (affichage d'origine sur la page d'arrivée d'un photographe)
    // - ou des medias triés ( triés par le "select")
    // La let mediasInLightBoxes sera donc un array de tous les id de media correspondant à un photographe
    let mediasInLightBoxes = [];
    if (mediasFiltereds.length > 0) { /* <-Change here to mediasSorteds when the "select" will be done */
      
      mediasInLightBoxes = mediasFiltereds; /* <-Change here to mediasSorteds when the "select" will be done */
    } else {
      mediasInLightBoxes = mediasFiltereds;
    }
    // Réinitialise les index des images ( ça en itère entre 9 et 11 medias
    // selon la page du photographe choisit précédemment )
    for (let i = 0; i < mediasInLightBoxes.length; i++) {
      mediasInLightBoxes[i].index = i;
    }
    // Récupère l'image qui à été cliquée en retriant "mediasInLightBoxes" par l'id de l'image
    // medias.id = this._id;

    // Faire un listener pour récupérer l'id ( avec .id.value) de la photo dans la lightBox
    // ...si pas possible mettre le onclick avec l'id en paramètre
    // de la fonction onclick écrite directement dans le HTML

    mediasInLightBoxes.forEach((media) => {
      media.addEventListener('click', (element) => {
        toLogIt = element.target.id.value;
        console.log(toLogIt);
      })
    });
    const mediaLinks = document.querySelectorAll('.photos-displaying section a');
    let idMediaInLightBox = function getIdMediaInLightBox() {
      for (let mediaLink of mediaLinks) {
      mediaLink.addEventListener('click', function (e) {
        // Disable default behavior
        e.preventDefault();
        idMediaInLightBox = mediaLink.getAttribute('id');
        console.log(idMediaInLightBox);
        })
      }
    };
      
    let currentMediaInLightBox = mediasInLightBoxes.find((media) => media.id === idMediaInLightBox);/*<-pb ici*/


    // Info: Récupère en l'occurence un number situé entre 0 et 9 (voire jusqu'à 10 ou 11 )
    let theIndex = currentMediaInLightBox.index;
    // Récupère le click sur les boutons prev et next de la fonction: listener()
    // et navigue sur les index

    // Récupère l'index du media précédent vers la gauche
    function previous() {
      if (theIndex === 0) {
        theIndex = mediasInLightBoxes.length - 1;
      } else {
        theIndex--;
      }

      displayMedia();
    }
    // Récupère l'index du media suivant vers la droite
    function next() {
      if (theIndex === mediasInLightBoxes.length - 1) {
        theIndex = 0;
      } else {
        theIndex++;
      }
      displayMedia();
    }

    function displayMedia() {
    /*  currentMediaInLightBox = mediasOfLightbox[theIndex];

      // Titre de l'image ou de la video
      let titre = currentMediaInLightBox.title;

      // Titre de l'image
      let image = currentMediaInLightBox.image;

      // Titre de la video
      let video = currentMediaInLightBox.video;

      // Nom du photographe
      let name = onePhotographer.name;
    */
      const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
      const mediaLinks = document.querySelectorAll('.photos-displaying section a');
      console.info('9 à 11 liens:', mediaLinks);
      // Creates the photographer's card to be displayed in the lightBox (.injectedLightBoxCont)
      function injectionFirstMediaLightBox() {
        for (let mediaLink of mediaLinks) {
          mediaLink.addEventListener('click', function (e) {
            const modaleLightBox = document.querySelector('#LightBox_modal');
            // Disable default behavior
            e.preventDefault();
            // Adds the img of the clicked mediaLink
            const photoShown = modaleLightBox.querySelector('.content-lightBox div figure div img');
            console.log(photoShown);
            const videoShown = modaleLightBox.querySelector('.content-lightBox div figure div video');
            const photoVideoH2 = modaleLightBox.querySelector('.content-lightBox div figure figcaption h2');
            if (photoShown !== undefined) {
              // Image of mediaLink clicked -> modal lightBox
              photoShown.src = this.href;
              photoShown.alt = mediaLink.getAttribute('alt');
              photoShown.id = mediaLink.getAttribute('id');
            } else {
              // Video of mediaLink clicked -> modal lightBox
              videoShown.src = this.href;
              videoShown.alt = mediaLink.getAttribute('alt');
              videoShown.id = mediaLink.getAttribute('id');

            }
            // Title of image or video of mediaLinks clicked -> modal lightBox
            photoVideoH2.style.fontSize = '32px';
            photoVideoH2.style.color = 'orange';
            photoVideoH2.textContent = mediaLink.getAttribute('alt');
            // Visibility of the #LightBox_modal
            modaleLightBox.classList.remove('hidden');
            modaleLightBox.classList.add('show');
          });
        }
      }
      injectionFirstMediaLightBox();
      // Stocke le résultat de la fonction jouée dans une const ( le stocke-t-il vraiment ? )
      const lightBoxMediaInDOM = injectionFirstMediaLightBox();
      // Insère le bloc HTML image ou vidéo et titre dans la div de la lightbox
      injectedLightBoxCont.innerHTML = lightBoxMediaInDOM;
      // Peut-être qu'il est plus efficace d'écrire ça:
      // element.setAttribute(''); ou element.setAttribute('');
      // que le .innerHTML ?
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
            closeLightBox();
            break;
        }
        console.log(e.key);
      });
    }
    listenPrevNextKeysUp();
  }
  displayLightBox();
}
// Closes modal form on cross "X"
// export
 function closeLightBox() {
  const injectedLightBoxCont = document.querySelector('.injected-content-lightBox');
  const realModalContent = document.getElementById('LightBox_modal');
  const modalContent = document.querySelector('.close-lightbox');
  modalContent.addEventListener('click', function () {
    // Vide le contenu de la lightbox ( title && (image || video) )
    injectedLightBoxCont.innerHTML = '';
    // Ferme la lightbox en ajoutant la class hidden
    realModalContent.classList.add('hidden');
    console.log('Ça ferme la lightBox!');
  });
}
