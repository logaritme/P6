// Ci-dessous MediaFactory Model

export class MediaFactory {
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

  // My fonction ( without use a get) displaying
  // the template-photos for the photographer-page.html
  getPhotosCardDOM() {

    const nameOfPhotographer = this._photographerId === 243
    ? 'Mimi' : this._photographerId === 930
    ? 'Ellie': this._photographerId === 82
    ? 'Tracy': this._photographerId === 527
    ? 'Nabeel': this._photographerId === 925
    ? 'Rhode': this._photographerId === 195
    ? 'Marcel' : null;

    if (!nameOfPhotographer) {
      console.error('No name found') 
      return false
    }

    const photography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${this._image}`;
    const videography = `./assets/fish-eye_photos/Sample%20Photos/${nameOfPhotographer}/${this._video}`;
    const photosPlace = document.querySelector('.photos-displaying');
    const section = document.createElement('section');
    // Display the content of photo or video
    if (this._image !== undefined) {
      section.innerHTML = `
          <a id="${this._id}" href="${photography}" alt="${this._title}">
            <figure class="dimensions-photos-grapher-page">
              <img src="${photography}" alt="${this._title}"></img>
            </figure>
            <figcaption class="position-fig-grapher-page">
              <h2>${this._title}
              </h2>
              <div id="likesHearts-${this._id}">
                <span class="likes" id="likes-${this._id}">${this._likes}</span>
                <i class="fas fa-heart" onclick="addLike(${this._id})" ></i>
              </div>
            </figcaption>
          </a>
          `;
      photosPlace.appendChild(section);
    } else {
      section.innerHTML = `
          <a id="${this._id}" href="${videography}" alt="${this._title}">
            <figure class="dimensions-photos-grapher-page">
              <video src="${videography}" alt="${this._title}"
                  type="video/mp4" controls>
              </video>
            </figure>
            <figcaption class="position-fig-grapher-page">
              <h2>${this._title}
              </h2>
              <div id="likesHearts-${this._id}">
                <span class="likes" id="likes-${this._id}">${this._likes}</span>
                <i class="fas fa-heart" onclick="addLike(${this._id})" ></i>
            </div>
            </figcaption>
          </a>
          `;
      photosPlace.appendChild(section);
    }

  }
  // Display the total of Likes in the insert at the bottom-right of the page
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
