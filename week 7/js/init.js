// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let food = L.featureGroup();
let nonfood = L.featureGroup();

let layers = {
    "Food reccomended": food,
    "Food not reccomended": nonfood
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsjRq560pGcFJ5u3VcKZZABdC3YiFvBfYdAqf2C8aU-3bSN_XNrnC-eftIauGwCAYCaBKwuNKXW5ir/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data){
    if(data['Were you satisfied with you experience'] == "Yes"){
        circleOptions.fillColor = "red"
        food.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Food reccomended</h2>`))
        createButtons(data.lat,data.lng,data['What zip code do you live in?'])
        }
    else{
        circleOptions.fillColor = "blue"
        nonFood.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Food not reccomended</h2>`))
        createButtons(data.lat,data.lng,data['Where is the eatery located?'])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

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
    food.addTo(map) // add our layers after markers have been made
    nonFood.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([food,nonfood]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)
