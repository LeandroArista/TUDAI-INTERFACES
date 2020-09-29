
//declaracion variables
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let texto=document.querySelector('#turno');
let cantfilas= document.querySelector('#filas').value;
let cantcolumnas = document.querySelector('#columnas').value;
let anchocanvas = 1200;
let altocanvas = 500;
let turno = "Rojo";
let colorCanvas= "white";
let nfichasgana= 4;
let nfichasTablero = (cantfilas * cantcolumnas )/2;
let lastClickedFigure = null;
let lastpositionx=0;
let lastpositiony=0;
let arrastrar=false;
let estadojuego="jugando";
let fichas=[];
//
canvas.height = altocanvas;
canvas.width = anchocanvas;
//genero el tablero
let tablero = new Tablero(cantfilas,cantcolumnas,nfichasgana,nfichasTablero,context);

function cambiarTablero(){
    fichas =[];
    estadojuego="jugando";
    arrastrar=false;
    lastClickedFigure = null;
    lastpositionx=0;
    lastpositiony=0;
    turno="Rojo";
    cantfilas= document.querySelector('#filas').value;
    cantcolumnas = document.querySelector('#columnas').value;
    tablero = new Tablero(cantfilas,cantcolumnas,nfichasgana,nfichasTablero,context);//problema
    clearCanvas(colorCanvas,anchocanvas,altocanvas);
    drawTablero();
    generarfichas();
    drawFichas();

}

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
    
    tablero.dibujarTablero(blanco,80,ancho,alto-80);
}

function generarfichas(){
    let cant = tablero.getCantFichas();
    let posX=0;
    let posY=0;
    let radio = tablero.getRadio();
    fichas=[];
    //genero fichas izquierda
    for (let i = 0; i < cant;i++ ){
        posX =aleatorio(radio*2,(anchocanvas/100 * 25) - (radio*2));
        posY= aleatorio(radio*2,altocanvas/2);
        let circulo = new Circle(posX,posY,radio,"red",context);
        fichas.push(circulo);
    }
    //genero fichas derecha
    for (let i = 0; i < cant;i++ ){
        posX = aleatorio(anchocanvas/100 * 75+radio*2,anchocanvas-radio*2); 
        posY= aleatorio(radio*2,altocanvas/2);
        let circulo = new Circle(posX,posY,radio,"yellow",context);
        fichas.push(circulo);
    }
}
//dibujo fichas
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

function iniciarjuego(){
    clearCanvas(colorCanvas,anchocanvas,altocanvas);
    drawTablero();
    generarfichas();
    drawFichas();
    canvas.removeEventListener("onload",iniciarjuego,false);
}

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
    let color="red";
    if (estadojuego == "jugando"){
        if(lastClickedFigure!=null )
            lastClickedFigure.setHighlighted(false);
        for (let i=fichas.length-1; i>=0;i--){//desde la ultima que se agrego
            ficha=fichas[i];
            if(fichas[i].isPointInside(x,y)){
                if (turno != "Rojo")
                    color = "yellow";
                if(color == fichas[i].getFill()){
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
}

function handleMouseDown(e){
   selecciona(e);
}

function handleMouseMove(e){
    e.preventDefault();
    if (lastClickedFigure== null ){return;}
    if(arrastrar && estadojuego == "jugando"){
        let pos = ajusta(e.clientX,e.clientY);
        let x = pos.x;
        let y = pos.y;
        lastClickedFigure.setPosX(x);
        lastClickedFigure.setPosY(y);
        clearCanvas(colorCanvas,anchocanvas,altocanvas);
        drawTablero();
        drawFichas();
    }
  }
  function handleMouseUp(e){
    e.preventDefault();
    let colorTurno="red";
    if(arrastrar){
        let pos = ajusta(e.clientX,e.clientY);
        if(lastClickedFigure!=null){
            let color=lastClickedFigure.getFill();
            if(turno != "Rojo")
                colorTurno="yellow";
            if (color == colorTurno && estadojuego == "jugando"){
                let result=tablero.agregarFicha(pos.x,pos.y,color);
                if(result ){
                    let index = fichas.indexOf(lastClickedFigure);
                    fichas.splice(index,1);
                    clearCanvas(colorCanvas,anchocanvas,altocanvas);
                    drawTablero();
                    drawFichas();
                   
                    let resultado= tablero.isGanador(tablero.getLastMove().x,tablero.getLastMove().y);
                    if(resultado == true){
                        estadojuego="terminado";
                        texto.innerHTML="El ganador del juego es el jugador "+turno;

                    }else if(tablero.getLugaresLibres()==0){
                        estadojuego="empate";
                        texto.innerHTML="El juego termino en empate";
                    }
                    if(estadojuego == "jugando"){
                        if(turno == "Rojo")
                            turno = "Amarillo";
                        else
                            turno = "Rojo";
                        texto.innerHTML = "Turno del Jugador "+turno;
                    }
                }else{
                    lastClickedFigure.setPosX(lastpositionx);
                    lastClickedFigure.setPosY(lastpositiony);
                    clearCanvas(colorCanvas,anchocanvas,altocanvas);
                    drawTablero();
                    drawFichas();
                } 
            }else{
                    lastClickedFigure.setPosX(lastpositionx);
                    lastClickedFigure.setPosY(lastpositiony);
                    clearCanvas(colorCanvas,anchocanvas,altocanvas);
                    drawTablero();
                    drawFichas();
            } 
        }
    }
    arrastrar = false;
    lastClickedFigure=null;
  }

  function ReiniciarJuego(){
      cambiarTablero();
  }

window.onload = iniciarjuego;
canvas.addEventListener('mousedown',function(e){handleMouseDown(e);},false);
canvas.addEventListener('mousemove',function(e){handleMouseMove(e);},false);
canvas.addEventListener('mouseup',function(e){handleMouseUp(e);},false);