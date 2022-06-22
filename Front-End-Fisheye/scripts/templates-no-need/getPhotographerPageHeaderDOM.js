export class PhotographerPageHeaderDOM {
  constructor(photographers) {
    this.photographers = photographers;
  }
  getPhotographerPageHeaderDOM() {
    const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
    const section = document.createElement('div');
    section.innerHTML = `<section>
  <h1>${this._name}</h1>
  <p>${this._city + this._tagline}</p>
  <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
  <img>${picture}</img>
  </section>`;
    // Ecrire: document.body.appendChild(section); ou ça: return section;
    return section;
  }
}
