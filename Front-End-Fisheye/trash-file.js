// .gitignore ne veut pas faire son boulot!
const blabla = 'blabla';
let tre = 20;

// Faut-il, en l'état actuel de mon code,
// que je STRINGIFY mes photographers ou mes medias
// si je voulais accéder à leurs propriétés object
// par exemple medias.like ou medias.price ou encore photogrpahers.name ou photographers.country?

// Puis-je refacto mes 3 async function ........ await fetch(URL) ?

// Exo fun, le résultat doit être 12078
let t = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];
let d = ['a', 'a'];
d = d.length;
t = t.length;
let consoleTotal =
  Math.exp(t) / (d + d + d + d + d + d) -
  (t * t * d + t * t * d + t * t * d + t * t + t * t + t * t + t * t) -
  (t + t + t + t) +
  d +
  d;
consoleTotal = Math.floor(consoleTotal);
consoleTotal;
