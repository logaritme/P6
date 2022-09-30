// Gets the right name of the photographer
function nameOfPhotographer() {
  const nameOfPhotographer =
    this._photographerId === 243
      ? 'Mimi'
      : this._photographerId === 930
      ? 'Ellie'
      : this._photographerId === 82
      ? 'Tracy'
      : this._photographerId === 527
      ? 'Nabeel'
      : this._photographerId === 925
      ? 'Rhode'
      : this._photographerId === 195
      ? 'Marcel'
      : null;

  if (!nameOfPhotographer) {
    console.error('No First name found');
    return false;
  }
}

export { nameOfPhotographer };
