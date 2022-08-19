
import { mediasIdInLightBox } from '../pages/photographer-page.js';

// Defines theIndexBis has to be available globally
let theIndexBis = Number;

function injectionFirstMediaLightBox() {
  const mediaLinks = document.querySelectorAll('.dimensions-photos-grapher-page');
  for (let mediaLink of mediaLinks) {
    mediaLink.addEventListener('click', (element) => {
      element.preventDefault();
      element.stopPropagation();

      const idCastedToNum = Number(element.path[1].id);
      // Defines theIndex
      // Caster en Number/l'égalité simple
      theIndexBis = mediasIdInLightBox.findIndex((elt) => elt === idCastedToNum);
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
      const paragraphSrc = element.path[1].getAttribute('src');
      if (paragraphSrc.match(regex1) === null) {
        // Invisibility of video
        parentvideoInLightBox.classList.add('hidden');
        parentvideoInLightBox.classList.remove('show');
        videoInLightBox.classList.add('hidden');
        videoInLightBox.classList.remove('show');

        // Image of mediaLink clicked -> modal lightBox
        photoShown.src = element.path[1].getAttribute('src');
        photoShown.alt = element.path[1].getAttribute('alt');
        photoShown.id = element.path[1].getAttribute('id');

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
        videoShown.src = element.path[1].getAttribute('src');
        videoShown.alt = element.path[1].getAttribute('alt');
        videoShown.id = element.path[1].getAttribute('id');

        // Visibility of video
        parentvideoInLightBox.classList.remove('hidden');
        parentvideoInLightBox.classList.add('show');
        videoInLightBox.classList.remove('hidden');
        videoInLightBox.classList.add('show');
      }
      // Title of image or video of mediaLinks clicked -> modal lightBox
      photoVideoH2.style.fontSize = '32px';
      photoVideoH2.style.color = '#901C1C';
      photoVideoH2.textContent = element.path[1].getAttribute('alt');

      // Visibility of the #LightBox_modal
      modalLightBox.classList.remove('hidden');
      modalLightBox.classList.add('show');
    });
  }
}



export { injectionFirstMediaLightBox, theIndexBis};
