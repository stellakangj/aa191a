console.log('Hello Asian Am 191! :)');


            //console.log("Hello Asia-Am 191A! :)")

// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 
addMarker(33.80,-118.06,'Precious Life Homeless Shelter','Where I volunteered as a GED tutor to support homeless women in their pursuit to gain more education')
addMarker(34.07,-118.44,'Arts Library','This is where I work and read books about art, film, and graphic design.')
addMarker(34.05,-118.45,'Tsujita LA Artisan Noodles','This is one of my favorite places to get ramen in Sawtelle!')
addMarker(34.04,-118.44,'Beard Papas','This is where Professor Albert bought the Asian Am 191 Spring 2023 class cream puffs.')

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map) 
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
        .openP

        

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}