import { theIndex, justMediasIdInLightBox } from '../pages/photographer-page.js';
export let theIndexBis= 0;
export function setTheIndex() {

  const mediaLinks = document.querySelectorAll('.dimensions-photos-grapher-page');
  console.log('Entre dans le tout début de la fonction: setTheIndex()');
  for (let mediaLink of mediaLinks) {
    mediaLink.addEventListener('click', function (element) {
      console.log('Est dans le listener de setTheIndex()');
      console.log('theIndex just before the click:', theIndex);
      console.log('justMediasIdInLightBox just before the click, findIndex:', justMediasIdInLightBox);
      console.log(element.path[3].id);
      // idInLightBox = element.path[3].id;
      theIndexBis = justMediasIdInLightBox.findIndex((elt) => elt == element.path[3].id);
      // <- theIndex has a pb here
      // console.log('Current Id retrieved:', idInLightBox);
      console.log('Index depends on the click on which image:', theIndexBis);
      // nextPrevDisplayMedia()
    });
  }
}
