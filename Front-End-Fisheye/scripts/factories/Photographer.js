//
// Ma factory des photographe pour la page index.html
// Il y a un seul photographer à chaque fis que je l'instancie -> pas de s
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
  // Ma fonction d'affichage du template pour index.html
  setUserCardDOM() {
    const picture = `./assets/fish-eye_photos/Sample%20Photos/Photographers%20ID%20Photos/${this._portrait}`;
    const photographersSectionPlace = document.querySelector('.photographer_section');
    const article = document.createElement('article');
    article.innerHTML = `
    <a id="${this._id}" href="./photographer.html?id=${this._id}">
      <img src="${picture}"></img>
      <h2>${this._name}</h2>
    </a>
    <h3>${this._city}</h3>
    <h4>${this._tagline}</h4>
    <price>${this._price}\ €</price>
    `;
    photographersSectionPlace.appendChild(article);
  }
  // Ma fonction d'affichage du template pour photographer.html
  setPhotographerPageHeaderDOM() {
    const picture = `./assets/fish-eye_photos/Sample%20Photos/Photographers%20ID%20Photos/${this._portrait}`;
    const photographersHeaderPlace = document.querySelector('.photographer-header');
    const div = document.createElement('div');
    div.innerHTML = `
    <section>
      <article>
        <h1>${this._name}</h1>
        <p>${this._city + ', ' + this._country}</p>
        <p class="text-color">${this._tagline}</p>
      </article>
      <button class="contact-button" onclick="displayModal()">Contactez-moi</button>
      <img src="${picture}"></img>
    </section>
    `;
    photographersHeaderPlace.appendChild(div);
  }
  setInsertPriceCardDOM() {
    const insertPricePlace = document.querySelector('footer');
    const divFooter = document.createElement('div');
    divFooter.innerHTML = `
    <div>
      <span>${this._price}</span>
      <i>€</i>
      <span>/ jour</span>
    </div>
    `;
    insertPricePlace.insertAdjacentElement('beforeend', divFooter);
  }
}
