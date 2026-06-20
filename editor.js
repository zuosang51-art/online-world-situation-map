let map;
let drawnItems;
let mode = "view";

let data = {
  points: [],
  lines: [],
  polygons: []
};

function initEditor(m){

map = m;

// 图层
drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// 点击添加点
map.on("click", function(e){

if(mode === "point"){
addPoint(e.latlng);
}

});

}

// =====================
// 模式控制
// =====================
function setMode(m){
mode = m;
document.getElementById("status").innerText = "模式：" + m;
}

function enablePoint(){ setMode("point"); }
function enableLine(){ setMode("line"); enableDraw("polyline"); }
function enablePoly(){ setMode("poly"); enableDraw("polygon"); }

// =====================
// 添加点
// =====================
function addPoint(latlng){

let p = L.marker(latlng).addTo(drawnItems);

data.points.push({
name:"新点",
coords:[latlng.lat, latlng.lng]
});

}

// =====================
// Leaflet Draw
// =====================
let drawControl;

function enableDraw(type){

if(drawControl){
map.removeControl(drawControl);
}

drawControl = new L.Control.Draw({
draw:{
polygon: type==="polygon",
polyline: type==="polyline",
rectangle:false,
circle:false,
marker:false
}
});

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED,function(e){

let layer = e.layer;

drawnItems.addLayer(layer);

let coords = layer.getLatLngs();

if(type==="polyline"){
data.lines.push({
name:"新战线",
coords:coords[0].map(p=>[p.lat,p.lng])
});
}

if(type==="polygon"){
data.polygons.push({
name:"新区域",
coords:coords[0].map(p=>[p.lat,p.lng])
});
}

});

}

// =====================
// 导出 JSON
// =====================
function exportData(){

let json = JSON.stringify(data, null, 2);

let blob = new Blob([json], {type:"application/json"});

let url = URL.createObjectURL(blob);

let a = document.createElement("a");

a.href = url;
a.download = "data.json";

a.click();

}
