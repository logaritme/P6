// Ci-dessous LightBoxFactory Model
export class PrevNextFactory {
  constructor(media) {
    this._id = media.id;
    this._photographerId = media.photographerId;
    this._title = media.title;
    this._image = media.image;
    this._video = media.video;
    this._likes = media.likes;
    this._date = media.date;
    this._price = media.price;
  }

  renderPhotographerId() {
    if (this._id == newIdMediaShownInLightBox) {
      console.log(this._photographerId);
    }
  }
}
