// Photographer factory for photographer.html

export class PhotographerFactory {
  constructor(thePhotographers) {
    this._name = thePhotographers.name;
    this._id = thePhotographers.id;
    this._city = thePhotographers.city;
    this._country = thePhotographers.country;
    this._tagline = thePhotographers.tagline;
    this._price = thePhotographers.price;
    this._portrait = thePhotographers.portrait;
  }

  // Template-header for photographer.html
  setPhotographerPageHeaderDOM() {
    const picture = `../Front-End-Fisheye/assets/fish-eye_photos/Sample%20Photos/Photographers%20ID%20Photos/${this._portrait}`;
    const photographersHeaderPlace = document.querySelector('.photographer-header');
    const div = document.createElement('div');
    div.innerHTML = `
    <section>
      <article>
        <h1 tabindex="0" aria-label="${this._name}">${this._name}</h1>
        <p tabindex="0" aria-label="${this._city + ', ' + this._country}">${this._city + ', ' + this._country}</p>
        <p tabindex="0" class="text-color" aria-label="${this._tagline}">${this._tagline}</p>
      </article>
      <button id="contactButtonOpen" class="contact-button" tabindex="0" aria-label="Contacter le ou la photographe ${
        this._name
      }">Contactez-moi<span class="acc-invisible">Taper entrée pour ouvrir le formulaire de contact</span></button>
      <img tabindex="0" src="${picture}" title="Photo de ${this._name}" alt="Photo de ${this._name}"></img>
    </section>
    `;
    photographersHeaderPlace.appendChild(div);
  }
  // Template-price for photographer.html
  setInsertPriceCardDOM() {
    const insertPricePlace = document.querySelector('footer');
    const divFooter = document.createElement('div');
    divFooter.innerHTML = `
    <div tabindex="0" title="Tarif journalier" aria-label="Tarif journalier">
      <span aria-label="${this._price}">${this._price}</span>
      <i aria-label="euro">\ €</i>
      <span>/ jour</span>
    </div>
    `;
    insertPricePlace.insertAdjacentElement('beforeend', divFooter);
  }
}
