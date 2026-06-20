function EditorModule(){

return{

start(){

map.on("click",onClick);

},

stop(){

map.off("click",onClick);

}

};

function onClick(e){

drawPoint([e.latlng.lat,e.latlng.lng],"新点");

console.log("坐标：",e.latlng);

}

}
