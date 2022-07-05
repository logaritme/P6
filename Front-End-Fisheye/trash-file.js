// .gitignore ne veut pas faire son boulot!

const RomanNumber = 'CXI';
RomanNumber;
let arrayRomanNumber = RomanNumber.split('');
arrayRomanNumber;

function changeLetterToNumber() {
  const x = arrayRomanNumber.indexOf(arrayRomanNumber[0]);
  x;
  const y = arrayRomanNumber.indexOf(arrayRomanNumber[1]);
  y;
  const z = arrayRomanNumber.indexOf(arrayRomanNumber[2]);
  z;
  let VAR = z;
  // Faire un forEach sur x, y, z avec cette VAR
  if (arrayRomanNumber[VAR] === 'I') {
    arrayRomanNumber.splice(VAR, 1, 1);
  } else if (arrayRomanNumber[VAR] === 'V') {
    arrayRomanNumber.splice(VAR, 1, 5);
  } else if (arrayRomanNumber[VAR] === 'X') {
    arrayRomanNumber.splice(VAR, 1, 10);
  } else if (arrayRomanNumber[VAR] === 'L') {
    arrayRomanNumber.splice(VAR, 1, 50);
  } else if (arrayRomanNumber[VAR] === 'C') {
    arrayRomanNumber.splice(VAR, 1, 100);
  } else if (arrayRomanNumber[VAR] === 'D') {
    arrayRomanNumber.splice(VAR, 1, 500);
  } else if (arrayRomanNumber[VAR] === 'M') {
    arrayRomanNumber.splice(VAR, 1, 1000);
  } else arrayRomanNumber = 'Error';
}
changeLetterToNumber(arrayRomanNumber);
arrayRomanNumber;
arrayRomanNumber = arrayRomanNumber.toString();
arrayRomanNumber;

enlevesDeArrayRomanNumber = arrayRomanNumber.splice(0, 1, 1);
enlevesDeArrayRomanNumber = arrayRomanNumber.splice(1, 1, 1);
enlevesDeArrayRomanNumber = arrayRomanNumber.splice(2, 1, 1);
arrayRomanNumber;
arrayRomanNumber =
  arrayRomanNumber[RomanNumber.length - RomanNumber.length] +
  arrayRomanNumber[RomanNumber.length - (RomanNumber.length - 1)] +
  arrayRomanNumber[RomanNumber.length - (RomanNumber.length - 2)];
arrayRomanNumber;

// Faut-il, en l'état actuel de mon code,
// que je STRINGIFY mes photographers ou mes medias
// si je voulais accéder à leurs propriétés object
// par exemple medias.like ou medias.price ou encore photogrpahers.name ou photographers.country?

// Puis-je refacto mes 3 async function ........ await fetch(URL) ?

// Result must be 12078 (using ONLY ALPHABET characters (abc, ABC) except JS coding characters( () $ _ . , ; {} [] = => ) and operators characters(+-/*=))
let t = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];
let d = ['a', 'a'];
d = d.length;
t = t.length;
let consoleTotal = Math.exp(t) / t - (t * t * d + d * t * (d * t) + d * d * (t * t)) - d * d * t + d * d;
consoleTotal = Math.floor(consoleTotal);
consoleTotal;


// Même exo méthod .charCodeat + concat
let o = '$';
let z = [].length;
o = o.charCodeAt(z);
r = o / o;
tr = r + r + r;
let trSi = o;
let di = tr * tr + r;
let mi = Math.pow(di, tr);
let R = (tr - r) * trSi + tr + tr + mi * (o / tr);
R;

six = 'six';
sixInNumber = +six;
sixInNumber;

function quiNEnEstPasUne(sixInNumber) {
  if (sixInNumber !== Boolean) {
    return (ceci = 'cela');
  }
}
quiNEnEstPasUne(sixInNumber);
console.log(ceci);

var ornik = {
  get premier() {
    if (this.journal.length > 0) {
      return this.journal[this.journal.length - this.journal.length];
    } else {
      return this.journal.length;
    }
  },
  journal: [],
};
console.log(ornik.premier); // "actu

const animals = [1, 5, 9, 18, 99];
const nombresA = [9, 99, 1, 18, 5].sort(a - b);
console.log(animals.slice(animals.length - (animals.length - 1)));
