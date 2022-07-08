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
          : console.error('No name found');
    }
    const idForMedia = this._photographerId;
    giveNameStoredInEachId(idForMedia);
    function isReturningSection(imageOfMedia, videoOfMedia, titleOfMedia, likesOfMedia, idOfMedia) {
      const photography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${imageOfMedia}`;
      const videography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${videoOfMedia}`;
      const photosPlace = document.querySelector('.photos-displaying');
      const section = document.createElement('section');
      if (imageOfMedia !== undefined) {
        section.innerHTML = `
            <a>
              <figure class="dimensions-photos-grapher-page">
                <img src="${photography}"></img>
              </figure>
              <figcaption class="position-fig-grapher-page">
                <h2>${titleOfMedia}
                </h2>
                <div id="likesHearts-${idOfMedia}">
                  <span class="likes" id="likes-${idOfMedia}">${likesOfMedia}</span>
                  <i class="fas fa-heart" onclick="addLike(${idOfMedia})" ></i>
                </div>
              </figcaption>
            </a>`;
        photosPlace.appendChild(section);
      } else {
        section.innerHTML = `
            <a>
              <figure class="dimensions-photos-grapher-page">
                <video controls>
                <source src="${videography}"
                    type="video/mp4">
                </video>
              </figure>
              <figcaption class="position-fig-grapher-page">
                <h2>${titleOfMedia}
                </h2>
                <div id="likesHearts-${idOfMedia}">
                  <span class="likes" id="likes-${idOfMedia}">${likesOfMedia}</span>
                  <i class="fas fa-heart" onclick="addLike(${idOfMedia})" ></i>
              </div>
              </figcaption>
            </a>`;
        photosPlace.appendChild(section);
      }
    }
    const imageOfMedia = this._image;
    const videoOfMedia = this._video;
    const titleOfMedia = this._title;
    const likesOfMedia = this._likes;
    const idOfMedia = this._id;
    isReturningSection(imageOfMedia, videoOfMedia, titleOfMedia, likesOfMedia, idOfMedia);
  }
  getInsertLikesCardDOM() {
    const insertLikesPlace = document.querySelector('footer');
    const divFooter = document.createElement('div');
    divFooter.innerHTML = `<div>
    <span id="totalLikes"></span>
    <i class="fas fa-heart"></i>
    </div>`;
    insertLikesPlace.insertAdjacentElement('afterbegin', divFooter);
  }
}
