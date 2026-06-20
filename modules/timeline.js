function TimelineModule(){

let years = ["2024","2025","2026"];
let i = 0;
let timer;

return{

start(){

timer = setInterval(()=>{

STATE.year = years[i];
render();

i++;

if(i>=years.length) i=0;

},1500);

},

stop(){

clearInterval(timer);

}

};

function render(){

clearMap();

let d = STATE.data[STATE.year] || {};

(d.zones?.red || []).forEach(z=>{
drawPolygon(z.coords,"red",z.name);
});

(d.zones?.blue || []).forEach(z=>{
drawPolygon(z.coords,"blue",z.name);
});

(d.frontlines || []).forEach(l=>{
drawLine(l.coords,l.name);
});

(d.points || []).forEach(p=>{
drawPoint(p.coords,p.name);
});

}

}
