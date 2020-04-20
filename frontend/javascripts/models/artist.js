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

  getArtistForm().addEventListener('submit', createArtistFromForm)
  createArtistFromForm(e) {
    e.preventDefault()

    const name = getName()
    const age = getAge()
    const gender = getGender()
    
    let strongParams = {
      artist: { name, age, gender }
    };

    fetch('http://localhost:3000/api/v1/artists', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(strongParams)
   })
    .then(resp => resp.json())
    .then(artist => {
      Artist.all.push(artist);

      renderArtistFromTemplate(artistTemplate(artist));
      
      let deleteButtons = getDeleteArtistButton()
      let lastButton = deleteButtons.length-1;
      let deleteButton = deleteButtons[lastButton];

       deleteButton.addEventListener('click', deleteArtistFromForm);

       deleteArtistFromForm() {
        let id = this.id
        deleteArtist(id);
      }
    })
    .catch(error => {
      alert(error)
    })
}

  static async loadArtists() {
    let response = await fetch("http://localhost:3000/api/v1/artists");
    let artists = await response.json();

    artists.forEach((data) => {
      let artist = new Artist(data);
    Artist.renderArtistFromTemplate(artistTemplate(artist))
    })

    Artist.addArtistsToSelectDropDown()
    
    Painting.listenForClick()

    deleteArtistAction()
  
  }

   // Adding a dropdown to select an artist from existing artists
    // wait till artists are created
    // add a prototype method || static method iterate through the artist to build the options for the select
    // target form and add this input(select)
    // attach artist id to each option
    // when a fetch request is made make sure they the artwork is associated to an artist
  static addArtistsToSelectDropDown() {
    this.all.forEach((artist) => {
      let getSelectDropDown = document.querySelector("#artist-select");
      let option = document.createElement("option");
      option.setAttribute("value", `${artist.id}`);
      option.innerText += artist.name
      getSelectDropDown.appendChild(option)
    }); 
  }

  static renderArtistFromTemplate(artistTemplate) {
    document.querySelector('#artists').innerHTML += artistTemplate;
  }

  artistTemplate() {
    return `
        <div class="artist-card">
          <div class="artist-card-content">
            <P>Artist Name: ${this.name}</P>
            <p>Artist Age: ${this.age}</p>
            <p>Artist Gender: ${this.gender}</p>
            <button id="${this.id}">Delete Artist:</button>
          </div>
        </div>
      `;
  }

   deleteArtistAction(){ 
    let deleteButtons = getDeleteArtistButton() 
    for(let i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', deleteArtistFromForm)
    }
  }

  deleteArtistFromForm() {
    let id = this.id
    deleteArtist(id);
  }

  deleteArtist(id) {
    fetch(`http://localhost:3000/api/v1/artists/${id}`, {
    method: 'DELETE'
    
    })
    .then(resp => resp.json())
    .then(artist => {
      document.querySelector('#artists').innerHTML = ""
      Artist.all = []
      loadArtists()
    })
  }
  
}