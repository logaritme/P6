

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
    const picture = `./assets/fish-eye_photos/Sample%20Photos/Photographers%20ID%20Photos/${this._portrait}`;
    const photographersSectionPlace = document.querySelector('.photographer-section'); // Pb ici
    const article = document.createElement('article');
    article.innerHTML = `
    <a id="${this._id}" href="./photographer.html?id=${this._id}" tabindex="0" aria-label="${this._name}">
      <img src="${picture}" alt="Photo de ${this._name}"></img>
      <h2>${this._name}</h2>
    </a>
    <h3 tabindex="0" aria-label="ville">${this._city}</h3>
    <h4 tabindex="0" aria-label="punchline">${this._tagline}</h4>
    <price tabindex="0" aria-label="prix">${this._price}\ €</price>
    `;
    photographersSectionPlace.appendChild(article);
  }
}
