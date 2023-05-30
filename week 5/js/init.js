// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFRtopaq7HsbzCUFqaorobKb0EjQNFNbf09FDFrza2WB8ZgNwebbTK7tW58Iv2FZdNVVY3JuVPTNqA/pub?output=csv"
function loadData(url){
    Papa.parse(dataUrl, {
        header: true,
        download: true,
        complete: function(results) {
            complete: results => console.log(results) 
        }
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng,data['OpenEnded'],data['Is your English your first language?'])
    })
}

loadData(dataUrl)
//console.log ((pieceOfData))
//for (let i=0; i , results.data.length; i++){
    //console.log(results.data[i].lat)
    //add marker(sampleDataArray[i][0],
        //sampleDataArray[i][1])
        //addMarker(results.data[i].lat, results.data[i].lng)
//}