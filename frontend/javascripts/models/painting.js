class Painting {
  static all = [];
  
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.style = data.style;
    this.price = data.price;
    this.url = data.url;
    this.artist = data.artist;
    this.save();
  }

  save() {
    Painting.all.push(this);
  }

}