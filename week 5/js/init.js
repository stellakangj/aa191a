// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':14}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(lat, lng, title, message) {
    const circleMarker = L.circleMarker([lat, lng], {
        color: 'blue', // Set the color of the circle marker
        radius: 20, // Set the radius of the circle marker
    }).addTo(map).bindPopup(`<h2>${title}</h2><h3>${message}</h3>`);

    createButtons(lat, lng, title);

    return message;
}
function createButtons(lat,lng,title,type){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })

    document.getElementById("contents").appendChild(newButton); 
}
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNq8_prhrSwK3CnY2pPptqMyGvc23Ckc5MCuGMMKljW-dDy6yq6j7XAT4m6GG69CISbD6kfBF0-ypS/pub?output=csv"



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
        addMarker(data.lat,data.lng,data['What is the name of the place?'],data['What does it look like?'],data['Write a bit about the place!'],data['How would you rate it?'],data['What type of place is it?'])
    })
}

loadData(dataUrl);

