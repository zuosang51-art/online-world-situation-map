let map;
let layerGroup;

function initMap(){

map = L.map('map').setView([48.5,37.8],6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

layerGroup = L.layerGroup().addTo(map);

}

function clearMap(){
layerGroup.clearLayers();
}

function drawPolygon(coords,color,name){

L.polygon(coords,{
color:color,
fillOpacity:0.3
}).addTo(layerGroup).bindPopup(name);

}

function drawLine(coords,name){

L.polyline(coords,{
color:"black",
weight:3
}).addTo(layerGroup).bindPopup(name);

}

function drawPoint(coords,name){

L.marker(coords)
.addTo(layerGroup)
.bindPopup(name);

}
