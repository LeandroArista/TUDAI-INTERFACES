let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let anchocanvas = 1200;
let altocanvas = 500;
canvas.height = altocanvas;
canvas.width = anchocanvas;
let resultado=document.querySelector('#resultado');
let turno = "red";

let fichas=[];
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
        fichas[i].draw();
    }
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
let lastpositionx=0;
let lastpositiony=0;
let arrastrar=false;

function iniciarjuego(){
    clearCanvas('black',anchocanvas,altocanvas);
    
    drawTablero();
    generarfichas();
    drawFichas();
  
    canvas.removeEventListener("onload",iniciarjuego,false);
    //canvas.addEventListener("click",selecciona,false);

}

window.onload = iniciarjuego;

function ajusta(xx,yy){
    let poscanvas= canvas.getBoundingClientRect();
    let x= xx-poscanvas.left;
    let y = yy-poscanvas.top;
    return {x:x,y:y};

}

function selecciona(e){
    
    e.preventDefault();
    let pos = ajusta(e.clientX,e.clientY);
    let x = pos.x;
    let y = pos.y;
    if(lastClickedFigure!=null)
        lastClickedFigure.setHighlighted(false);
    for (let i=fichas.length-1; i>=0;i--){//desde la ultima que se agrego
        ficha=fichas[i];
        if(fichas[i].isPointInside(x,y)){
            if(turno == fichas[i].getFill()){
                lastClickedFigure=fichas[i];
                lastpositionx=fichas[i].getPosX();
                lastpositiony=fichas[i].getPosY();
                arrastrar = true;
                fichas[i].setHighlighted(true);  
                break;
            }
        }
    }
  

    
}
canvas.addEventListener('mousedown',function(e){handleMouseDown(e);},false);
canvas.addEventListener('mousemove',function(e){handleMouseMove(e);},false);
canvas.addEventListener('mouseup',function(e){handleMouseUp(e);},false);


function handleMouseDown(e){
   selecciona(e);
}

function handleMouseMove(e){
    e.preventDefault();
    if (lastClickedFigure== null){
        return;
    }
    if(arrastrar){
        let pos = ajusta(e.clientX,e.clientY);
        let x = pos.x;
        let y = pos.y;
    
        // Put your mousemove stuff here
        lastClickedFigure.setPosX(x);
        lastClickedFigure.setPosY(y);
        clearCanvas('black',anchocanvas,altocanvas);
        drawTablero();
        drawFichas();
    }
  }
  function handleMouseUp(e){
    e.preventDefault();
    if(arrastrar){
        let pos = ajusta(e.clientX,e.clientY);
        if(lastClickedFigure!=null){
            let color=lastClickedFigure.getFill();
            let result=tablero.agregarFicha(pos.x,pos.y,color);
            if(result){
                let index = fichas.indexOf(lastClickedFigure);
                fichas.splice(index,1);
                clearCanvas('black',anchocanvas,altocanvas);
                drawTablero();
                drawFichas();
                if(turno == "red")
                    turno = "blue";
                else
                    turno = "red";
                if(tablero.isGanador(tablero.getLastMove().x,tablero.getLastMove().y)==true){
                    alert("Termino el juego Ganador Jugador "+color);
                }
            }else{
                lastClickedFigure.setPosX(lastpositionx);
                lastClickedFigure.setPosY(lastpositiony);
                clearCanvas('black',anchocanvas,altocanvas);
                drawTablero();
                drawFichas();
            }   
        }
    }
    arrastrar = false;
    lastClickedFigure=null;
   
  }

