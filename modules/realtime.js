function RealtimeModule(){

let timer;

return{

start(){

timer = setInterval(()=>{

fetch("data.json?t="+Date.now())
.then(r=>r.json())
.then(d=>{

STATE.data = d;
STATE.year = "2024";

clearMap();

(d.zones?.red||[]).forEach(z=>{
drawPolygon(z.coords,"red",z.name);
});

(d.zones?.blue||[]).forEach(z=>{
drawPolygon(z.coords,"blue",z.name);
});

(d.frontlines||[]).forEach(l=>{
drawLine(l.coords,l.name);
});

});

},5000);

},

stop(){

clearInterval(timer);

}

};

}
