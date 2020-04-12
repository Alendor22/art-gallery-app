class Painting {
  static all = [];
  
  constructor(data){
    this.id = data.id
    this.title = data.title;
    this.style = data.style;
    this.price = data.price;
    this.artists = data.artists;
    this.save();
  }

  save() {
    Painting.all.push(this);
  }
}