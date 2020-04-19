document.addEventListener("DOMContentLoaded", function () {
  loadPaintings();
  loadArtists(); 
})

const getArtistForm = () => document.querySelector("#artist-form");
const getPaintingForm = () => document.querySelector("#insert-painting");
const getDeleteArtistButton = () => document.querySelectorAll('.artist-card button');
const getDeletePaintingButton = () => document.querySelectorAll('.painting-card button');


const getTitle = () => getPaintingForm().querySelector("#title").value;
const getStyle = () => getPaintingForm().querySelector("#style").value;
const getPrice = () => getPaintingForm().querySelector("#price").value;
const getPaintingImage = () => getPaintingForm().querySelector("#painting_image").value;

const getName = () => getArtistForm().querySelector('#name').value;
const getAge = () => getArtistForm().querySelector('#age').value;
const getGender = () => getArtistForm().querySelector('#gender').value;

function listenForClick() {
  getPaintingForm().addEventListener("submit", (e) => {
    e.preventDefault();
  
  let title = getTitle();
  let style = getStyle();
  let price = getPrice();
  let url = document.querySelector('#url').value
  let artist_id = document.querySelector("#artist-select").value

  let strongParams = {
    painting: { title, style, price, url, artist_id }
  };

  fetch('http://localhost:3000/api/v1/paintings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(strongParams)
   })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      let painting = new Painting(data)
      renderPaintingFromTemplate(paintingTemplate(painting));
    
      let deleteButtons = getDeletePaintingButton();
      let lastButton = deleteButtons.length-1;
      let deleteButton = deleteButtons[lastButton];

       deleteButton.addEventListener('click', deletePaintingFromForm);

       function deletePaintingFromForm() {
        let id = this.id
        deletePainting(id);
      }
    })
  });
}

function deletePaintingAction(){ 
  let deleteButtons = getDeletePaintingButton() 
  for(let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', deletePaintingFromForm)
  }
}

function deletePaintingFromForm() {
  let id = this.id
  deletePainting(id);
}

function deletePainting(id) {
  fetch(`http://localhost:3000/api/v1/paintings/${id}`, {
  method: 'DELETE'
  
  })
  .then(resp => resp.json())
  .then(painting => {
    document.querySelector('#paintings').innerHTML = ""
    Painting.all = []
    loadPaintings()
  })
}

  async function loadPaintings() {
    let response = await fetch("http://localhost:3000/api/v1/paintings");
    let paintings = await response.json();
  
    paintings.forEach((data) => {
      let painting = new Painting(data);
      renderPaintingFromTemplate(paintingTemplate(painting));
    });
    deletePaintingAction()
  }

function renderPaintingFromTemplate(paintingTemplate) {
  document.querySelector('#paintings').innerHTML += paintingTemplate
}

function paintingTemplate(painting) {
  return `
      <div class="painting-card">
        <div class="painting-card-content">
          <img src="${painting.url}">
          <P>Title: ${painting.title}</P>
          <p>Artist: ${painting.artist.name}</p>
          <p>Style: ${painting.style}</p>
          <p>Price: ${painting.price} </p>
          <button id="${painting.id}">Delete Painting:</button>
        </div>
      </div><br>
    `;
}

getArtistForm().addEventListener('submit', createArtistFromForm);
  function createArtistFromForm(e) {
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

       function deleteArtistFromForm() {
        let id = this.id
        deleteArtist(id);
      }
    })
    .catch(error => {
      alert(error)
    })
}

  function renderArtistFromTemplate(artistTemplate) {
    document.querySelector('#artists').innerHTML += artistTemplate;
  }

  function artistTemplate(artist) {
    return `
        <div class="artist-card">
          <div class="artist-card-content">
            <P>Artist Name: ${artist.name}</P>
            <p>Artist Age: ${artist.age}</p>
            <p>Artist Gender: ${artist.gender}</p>
            <button id="${artist.id}">Delete Artisting:</button>
          </div>
        </div>
      `;
  }
  

  async function loadArtists() {
    let response = await fetch("http://localhost:3000/api/v1/artists");
    let artists = await response.json();

    artists.forEach((data) => {
      let artist = new Artist(data);
    renderArtistFromTemplate(artistTemplate(artist))
    })

    // Adding a dropdown to select an artist from existing artists
    // wait till artists are created
    // add a prototype method || static method iterate through the artist to build the options for the select
    // target form and add this input(select)
    // attach artist id to each option
    // when a fetch request is made make sure they the artwork is associated to an artist
    Artist.addArtistsToSelectDropDown()
    
    listenForClick()

    deleteArtistAction()
  
  }

  function deleteArtistAction(){ 
    let deleteButtons = getDeleteArtistButton() 
    for(let i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', deleteArtistFromForm)
    }

  }

  function deleteArtistFromForm() {
    let id = this.id
    deleteArtist(id);
  }
  
  function deleteArtist(id) {
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
/*async function loadArtists() {
  let response = await fetch("http://localhost:3000/api/v1/artists");
  let artists = await response.json();

  artists.forEach((data) => {
    let artist = new Artist(data);
    let div = document.getElementById("artist-checkboxes");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    label.setAttribute("for", `artist-${artist.id}`);
    label.innerText = artist.name;
    checkbox.id = `artist-${artist.id}`;
    checkbox.type = "checkbox";
    checkbox.value = artist.id;
    div.appendChild(checkbox);
    div.appendChild(label);
  });
}*/
