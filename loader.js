let map;
let currentData;
let animationTimer;
let progress = 0;

function init(m){
map = m;
}

function loadYear(data){

currentData = data;
progress = 0;

playAnimation();

}

function playAnimation(){

clearInterval(animationTimer);

animationTimer = setInterval(()=>{

progress += 0.02;

if(progress >= 1){
progress = 1;
clearInterval(animationTimer);
}

render(progress);

},100);

}

function render(t){

map.eachLayer(l=>{

if(l._path) map.removeLayer(l);
});

let features = currentData.features;

// 简化：线性插值前线
features.forEach(f=>{

if(f.geometry.type === "LineString"){

let coords = f.geometry.coordinates;

let partial = coords.slice(0, Math.floor(coords.length * t));

L.polyline(partial,{
color:"black",
weight:3
}).addTo(map);

}

if(f.geometry.type === "Polygon"){

L.geoJSON(f,{
style:{
color:f.properties.side==="red"?"red":"blue",
fillOpacity:0.3
}
}).addTo(map);

}

});

}
