

// Photographer factory for index.html

export class PhotographersFactory {
  constructor(thePhotographers) {
    this._name = thePhotographers.name;
    this._id = thePhotographers.id;
    this._city = thePhotographers.city;
    this._country = thePhotographers.country; 
    this._tagline = thePhotographers.tagline;
    this._price = thePhotographers.price;
    this._portrait = thePhotographers.portrait;
  }
  // Function template display the cards for index.html
  setUserCardDOM() {
    const picture = `../Front-End-Fisheye/assets/fish-eye_photos/Sample%20Photos/Photographers%20ID%20Photos/${this._portrait}`;
    const photographersSectionPlace = document.querySelector('.photographer-section');
    const article = document.createElement('article');
    article.innerHTML = `
    <a id="${this._id}" href="./photographer.html?id=${this._id}" title="Accéder à la page de ${this._name}" tabindex="0" aria-label="${this._name}">
      <img src="${picture}" alt="Photo de ${this._name}"></img>
      <h2 aria-label="${this._name}">${this._name}</h2>
    </a>
    <h3 tabindex="0" aria-label="Ville: ${this._city}">${this._city}</h3>
    <h4 tabindex="0" aria-label="Slogan: ${this._tagline}">${this._tagline}</h4>
    <price tabindex="0" aria-label="Prix: ${this._price}\ €">${this._price}\ €</price>
    `;
    photographersSectionPlace.appendChild(article);
  }
}
