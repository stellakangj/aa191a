// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//add buttons based on the data from a spreadsheet
function processData(results) {
    results.data.forEach(data => {
      addMarker(data);
      createButton(data.lat, data.lng, data['Where is the eatery located?']);
    });
  }
  
  function createButton(lat, lng, title) {
    const newButton = document.createElement("button");
    newButton.innerHTML = title;
    newButton.addEventListener('click', function() {
      map.flyTo([lat, lng]);
    });
    const spaceForButtons = document.getElementById('placeForButtons');
    spaceForButtons.appendChild(newButton);
  }
  

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsjRq560pGcFJ5u3VcKZZABdC3YiFvBfYdAqf2C8aU-3bSN_XNrnC-eftIauGwCAYCaBKwuNKXW5ir/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
}

loadData(dataUrl)
