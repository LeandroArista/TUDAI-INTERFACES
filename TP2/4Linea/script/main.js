let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let anchocanvas = 1200;
let altocanvas = 500;



let fichas;
let tablero = new Tablero(6,7,4,((6*3)+3),context);

function clearCanvas(color,width,height){
    context.fillStyle = color;
    context.fillRect(0,0,width,height);
}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}

function drawTablero(){
    let ancho = anchocanvas/100 * 50; // ancho del tablero
    let alto = altocanvas;
    let blanco = anchocanvas/100 * 25; // 25 porciento de cada lado para acomodar fichas
    tablero.dibujarTablero(blanco,0,ancho,alto);
}
function generarfichas(){
    let cant = tablero.getCantFichas();
    let posX=0;
    let posY=0;
    let radio = tablero.getRadio();
   fichas=[];
    for (let i = 0; i < cant;i++ ){
        posX =aleatorio(radio*2,(anchocanvas/100 * 25) - (radio*2));
        posY= aleatorio(radio*2,altocanvas/2);
        let circulo = new Circle(posX,posY,radio,"red",context);
        fichas.push(circulo);
    }
   
    for (let i = 0; i < cant;i++ ){
        posX = aleatorio(anchocanvas/100 * 75+radio*2,anchocanvas-radio*2); 
        posY= aleatorio(radio*2,altocanvas/2);
        let circulo = new Circle(posX,posY,radio,"blue",context);
        fichas.push(circulo);
    }
}

function drawFichas(){
    for (let i = 0; i < fichas.length;i++ ){
        //aca esta el problema no se xq no dibuja
        console.log(fichas[i].getPosicion());
        fichas[i].draw();
    }
}

function drawFigures(){
    clearCanvas('black',anchocanvas,altocanvas);
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
    canvas.height = altocanvas;
    canvas.width = anchocanvas;
    fichas = [];
    generarfichas();
    drawFigures();
    canvas.removeEventListener("click",iniciarjuego,false);
    canvas.addEventListener("click",selecciona,false);
    
   
}
window.onload = iniciarjuego;

function ajusta(xx,yy){
    let poscanvas= canvas.getBoundingClientRect();
    let x= xx-poscanvas.left;
    let y = yy-poscanvas.top;
    return {x:x,y:y};

}

function selecciona(e){
    canvas.removeEventListener("click",selecciona,false);
    let pos = ajusta(e.clientX,e.clientY);
    let x = pos.x;
    let y = pos.y;
    let ficha;
    for (let i=0; i< fichas.length;i++){
        ficha=fichas[i];
        if(ficha.isPointInside(x,y)){ ///optimizar
            lastClickedFigure=ficha;
            ficha.setHighlighted(true);
            break;
        }
    }
    console.log("no seleccione nada x:",x," ,y:",y);

    if(fichas.length>0){
        canvas.addEventListener("click",selecciona,false);
    }
}
