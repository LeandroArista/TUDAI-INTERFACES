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
    let ancho = canvasWidth/100 * 50; // ancho del tablero
    let alto = canvasHeight;
    let blanco = canvasWidth/100 * 25; // 25 porciento de cada lado para acomodar fichas
    clearCanvas('#FFF',canvas.width,canvas.height);
    tablero.dibujarTablero(blanco,0,ancho,alto);
}

function drawFichas(){
    let blanco = canvasWidth/100 * 25; // 25 porciento de cada lado para acomodar fichas
    let cant = tablero.getCantFichas();
    let fichas = [];
    let posX=0;
    let posY=0;
    let radio = tablero.getRadio();
   
    for (let i = 0; i < cant;i++ ){
        let posX = Math.round(Math.random()* blanco/2 + radio);
        let posY= Math.round(Math.random()* canvasHeight/2+radio);
        let circulo = new Circle(posX,posY,radio,"red",context);
        fichas.push(circulo);
    }
    let ancho = canvasWidth/100 * 50; // ancho del tablero
    let alto = canvasHeight;
    for (let i = 0; i < cant;i++ ){
        let posX = Math.round(Math.random()* blanco/2 + radio); // falta arreglar esto
        let posY= Math.round(Math.random()* canvasHeight/2+radio);
        let circulo = new Circle(posX,posY,radio,"blue",context);
        fichas.push(circulo);
    }

    for (let i = 0; i < fichas.length;i++ ){
        fichas[i].draw(context);
    }

}
drawTablero();
drawFichas();