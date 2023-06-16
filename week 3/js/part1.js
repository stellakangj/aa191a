//declare variables
let mapOptions = {'center': [34.07, -118.1],'zoom':15}

// use variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 
addMarker(34.07,-118.44,'Lu Valle','Great takeout option!')
addMarker(34.05,-118.45,'Tsujita LA Artisan Noodles','This is one of my favorite places to get ramen in Sawtelle!')
addMarker(34.04,-118.44,'Beard Papas','This is where Professor Albert bought the Asian Am 191 Spring 2023 class cream puffs.')
addMarker(34.0381,-118.442,'Artelice Patesserie','This is a bakery in Sawtelle that I visited with my friends over spring break. So good!')



// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title;//button now has an id
    newButton.innerHTML = title; //button title
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    
    document.getElementById("contents").appendChild(newButton); 
}

//JavaScript let variable declaration to create a marker
// Create a circle marker
let circleMarker = L.circleMarker([34.0709, -118.444], {
    color: 'blue', // Set the color of the circle marker
    radius: 10, // Set the radius of the circle marker
  }).addTo(map).bindPopup('First point to plot');
  createButtons(34.0709, -118.444, 'Demo Point');


fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // leaflet method to to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })
