document.addEventListener("DOMContentLoaded", function () {
  loadPaintings();
  loadArtists();
})

const getArtistForm = () => document.querySelector("#artist-form");
const getPaintingForm = () => document.querySelector("#insert-painting");
const getDeleteButton = () => document.querySelectorAll('.artist-card button');
const deleteButtons = getDeleteButton();

const getTitle = () => getPaintingForm().querySelector("#title").value;
const getStyle = () => getPaintingForm().querySelector("#style").value;
const getPrice = () => getPaintingForm().querySelector("#price").value;
const getPaintingImage = () => getPaintingForm().querySelector("#painting_image").value;

const getName = () => getArtistForm().querySelector('#name').value;
const getAge = () => getArtistForm().querySelector('#age').value;
const getGender = () => getArtistForm().querySelector('#gender').value;

function listenForClick() {
  paintingForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

async function loadPaintings() {
  let response = await fetch("http://localhost:3000/api/v1/paintings");
  let paintings = await response.json();
  
  paintings.forEach((data) => {
    let painting = new Painting(data);
    renderPaintingFromTemplate(paintingTemplate(painting));
  });
}

function renderPaintingFromTemplate(paintingTemplate) {
  document.querySelector('#paintings').innerHTML += paintingTemplate
}

function paintingTemplate(painting) {
  // debugger
  return `
      <div class="painting-card">
        <div class="painting-card-content">
          <img src="${painting.url}">
          <P>Title: ${painting.title}</P>
          <p>Artist: ${painting.artist.name}</p>
          <p>Style: ${painting.style}</p>
          <p>Price: ${painting.price} </p>
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
      
      let lastButton = deleteButtons.length-1;
      let deleteButton = deleteButtons[lastButton];

       deleteButton.addEventListener('click', deleteArtist);

        function deleteArtist(e){
          e.preventDefault()
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
    // debugger
    return `
        <div class="artist-card">
          <div class="artist-card-content">
            <P>Artist Name: ${artist.name}</P>
            <p>Artist Age: ${artist.age}</p>
            <p>Artist Gender: ${artist.gender}</p> 
            <button id="${artist.id}">Delete Artist:</button>
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
    
    deleteAction()
  
  }

  function deleteAction(){  
    for(let i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', deleteArtistFromForm)
    }
    
    /*function deleteArtistFromForm(e) {
      e.preventDefault()
    }*/

  }

  function deleteArtistFromForm(e) {
    const id = e.target // maybe .id
    
    e.preventDefault()
  
    fetch(`http://localhost:3000/api/v1/artists/${id}`, {
    method: 'DELETE'
    
    })
    .then(resp => resp.json())
    .then(artist => {
      Artist.all.pop(artist);

      renderArtistFromTemplate(artistTemplate());
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
