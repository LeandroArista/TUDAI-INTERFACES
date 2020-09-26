let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight=canvas.height;

let fichas = [];
let tablero = new Tablero(6,7,4,((6*3)+3),context);

function clearCanvas(color,width,height){
    context.fillStyle = color;
    context.fillRect(0,0,width,height);
}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}

function drawTablero(){
    let ancho = canvasWidth/100 * 50; // ancho del tablero
    let alto = canvasHeight;
    let blanco = canvasWidth/100 * 25; // 25 porciento de cada lado para acomodar fichas
    tablero.dibujarTablero(blanco,0,ancho,alto);
}
function generarfichas(){
    let cant = tablero.getCantFichas();
    let posX=0;
    let posY=0;
    let radio = tablero.getRadio();
   
    for (let i = 0; i < cant;i++ ){
        posX =aleatorio(radio*2,(canvasWidth/100 * 25) - (radio*2));
        posY= aleatorio(radio*2,canvasHeight/2);
        let circulo = new Circle(posX,posY,radio,"red",context);
        fichas.push(circulo);
    }
   
    for (let i = 0; i < cant;i++ ){
        posX = aleatorio(canvasWidth/100 * 75+radio*2,canvasWidth-radio*2); 
        posY= aleatorio(radio*2,canvasHeight/2);
        let circulo = new Circle(posX,posY,radio,"blue",context);
        fichas.push(circulo);
    }
}

function drawFichas(){
    console.log(fichas);
    for (let i = 0; i < fichas.length;i++ ){
        fichas[i].draw(context);
    }
}

function drawFigures(){
    clearCanvas('#FFFFFF',canvasWidth,canvasHeight);
    drawTablero();
    drawFichas();
}

function findClickedFigure(x,y){
    for (index = 0; index < fichas.length;index++){
        const element = fichas[index];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}


let lastClickedFigure = null;
//inicializar listeners
function iniciarjuego(){
    fichas = [];
    generarfichas();
    drawFigures();
    
   
}
iniciarjuego();

canvas.addEventListener('click', event =>{
    if (lastClickedFigure != null){
        lastClickedFigure.setHighlighted(false);
        lastClickedFigure=null;
    }
    let clickedFigure = findClickedFigure(event.layerX,event.layerY);
    if(clickedFigure != null){
        clickedFigure.setHighlighted(true);
        lastClickedFigure = clickedFigure;
    }
    drawFigures();
});
