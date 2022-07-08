// Ci-dessous LightBoxFactory Model

export class LightBox {
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

  // Ma fonction ( sans utiliser get) d'affichage
  // de la LightBox pour photographer-page.html
  getLightBoxImgDOM() {
    // Function to get the right name of the phootgrapher
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
    const idForMedia = this._photographerId;
    nameOfPhotographer = giveNameStoredInEachId(idForMedia);
    console.info("Nom du photographe:", nameOfPhotographer);
  function isReturningSection(imageOfMedia, titleOfMedia) {
    const photography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${imageOfMedia}`;
    const LightBoxPlace = document.querySelector('#LightBox_modal');
    const divLightBoxImgPlace = document.createElement('div');
    divLightBoxImgPlace.innerHTML = `
    <figure>
      <div>
        <img src="./assets/icons/close.svg" class="close-lightbox" onclick="closeLightBox()" />
      </div>
      <button class="previous"><span class="fas fa-angle-left"></span></button>
      <button class="next"><span class="fas fa-angle-right"></span></button>
      <div>
        <img src="${photography}"></img>
      </div>
      <figcaption>
        <h2>${titleOfMedia}</h2>
      </figcaption>
    </figure>
    `;
    LightBoxPlace.appendChild(divLightBoxImgPlace);
    // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxImgPlace);
  }
  const imageOfMedia = this._image;
  const titleOfMedia = this._title;
  isReturningSection(imageOfMedia, titleOfMedia);
}
  getLightBoxVideoDOM() {
    // Function to get the right name of the phootgrapher
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
          : console.error('No name found!');
    }
    const idForMedia = this._photographerId;
    giveNameStoredInEachId(idForMedia);

    const videography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${this._video}`;
    const LightBoxPlace = document.querySelector('#LightBox_modal');
    const divLightBoxVideoPlace = document.createElement('div');
    divLightBoxVideoPlace.innerHTML = `
    <figure>
      <div>
        <img src="./assets/icons/close.svg" class="close-lightbox" onclick="closeLightBox()" />
      </div>
        <button class="previous"><i class="fas fa-angle-left"></i></button>
      <button class="next"><i class="fas fa-angle-right"></i></button>
      <div>
        <video controls>
          <source src="${videography}" type="video/mp4">
        </video>
      </div>
      <figcaption>
        <h2>${this._title}</h2>
      </figcaption>

    </figure>
    `;
    LightBoxPlace.appendChild(divLightBoxVideoPlace);
    // LightBoxPlace.insertAdjacentElement('afterbegin', divLightBoxVideoPlace);
  }
}
