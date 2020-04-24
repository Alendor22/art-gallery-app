class Artist {
  static all = []

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.age = data.age;
    this.gender = data.gender;
    this.painting = data.painting;
    this.save();
  }

  save() {
    Artist.all.push(this);
  }

  static addListenerToArtistForm() {
    getArtistForm().addEventListener('submit', (e) => {
    e.preventDefault();
  
    let name = getName();
    let age = getAge();
    let gender = getGender();
    
    let strongParams = {
      artist: { name, age, gender }
    };

    API.post('/v1/artists', strongParams)
      .then((artistJSON) => {
        let artistDiv = getArtists();
        artistDiv.innerHTML = "";

        Artist.loadArtists();
      });
    });  
  }

  static loadArtists() {
    API.get('/v1/artists')
    .then((artists) => {
      Artist.all = [];
      artists.forEach((data) => {
        let artist = new Artist(data);
        Artist.renderArtistFromTemplate(artist.artistTemplate(artist));
      });

      Artist.addArtistsToSelectDropDown();
      Artist.deleteArtistAction();
    });
    
  }

   // Adding a dropdown to select an artist from existing artists
    // wait till artists are created
    // add a prototype method || static method iterate through the artist to build the options for the select
    // target form and add this input(select)
    // attach artist id to each option
    // when a fetch request is made make sure they the artwork is associated to an artist
  static addArtistsToSelectDropDown() {
    let getSelectDropDown = document.querySelector("#artist-select");
    getSelectDropDown.innerHTML = "";
    Artist.all.forEach((artist) => {
      let option = document.createElement("option");
      option.setAttribute("value", `${artist.id}`);
      option.innerText += artist.name
      getSelectDropDown.appendChild(option);
    });
    $('select').formSelect(); 
  }

  static renderArtistFromTemplate(artistTemplate) {
    let artistDiv = getArtists();
    artistDiv.innerHTML += artistTemplate;
  }

  artistTemplate() {
    return `
        <div class="artist-card">
          <div class="artist-card-content">
            <P>Artist Name: ${this.name}</P>
            <p>Artist Age: ${this.age}</p>
            <p>Artist Gender: ${this.gender}</p>
            <button id="${this.id}" <a class="waves-effect waves-light btn-small">Delete Artist:</button></a>
          </div>
        </div><br>
      `;
  }

  static deleteArtistAction() { 
    let deleteButtons = getDeleteArtistButton()
      for(let i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', Artist.deleteArtistFromForm)
    }
  }

  static deleteArtistFromForm() {
    let id = this.id
    Artist.deleteArtist(id);
  }

  static deleteArtist(id) {
    API.delete(`/v1/artists/${id}`)
    .then((artist) => {
      let artistDiv = getArtists();
      artistDiv.innerHTML = "";
      Artist.all = [];
      Artist.loadArtists();
      let paintingsDiv = getPaintings();
      paintingsDiv.innerHTML = "";
      Painting.all = [];
      Painting.loadPaintings();
    }); 
  }
  
}