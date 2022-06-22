// Ci-dessous mediaFactory Model
// import {  photographerFactory } from '../factories/Photographer.js'
// Modif nulle
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
    // How to display in the path the photgrapher's name dynamically?
    // -> extends class and super? <- To do this is a mess!!
    // -> create a var to store the name according to the photgrapher's id? <- Better idea! :-D
    const hasVideo = !!this._video;
    const isThereAnyDate = !(this._date == null);
    //  If this._photographerId contains a video do not analyse this one
    let nameOfPhotographer;
    function nameStoredInEachId(photographerId) {
      if (!hasVideo && isThereAnyDate) {
        /*
        nameOfPhotographer = photographerId === 243 ? 'Mimi' 
        : photographerId === 930 ? 'Ellie'
        : photographerId === 82 ? 'Tracy' : 'pouet';

        switch(photographerId) {
            case 243:
              nameOfPhotographer = 'Mimi'
              break;
            case 930:
              nameOfPhotographer = 'Ellie'
              break
            default:
              'pouet'
        }
*/

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
      }
      
    }
    nameStoredInEachId(this._photographerId);
    const photography = `./assets/fish-eye_photos/Sample\ Photos/${nameOfPhotographer}/${this._image}`;
    const photosPlace = document.querySelector('.photos-displaying');
    const section = document.createElement('section');
    // Further in the progress of the project replace 'price' by 'likes'
    section.innerHTML = `
    <a>
    <img src="${photography}"></img>
    <h2>${this._title}</h2>
    <span class="likes">${this._likes}<3</span>
    </a>`;
    photosPlace.appendChild(section);
    return section;
  }
}
