// declare variables
let mapOptions = { 'center': [34.0709, -118.444], 'zoom': 14 };

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data) {
  const lat = parseFloat(data.lat);
  const lng = parseFloat(data.lng);
  const title = data['What is the name of the place?'];
  const message = data['Were you satisfied with your experience?'];

  L.marker([lat, lng]).addTo(map).bindPopup(`<h2>${title}</h2><h3>${message}</h3>`);
}

// create a function to create buttons
function createButton(lat, lng, title, message) {
  const newButton = document.createElement("button");
  newButton.innerHTML = title;
  newButton.addEventListener('click', function () {
    map.flyTo([lat, lng]);
  });
  const spaceForButtons = document.getElementById('placeForButtons');
  if (spaceForButtons) {
    spaceForButtons.appendChild(newButton);
  } else {
    console.error("Element with ID 'placeForButtons' not found");
  }
}

fetch("map.geojson")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Basic Leaflet method to add GeoJSON data
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, { color: feature.properties.color });
      }
    }).bindPopup(layer => {
      return layer.feature.properties.place;
    }).addTo(map);
  });

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsjRq560pGcFJ5u3VcKZZABdC3YiFvBfYdAqf2C8aU-3bSN_XNrnC-eftIauGwCAYCaBKwuNKXW5ir/pub?output=csv";

function loadData(url) {
  Papa.parse(url, {
    header: true,
    download: true,
    complete: results => {
      for (let i = 0; i < results.data.length; i++) {
        const data = results.data[i];
        addMarker(data);
        createButton(data.lat, data.lng, data['What is the name of the place?'], data['Is there anything that stood out to you about your experience?']);
      }
    }
  });
}

loadData(dataUrl);
