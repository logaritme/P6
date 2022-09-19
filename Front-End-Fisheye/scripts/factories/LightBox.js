
/*
import { nameOfPhotographer } from "../utils/nameOfPhotographer.js";

// LightBoxFactory Model
export class LightBoxFactory {
  constructor(medias) {
    this._id = medias.id;
    this._photographerId = medias.photographerId;
    this._title = medias.title;
    this._image = medias.image;
    this._video = medias.video;
    this._likes = medias.likes;
    this._date = medias.date;
    this._price = medias.price;
  }
*/

/*
  // My fonction ( rename it "setLightBoxImgDOM" and etc.) displaying 
  // the LightBox for the photographer-page.html
  getLightBoxImgDOM() {
    const imageOfMedia = this._image;
    const videoOfMedia = this._video;
    const titleOfMedia = this._title;
    isReturningSection(imageOfMedia, videoOfMedia, titleOfMedia);
  }
*/

/*
  getLightBoxPrevNextDOM() {
    function isReturningSection() {
      const photography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${this._image}`;
      const videography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${this._video}`;
      const LightBoxPlace = document.querySelector('.to-append-media');
      const divLightBoxImgPlace = document.createElement('div');
      const divLightBoxVideoPlace = document.createElement('div');
      // Display the content of photo or video in the lightBox
      // DOM Img
      if (this._image !== undefined) {
        divLightBoxImgPlace.innerHTML = `
          <div class="dimensions-media-lightBox">
            <img src="${photography}"></img>
          </div>
          <figcaption class="position-title-media-lightBox">
          <h2>${this._title}</h2>
          </figcaption>
        `;
        LightBoxPlace.appendChild(divLightBoxImgPlace);
        // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxImgPlace);
      } else {
        // DOM Video
        divLightBoxVideoPlace.innerHTML = `
        <div class="dimensions-media-lightBox">
          <video src="${videography}" type="video/mp4" controls>
          </video>
        </div>
        <figcaption class="position-title-media-lightBox">
        <h2>${this._title}</h2>
        </figcaption>
      `;
        LightBoxPlace.appendChild(divLightBoxVideoPlace);
        // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxVideoPlace);
      }
    }
    isReturningSection();
  }
  */
// }

// export { nameOfPhotographer };

