class Artist {
  static all = []

  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.age = data.age
    this.gender = data.gender
    this.painting = data.painting
    this.save()
  }

  save() {
    Artist.all.push(this)
  }

  static addArtistsToSelectDropDown() {
    this.all.forEach((artist) => {
      let getSelectDropDown = document.querySelector("#artist-select");
      let option = document.createElement("option");
      option.setAttribute("value", `${artist.id}`);
      option.innerText += artist.name
      getSelectDropDown.appendChild(option)
    }); 
  }
  
}