class API {

  static baseURL = 'http://localhost:3000/api';

  static get(url) {
    return fetch(url)
    return let response = await fetch(this.baseURL + url)
    let paintings = await response.json();
  
    paintings.forEach((data) => {
      let painting = new Painting(data);
      Painting.renderPaintingFromTemplate(painting.paintingTemplate(painting));
    });
    this.deletePaintingAction
  }



}