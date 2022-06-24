// Ci-dessous mediaFactory Model

export class mediaFactory {
  constructor(medias) {
    // this._name = photographers.name;
    this._id = medias.id;
    this._photographerId = medias.photographerId;
    this._title = medias.title;
    this._image = medias.image;
    this._video = medias.video;
    this._likes = medias.likes;
    this._date = medias.date;
    this._price = medias.price;
  }
  // Ma fonction ( sans utiliser get) d'affichage
  // du template-photos pour photographer-page.html
  getPhotosCardDOM() {
    // If this._photographerId contains a video -> do not analyse this one
    // If the document(string) has no date -> do not analyse this one
    const isNotVideo = !this._video;
    console.log(isNotVideo);
    const hasDate = !(this._date == undefined);
    let nameOfPhotographer;
    function giveNameStoredInEachId(photographerId) {
      if (isNotVideo && hasDate) {
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
            : 'ERROR PATH';
      } else {
        nameOfPhotographer = 'ERROR PATH';
      }
    }
    const idForMedia = this._photographerId;
    giveNameStoredInEachId(idForMedia);
    function isReturningSection(
      imageOfMedia,
      titleOfMedia,
      likesOfMedia,
      hasImage
    ) {
      const photography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${imageOfMedia}`;
      const photosPlace = document.querySelector('.photos-displaying');
      const section = document.createElement('section');
      section.innerHTML = `
      <a>
      <img src="${photography}"></img>
      <h2>${titleOfMedia}</h2>
      <span class="likes">${likesOfMedia}❤️</span>
      </a>`;
      if (hasImage === true) {
        console.log('photos affichées.');
        photosPlace.appendChild(section);
      }
    }
    const imageOfMedia = this._image;
    const titleOfMedia = this._title;
    const likesOfMedia = this._likes;
    const hasImage = !!this._image;
    isReturningSection(imageOfMedia, titleOfMedia, likesOfMedia, hasImage);
  }
}

/* Using a switch
        switch(photographerId) {
            case 243:
              nameOfPhotographer = 'Mimi'
              break;
            case 930:
              nameOfPhotographer = 'Ellie'
              break
            default:
              nameOfPhotographer = 'ERROR PATH'
        }
      */

/* Using a repeating else if
      if (photographerId === 243) {
          nameOfPhotographer = 'Mimi';
        } else if (photographerId === 930) {
          nameOfPhotographer = 'Ellie';
        } else if (photographerId === 82) {
          nameOfPhotographer = 'Tracy';
        } else if (photographerId === 527) {
          nameOfPhotographer = 'Nabeel';
        } else if (photographerId === 925) {
          nameOfPhotographer = 'Rhode';
        } else if (photographerId === 195) {
          nameOfPhotographer = 'Marcel';
        } else {
          nameOfPhotographer = 'ERROR PATH';
          console.log(photographerId);
        }
      */
