let canvas = document.querySelector('#canvas');
let pintarLinea = false;
let lineas = [];


function lapiz(){
    let ctx = canvas.getContext('2d');
    let correccionX = 0;
    let correccionY = 0;
    let posicion = canvas.getBoundingClientRect()
    correccionX = posicion.x;
    correccionY = posicion.y;
    canvas.width = 800;
    canvas.height = 600;
    
    let tipoLinea = 'round';
    let color = '#fff';
    let ancho = 10;

    canvas.addEventListener('mousedown', function(){
        pintarLinea = true;
        lineas.push([]);
    }, false);
    canvas.addEventListener('mousemove', function(event){  
        event.preventDefault();
        if (pintarLinea) {
            //let ctx = canvas.getContext('2d');
            ctx.lineJoin = ctx.lineCap = tipoLinea;
            ctx.lineWidth = ancho;
            ctx.strokeStyle = color;
            let nuevaPosicionX = 0;
            let nuevaPosicionY = 0;
            if (event.changedTouches == undefined) {
                nuevaPosicionX = event.layerX;
                nuevaPosicionY = event.layerY;
            } 
            lineas[lineas.length - 1].push({x: nuevaPosicionX, y: nuevaPosicionY});
            ctx.beginPath();
            lineas.forEach(function (segmento) {
                ctx.moveTo(segmento[0].x, segmento[0].y);
                segmento.forEach(function (punto, index) {
                    ctx.lineTo(punto.x, punto.y);
                });
            });
            ctx.stroke();
        }}, false);
    canvas.addEventListener('mouseup', function(){
        pintarLinea = false;
    }, false);
        
}


function borrarCanvas(){
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cargarImagen(){
    let ctx = canvas.getContext('2d');
    let image1= new Image();
    let archivo = document.querySelector("#carga-imagen").files[0];
    let reader = new FileReader();
    if (archivo) {
          reader.readAsDataURL(archivo );
          reader.onloadend = function () {
            image1.src= reader.result;
            image1.onload = function (){ 
                ctx.drawImage(image1,0,0);
            }
          }
        }
}


function descargarImagen (el) {
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
};