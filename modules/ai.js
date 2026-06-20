function AIModule(){

return{

start(){

let text = prompt("输入战线描述：");

let result = parse(text);

renderAI(result);

}

};

function parse(t){

return{
points:[{name:"AI点",coords:[48.5,37.5]}],
frontlines:[{name:"AI线",coords:[[48.3,37.4],[48.8,37.8]]}],
zones:{
red:[{name:"AI红区",coords:[[48.2,37.2],[48.6,37.6],[48.2,37.6]]}]
}
};

}

function renderAI(d){

clearMap();

(d.points||[]).forEach(p=>{
drawPoint(p.coords,p.name);
});

(d.frontlines||[]).forEach(l=>{
drawLine(l.coords,l.name);
});

(d.zones?.red||[]).forEach(z=>{
drawPolygon(z.coords,"red",z.name);
});

}

}
