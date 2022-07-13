import { lightBox } from '../factories/LightBox.js';
import { medias } from '../pages/photographer-page.js';


// Opens and Close the LightBox
  export function openLightBox() {
    const realModalContent = document.getElementById('LightBox_modal')
    const modalContents = document.querySelectorAll('.photos-displaying section a');
    for (let modalContent of modalContents) {
      modalContent.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(modalContent);
        realModalContent.style.display = 'block';
        console.log("Ca ouvre la lightBox!!!");
      });
      // const TemplateLightBox = new lightBox(medias);
      // TemplateLightBox.getLightBoxImgDOM();
    };
  };
// Closes modal form on cross "X"
  export function closeLightBox() {
    const realModalContent = document.getElementById('LightBox_modal')
    const modalContent = document.querySelector('.close-lightbox');
    // modalContent.style.display = 'block';
    modalContent.addEventListener('click', function () {
      realModalContent.style.display = 'none';
      console.log("Ca ferme la lightBox!!!");
    });
  };
  // END: Open and Close

  // 2nd Step: Displays the image clicked

  const modaleLightBoxExple = document.querySelector('#LightBox_modal');
  const closeModaleLightBoxExple = document.querySelector('.close-lightbox');
  const links = document.querySelectorAll('.gallery a');
  console.info("3 liens:", links);
  for (let link of links) {
    link.addEventListener("click", function (e) {
      // Disable default behavior
      e.preventDefault();
      // We add the img of the clicked link
      const photoVideo = modaleLightBoxExple.querySelector('.content-lightBox div figure div img');
      photoVideo.src = this.href;
      // Image of link clicked in the modal
      modaleLightBoxExple.classList.remove("hidden");
      modaleLightBoxExple.classList.add("show");
    });
  };
  // Close the modal by clicking on the cross with a listener
  closeModaleLightBoxExple.addEventListener("click", function () {
    modaleLightBoxExple.classList.remove("show");
    modaleLightBoxExple.classList.add("hidden");

  });
  // Close the modal by clicking anywhere
  modaleLightBoxExple.addEventListener("click", function () {
    modaleLightBoxExple.classList.remove("show");
    modaleLightBoxExple.classList.add("hidden");
  });

// 1st Step: Open and Close
/*
// Opens and Close the LightBox
export function openLightBox() {
  const modalContent = document.getElementById('LightBox_modal');
  // modalContent.style.display = 'block';
  // const TemplateLightBox = new lightBox(medias);
  // TemplateLightBox.getLightBoxImgDOM();
};

// Closes modal form on cross "X"
export function closeLightBox() {
  const modalContent = document.querySelector('.close-lightbox');
  // modalContent.style.display = 'none';
  modalContent.addEventListener('onclick', function () {
    // modalContent.style.display = 'none';
  });
};
// END: Open and Close

// 2nd Step: Displays the image clicked

const modaleLightBoxExple = document.querySelector('#LightBox_modal');
const closeModaleLightBoxExple = document.querySelector('.close-lightbox');
const links = document.querySelectorAll('.gallery a');
console.info("9 ou 10 liens:", links);
for ( let link of links){
  link.addEventListener("click", function (e) {
  // Disable default behavior
  e.preventDefault();
  // We add the img of the clicked link
  const photoVideo = modaleLightBoxExple.querySelector('.content-lightBox div figure div img');
  photoVideo.src = this.href;
  // Image of link clicked in the modal
  modaleLightBoxExple.classList.add("show");
  });
}

// 3rd Step: From one image to another one into the lightBox*/
