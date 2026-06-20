let map;
let layer = L.layerGroup();

function init(m){
map = m;
layer.addTo(map);
}

function render(data){

layer.clearLayers();

// 红区
(data.zones.red || []).forEach(z=>{
L.polygon(z.coords,{
color:"red",
fillOpacity:0.3
}).addTo(layer);
});

// 蓝区
(data.zones.blue || []).forEach(z=>{
L.polygon(z.coords,{
color:"blue",
fillOpacity:0.3
}).addTo(layer);
});

// 前线
(data.frontlines || []).forEach(l=>{
L.polyline(l.coords,{
color:"black",
weight:3
}).addTo(layer);
});

// 点
(data.points || []).forEach(p=>{
L.marker(p.coords)
.addTo(layer)
.bindPopup(p.name);
});

// AI分析
document.getElementById("info").innerHTML =
"🧠 " + (data.analysis || "无分析");

}
