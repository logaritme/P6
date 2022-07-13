// Ci-dessous LightBoxFactory Model
// Rename everywhere ligthBoxFactory instead of lightBox
export class lightBox {
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

  // My fonction ( without use a get) displaying
  // the LightBox for the photographer-page.html
  getLightBoxImgDOM() {
    // Function to get the right name of the photographer
    let nameOfPhotographer;
    function giveNameStoredInEachId(photographerId) {
      nameOfPhotographer =
        photographerId === 243
          ? 'Mimi'
          : photographerId === 930
          ? 'Ellie'
          : photographerId === 82
          ? 'Tracy'
          : photographerId === 527
          ? 'Nabeel'
          : photographerId === 925
          ? 'Rhode'
          : photographerId === 195
          ? 'Marcel'
          : console.error('No photographer name found!');
    }
    const IdPhotographer = this._photographerId;
    giveNameStoredInEachId(IdPhotographer);
    // Debug
    // console.info("L'IdPhotographer:", IdPhotographer);
    // console.info('Nom du photographe:', nameOfPhotographer);
    function isReturningSection(imageOfMedia, videoOfMedia, titleOfMedia) {
      // Debug
      console.info('Titre:', titleOfMedia);
      const photography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${imageOfMedia}`;
      const videography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${videoOfMedia}`;
      const LightBoxPlace = document.querySelector('.to-append-media');
      const divLightBoxImgPlace = document.createElement('div');
      const divLightBoxVideoPlace = document.createElement('div');
      // Display the content of photo or video in the lightBox
      // DOM Img
      if (imageOfMedia !== undefined) {
        divLightBoxImgPlace.innerHTML = `
          <div class="dimensions-media-lightBox">
            <img src="${photography}"></img>
          </div>
          <figcaption class="position-title-media-lightBox">
          <h2>${titleOfMedia}</h2>
          </figcaption>
        `;
        LightBoxPlace.appendChild(divLightBoxImgPlace);
        // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxImgPlace);
      } else {
        // DOM Video
        divLightBoxVideoPlace.innerHTML = `
        <div class="dimensions-media-lightBox">
          <video controls>
            <source src="${videography}" type="video/mp4">
          </video>
        </div>
        <figcaption class="position-title-media-lightBox">
        <h2>${titleOfMedia}</h2>
        </figcaption>
      `;
        LightBoxPlace.appendChild(divLightBoxVideoPlace);
        // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxVideoPlace);
      }
    }
    const imageOfMedia = this._image;
    const videoOfMedia = this._video;
    const titleOfMedia = this._title;
    isReturningSection(imageOfMedia, videoOfMedia, titleOfMedia);
  }
}
