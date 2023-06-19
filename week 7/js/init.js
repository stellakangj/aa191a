// Declare variables
let mapOptions = { 'center': [34.0709, -118.444], 'zoom': 5 };

// Use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a function to add markers
function addMarker(data) {

  if (data["Were you satisfied with your experience?"] == "positive experience") {
    L.circleMarker([data.lat, data.lng], {
      radius: 15,
      color: 'green'
    }).addTo(map).bindPopup(`<h2>${data['Where is the eatery located?']}</h2><h3>${data['Is there anything that stood out to you about the experience?']}</h3>`);
    createButton(data.lat, data.lng, data['Where is the eatery located?'], 'green');
    return;
  } else if (data["Were you satisfied with your experience?"] == "negative experience") {
    L.circleMarker([data.lat, data.lng], {
      radius: 15,
      color: 'red'
    }).addTo(map).bindPopup(`<h2>${data['Where is the eatery located?']}</h2><h3>${data['Is there anything that stood out to you about the experience?']}</h3>`);
    createButton(data.lat, data.lng, data['Where is the eatery located?'], 'red');
    return;
  } else if (data["Were you satisfied with your experience?"] == "neutral experience") {
    L.circleMarker([data.lat, data.lng], {
      radius: 15,
      color: 'yellow'
    }).addTo(map).bindPopup(`<h2>${data['Where is the eatery located?']}</h2><h3>${data['Is there anything that stood out to you about the experience?']}</h3>`);
    createButton(data.lat, data.lng, data['Where is the eatery located?'], 'yellow');
    return;
  }
}

// Process the loaded data
function processData(results) {
  results.data.forEach(data => {
    addMarker(data);
    createButton(data.lat, data.lng, data['What is the name of the place?'], data['Is there anything that stood out to you about your experience?']);
  });
}

// Create a button based on the data
function createButton(lat, lng, title) {
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsjRq560pGcFJ5u3VcKZZABdC3YiFvBfYdAqf2C8aU-3bSN_XNrnC-eftIauGwCAYCaBKwuNKXW5ir/pub?output=csv";

// Load data from the URL
function loadData(url) {
  Papa.parse(url, {
    header: true,
    download: true,
    complete: results => processData(results)
  });
}

loadData(dataUrl);
