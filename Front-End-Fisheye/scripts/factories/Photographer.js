// Ma factory des photographe pour la page index.html
// Il y a un seul photographer à chaque fis que je l'instancie -> pas de s
export class photographerFactory {
  constructor(photographers) {
    this._name = photographers.name;
    this._city = photographers.city;
    this._tagline = photographers.tagline;
    this._portrait = photographers.portrait;
    this._price = photographers.price;
  }
  // Ma fonction ( sans utiliser get) d'affichage du template pour index.html
  getUserCardDOM() {
    const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
    const photographersSectionPlace = document.querySelector(
      '.photographer_section'
    );
    const article = document.createElement('article');
    article.innerHTML = `
    <a>
      <img src="${picture}"></img>
      <h2>${this._name}</h2>
    </a>
    <h3>${this._city}</h3>
    <h4>${this._tagline}</h4>
    <price>${this._price}\ €</price>`;
    photographersSectionPlace.appendChild(article);
  }
  // Ma fonction ( sans utiliser get) d'affichage du template pour photographer.html
  getPhotographerPageHeaderDOM() {
    const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
    const photographersHeaderPlace = document.querySelector(
      '.photographer-header'
    );
    const div = document.createElement('div');
    div.innerHTML = `<section>
    <h1>${this._name}</h1>
    <p>${this._city + this._tagline}</p>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src="${picture}"></img>
    </section>`;
    photographersHeaderPlace.appendChild(div);
  }
}
// get getUserCardDOM() {
//   const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;

//   const article = document.createElement('article');
//   article.innerHTML = `<article>
//   <a>
//   <img>${picture}</img>
//   <h2>${this._name}</h2>
//   </a>
//   <h3>${this._city}</h3>
//   <h4>${this._tagline}</h4>
//   <price>${this._price}</price>
//   </article>`;
//   document.body.appendChild(article);
// }

// Implémentaion de fonction supplémentaire dans ma factory pour la photographer-page.html
// get getPhotographerPageHeaderDOM() {
//   const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
//   const section = document.createElement('div');
//   section.innerHTML = `<section>
//   <h1>${this._name}</h1>
//   <p>${this._city + this._tagline}</p>
//   <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
//   <img>${picture}</img>
//   </section>`;
//   // Ecrire: document.body.appendChild(section); ou ça: return section;
//   return section;
// }

// get portrait() {
// return `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
// const article = document.createElement('article');
// article.innerHTML = `<article>
// <a>
// <img>${picture}</img>
// <h2>${this._name}</h2>
// </a>
// <h3>${this._city}</h3>
// <h4>${this._tagline}</h4>
// <price>${ this._price}</price>
// </article>`;

// return article
//   }
// }

//   }
// }
// const { name, portrait, id, city, country, tagline, price } = data;

// function getUserCardDOM() {
// /*
// const domElement = `<article>
//   <a class="" href="${maVariable}">………
// </article>`
// */

// const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${portrait}`;

//   // I create an article (boxes img&h2 are in the box anchor, anchor is itself in the box article)
//   const article = document.createElement('article');
//   // I create an anchor, img, h2, h3, h4, and a price
//   const anchor = document.createElement('a');
//   const img = document.createElement('img');
//   const h2 = document.createElement('h2');
//   const h3 = document.createElement('h3');
//   const h4 = document.createElement('h4');
//   const dailyPrice = document.createElement('price');
//   // Link (How to set a dynamic link?)
//   anchor.setAttribute('href', './photographer.html/#' + id);
//   // Accessibility
//   img.setAttribute('alt', 'Photo de profil de ' + name);
//   anchor.setAttribute(
//     'alt',
//     'Lien qui redirige vers les photos et vidéos du photographe' + name
//   );
//   // I insert the source of the img
//   img.setAttribute('src', picture);
//   // I define the article, anchor and h2
//   anchor.style.cursor = 'pointer';
//   h2.textContent = name;
//   h2.style.fontSize = '36px';

//   // Accessibility
//   article.setAttribute('title', 'Informations sur le photographe: ' + name);

//   //  I define the anchor, img, h3, h4, and dailyPrice
//   h3.textContent = city + ', ' + country;
//   h3.style.color = '#901C1C';
//   h3.style.fontSize = '13px';
//   h3.style.margin = '0.2rem 0';

//   h4.textContent = tagline;
//   h4.style.fontSize = '10px';
//   h4.style.margin = '0.2rem 0';

//   dailyPrice.textContent = price + `€`;
//   dailyPrice.style.color = '#757575';
//   dailyPrice.style.fontSize = '9px';
//   // I set them all as appendChild in this article
//   anchor.appendChild(img);
//   anchor.appendChild(h2);
//   article.appendChild(anchor);
//   article.appendChild(h3);
//   article.appendChild(h4);
//   article.appendChild(dailyPrice);

//   return article;
// }

// Because of function getPhotographerPageHeaderDOM() return { getPhotographerPageHeaderDOM } added
// return {
//   name,
//   picture,
//   id,
//   city,
//   country,
//   tagline,
//   price,
//   getUserCardDOM,
//   getPhotographerPageHeaderDOM,
// };
// }
