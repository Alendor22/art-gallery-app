document.addEventListener('DOMContentLoaded', function(){
  loadPaintings()
})

async function loadPaintings() {
  let response = await fetch('http://localhost:3000/paintings')
  let paintings = await response.json();

  paintings.forEach(data => {
    let painting = new Painting(data);
    let div = document.getElementById('painting-checkboxes');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    label.setAttribute('for', `painting-${painting.id}`);
    label.innerText = painting.title;
    checkbox.id = `painting-${painting.id}`;
    checkbox.type = "checkbox";
    checkbox.value = painting.id;
    div.appendChild(checkbox);
    div.appendChild(label);
  })
}