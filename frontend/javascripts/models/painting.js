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

  
  static loadPaintings() {
    
    // let response = await fetch("http://localhost:3000/api/v1/paintings");
    API.get('/v1/paintings')
    // let paintings = await response.json();
     .then((paintings) => {
        paintings.forEach((data) => { 
        let painting = new Painting(data);
      
        Painting.renderPaintingFromTemplate(painting.paintingTemplate(painting));
        });
        Painting.listenForClick();
        Painting.deletePaintingAction();
      });
  }
    
  
  
    // paintings.forEach((data) => {
    //   let painting = new Painting(data);
    //   Painting.renderPaintingFromTemplate(painting.paintingTemplate(painting));
    // });
    // this.deletePaintingAction

  static listenForClick() {
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
  
    // fetch('http://localhost:3000/api/v1/paintings', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(strongParams)
    //  })
    API.post('/v1/paintings', strongParams)
      .then((data) => {
        let paintingsDiv = getPaintings()
        paintingsDiv.innerHTML = "";
        Painting.loadPaintings();
        // let painting = new Painting(data)
        // Painting.renderPaintingFromTemplate(painting.paintingTemplate.bind(painting));
        // console.log(painting);
      
        // let deleteButtons = getDeletePaintingButton();
        // let lastButton = deleteButtons.length-1;
        // let deleteButton = deleteButtons[lastButton];
  
        //  deleteButton.addEventListener('click', painting.deletePaintingFromForm.bind(painting));
      });      
    });
  }

  static renderPaintingFromTemplate(paintingTemplate) {
    let paintingsDiv = getPaintings()
    paintingsDiv.innerHTML += paintingTemplate;
  }

  paintingTemplate() {
    return `
      <div class="painting-card">
        <div class="painting-card-content">
          <img src="${this.url}">
            <P>Title: ${this.title}</P>
            <p>Artist: ${this.artist ? this.artist.name : "NA" }</p>
            <p>Style: ${this.style}</p>
            <p>Price: ${this.price} </p>
            <button id="${this.id}">Delete Painting:</button>
          </div>
        </div><br>
      `;
  }

  static deletePaintingAction() { 
    let deleteButtons = getDeletePaintingButton()
      for(let i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', Painting.deletePaintingFromForm);
    }
  }

  static deletePaintingFromForm() {
    let id = this.id
    Painting.deletePainting(id);
  }

  static deletePainting(id) {
    API.delete(`/v1/paintings/${id}`)
    .then((painting) => {
      let paintingsDiv = getPaintings();
      paintingsDiv.innerHTML = "";
      Painting.all = [];
      Painting.loadPaintings();
    })
  }


}