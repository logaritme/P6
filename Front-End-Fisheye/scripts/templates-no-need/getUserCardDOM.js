
// Exemple ci-dessous qui à l'appel de la fonction createMovieCard
// installe les datas texte et img dans le DOM
// class MovieCard {
//   constructor(movie) {
//       this._movie = movie
//   }

//   createMovieCard() {
//       const $wrapper = document.createElement('div')
//       $wrapper.classList.add('movie-card-wrapper')

//       const movieCard = `
//           <div class="movie-thumbnail center">
//               <img
//                   alt="${this._movie.title}"
//                   src="${this._movie.thumbnail}"
//               />
//           </div>
//           <h3 class="fs-16 center">${this._movie.title}</h3>
//           <p class="fs-14 center">
//               <span>${this._movie.released_in}</span>
//               -
//               <span>${this._movie.duration}</span>
//           </p>
//       `
      
//       $wrapper.innerHTML = movieCard
//       return $wrapper
//   }
// }

// Vrai projet ici
export class UserCardDOM {
  constructor(photographers) {
    this.photographers = photographers;
  }
 setUserCardDOM() {
  const picture = `./assets/fish-eye_photos/Sample\ Photos/Photographers\ ID\ Photos/${this._portrait}`;
  const photographersPart = document.querySelector('.photographer_section');
  const article = document.createElement('article');
  article.innerHTML = `<article>
  <a>
  <img>${picture}</img>
  <h2>${this._name}</h2>
  </a>
  <h3>${this._city}</h3>
  <h4>${this._tagline}</h4>
  <price>${this._price}</price>
  </article>`;
  photographersPart.appendChild(article);
  return article;
}
}
