let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight=canvas.height;

let figuras = [];

let tablero = new Tablero(6,7,4,((6*3)+3),context);

function clearCanvas(color,width,height){
    context.fillStyle = color;
    context.fillRect(0,0,width,height);
}



function drawTablero(){
    clearCanvas('#FFF',canvas.width,canvas.height);
    tablero.dibujarTablero();
}

drawTablero();