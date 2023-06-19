// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':14}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(lat, lng, title, message) {
    console.log(message);
    const popupContent = `
        <h2>${title}</h2>
        <p><strong>What is the name of the place?</strong> ${message['What is the name of the place?']}</p>
        <p><strong>Is there anything that stood out to you about the restaurant or your experience?</strong> ${message['Is there anything that stood out to you about the restaurant or your experience?']}</p>
    `;
    
    L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
    return message;
}


fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })

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
        addMarker(data.lat,data.lng,data['What is the name of the place?'],data['Where is the eatery located?'],data['Were you satisfied with your experience?'],data['Have you gone back?'],data['Is there anything else you would like to share?'],data['What was your other experience(s) at this restaurant like?'])
    })
}

loadData(dataUrl);

