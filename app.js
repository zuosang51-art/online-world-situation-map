let map;
let layers = {
  red: L.layerGroup(),
  blue: L.layerGroup(),
  front: L.layerGroup(),
  points: L.layerGroup()
};

// 初始化地图
function init(m){
  map = m;

  Object.values(layers).forEach(l=>{
    l.addTo(map);
  });

  loadData(); // 首次加载

  // 🔄 每5秒刷新一次（实时核心）
  setInterval(loadData, 5000);
}

// ========================
// 拉取数据
// ========================
async function loadData(){

  try{

    const res = await fetch("./data.json?t=" + Date.now()); 
    const data = await res.json();

    render(data);

  }catch(e){
    console.log("数据加载失败", e);
  }

}

// ========================
// 渲染地图
// ========================
function render(data){

  // 清空旧图层
  Object.values(layers).forEach(l=>{
    l.clearLayers();
  });

  // 红区
  data.zones.red.forEach(z=>{
    L.polygon(z.coords,{
      color:"red",
      fillOpacity:0.3
    }).bindPopup(z.name)
      .addTo(layers.red);
  });

  // 蓝区
  data.zones.blue.forEach(z=>{
    L.polygon(z.coords,{
      color:"blue",
      fillOpacity:0.3
    }).bindPopup(z.name)
      .addTo(layers.blue);
  });

  // 前线
  data.frontlines.forEach(f=>{
    L.polyline(f.coords,{
      color:"black",
      weight:3
    }).bindPopup(f.name)
      .addTo(layers.front);
  });

  // 节点
  data.points.forEach(p=>{
    L.marker(p.coords)
      .bindPopup(p.name)
      .addTo(layers.points);
  });

}
