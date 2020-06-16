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
    
    API.get('/v1/paintings')
     .then((paintings) => {
        paintings.sort((a,b) => {
        let pa = a.title,
        pb = b.title 
        if (pa < pb) {
          return -1;
        }
        if (pa > pb) {
          return 1;
        }
        return 0;
       });
        paintings.forEach((data) => { 
        let painting = new Painting(data);
        
        Painting.renderPaintingFromTemplate(painting.paintingTemplate(painting));
        });

        Painting.deletePaintingAction();
      });
  }

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
  
    API.post('/v1/paintings', strongParams)
      .then((data) => {
        let paintingsDiv = getPaintings()
        paintingsDiv.innerHTML = "";
        Painting.loadPaintings();
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
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${this.url}">
        </div>
        <div class="painting-card-content">
          <span class="card-title activator grey-text text-darken-4">Title: ${this.title}<i class="material-icons right">more_horiz</i>
          </span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Tap To Show Art<i class="material-icons right">loop</i></span>
            <p>Artist: ${this.artist ? this.artist.name : "NA" }</p>
            <p>Style: ${this.style}</p>
            <p>Price: ${this.price} </p>
        </div>      
        <button id="${this.id}"<a class="waves-effect waves-light btn-small">Delete Painting:</button></a>
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