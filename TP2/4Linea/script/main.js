
//declaracion variables
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let texto=document.querySelector('#turno');
let cantfilas= document.querySelector('#filas').value;
let cantcolumnas = document.querySelector('#columnas').value;
let j1=document.querySelector("#j1").value;
let j2=document.querySelector("#j2").value;
let pj1=document.querySelector("#pj1");
let pj2=document.querySelector("#pj2");
let puntosj1=0;
let puntosj2=0;
let anchocanvas = 1200;
let altocanvas = 500;
let turno = j1;
let colorCanvas= "white";
let nfichasgana= 4;
let nfichasTablero = (cantfilas * cantcolumnas )/2;
let lastClickedFigure = null;
let lastpositionx=0;
let lastpositiony=0;
let arrastrar=false;
let estadojuego="jugando";
let fichas=[];
let loadimgj1 =false;
let loadimgj2 =false;
//ruta de imagenes
let srcimgj1="./img/ficharoja.png";
let srcimgj2="./img/fichaamarilla.png"; 
//variables de fichas
let ficharoja=null;
let fichaamarilla=null;
//redefino canvas
canvas.height = altocanvas;
canvas.width = anchocanvas;
//genero el tablero
let tablero = new Tablero(cantfilas,cantcolumnas,nfichasgana,nfichasTablero,context,fichaamarilla,ficharoja);


//funciones de botones
function cambiarTablero(){
    fichas =[];
    estadojuego="jugando";
    arrastrar=false;
    lastClickedFigure = null;
    lastpositionx=0;
    lastpositiony=0;
    turno=j1;
    cantfilas= document.querySelector('#filas').value;
    cantcolumnas = document.querySelector('#columnas').value;
    tablero = new Tablero(cantfilas,cantcolumnas,nfichasgana,nfichasTablero,context,fichaamarilla,ficharoja);
    clearCanvas(colorCanvas,anchocanvas,altocanvas);
    drawTablero();
    cargarImagenes();
    generarfichas();
    drawFichas();
    texto.innerHTML = "Turno del Jugador "+turno;
}
function ReiniciarJuego(){
    cambiarTablero();
}

function CambiarNombre(jugador){
  if (turno == j1 && jugador == "j1"){
      j1=document.querySelector("#j1").value;
      turno=j1;
  }if(turno == j2 && jugador == "j2"){
      j2=document.querySelector("#j2").value;
      turno=j2;
  }
  j1=document.querySelector("#j1").value;
  j2=document.querySelector("#j2").value;
  texto.innerHTML = "Turno del Jugador "+turno;
}

function ReiniciarPuntos(){
  puntosj2=0;
  puntosj1=0;
  pj1.innerHTML="Puntos: "+puntosj1;
  pj2.innerHTML="Puntos: "+puntosj2;
}

///
function clearCanvas(color,width,height){
    context.fillStyle = color;
    context.fillRect(0,0,width,height);
}

function drawTablero(){
    let ancho = anchocanvas/100 * 50; // ancho del tablero
    let alto = altocanvas;
    let blanco = anchocanvas/100 * 25; // 25 porciento de cada lado para acomodar fichas
    
    tablero.dibujarTablero(blanco,80,ancho,alto-80);
}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
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
        let circulo = new Circle(posX,posY,radio,"red",context,ficharoja);
        fichas.push(circulo);
    }
    //genero fichas derecha
    for (let i = 0; i < cant;i++ ){
        posX = aleatorio(anchocanvas/100 * 75+radio*2,anchocanvas-radio*2); 
        posY= aleatorio(radio*2,altocanvas/2);
        let circulo = new Circle(posX,posY,radio,"yellow",context,fichaamarilla);
        fichas.push(circulo);
    }
}
//dibujo fichas
function drawFichas(){
    for (let i = 0; i < fichas.length;i++ ){
            fichas[i].draw();
    }
}
//encuentra figura seleccionada
function findClickedFigure(x,y){
    for (index = 0; index < fichas.length;index++){
        const element = fichas[index];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}
//posicion en canvas
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
    if (estadojuego == "jugando" ){
        if(lastClickedFigure!=null )
            lastClickedFigure.setHighlighted(false);
        for (let i=fichas.length-1; i>=0;i--){//desde la ultima figura que se agrego
            ficha=fichas[i];
            if(fichas[i].isPointInside(x,y)){
                if (turno != j1)
                    color = "yellow";
                if(color == fichas[i].getFill()){//si es del mismo color la del turno
                    lastClickedFigure=fichas[i];
                    lastpositionx=fichas[i].getPosX();//guardo la posicion de donde se movio
                    lastpositiony=fichas[i].getPosY();
                    arrastrar = true;
                    fichas[i].setHighlighted(true);  
                    break;
                }
            }
        } 
    }
}

function Redibujar(){
    clearCanvas(colorCanvas,anchocanvas,altocanvas);
    drawTablero()
    drawFichas();
}

function noMover(){
    lastClickedFigure.setPosX(lastpositionx);
    lastClickedFigure.setPosY(lastpositiony);
    Redibujar();
}

function puntuacion(){
    if(estadojuego=="terminado")
        if(turno == j1){
            puntosj1++;
        }
        else
            puntosj2++;
    pj1.innerHTML="Puntos: "+puntosj1;
    pj2.innerHTML="Puntos: "+puntosj2;
}

function resultadoJuego(resultado){
    if(resultado == true){
        estadojuego="terminado";
        texto.innerHTML="El ganador del juego es el jugador "+turno;
        puntuacion();
    }else if(tablero.getLugaresLibres()==0){
        estadojuego="empate";
        texto.innerHTML="El juego termino en empate";
    }
    if(estadojuego == "jugando"){
        if(turno == j1)
            turno = j2;
        else
            turno = j1;
        texto.innerHTML = "Turno del Jugador "+turno;
    }
}

function eliminarFiguraSeleccionada(){
    let index = fichas.indexOf(lastClickedFigure);
    fichas.splice(index,1);
}

//eventos de mouse
function handleMouseDown(e){
    selecciona(e);
 }

function handleMouseMove(e){
    e.preventDefault();
    if (lastClickedFigure== null ){return;}
    if(arrastrar && estadojuego == "jugando"){
        let pos = ajusta(e.clientX,e.clientY);
        lastClickedFigure.setPosX(pos.x);
        lastClickedFigure.setPosY(pos.y);
        Redibujar();
    }
}

  function handleMouseUp(e){
    e.preventDefault();
    let colorTurno="red";
    if(arrastrar){
        let pos = ajusta(e.clientX,e.clientY);
        if(lastClickedFigure!=null){
            let color=lastClickedFigure.getFill();
            if(turno != j1)
                colorTurno="yellow";
            if (color == colorTurno && estadojuego == "jugando"){

                let result=tablero.agregarFicha(pos.x,pos.y,color,fichas,lastClickedFigure);
                if(result ){
                    eliminarFiguraSeleccionada();
                    let movf=tablero.getLastMove().fila;
                    let movc=tablero.getLastMove().columna;
                    for (let f = 0; f < movf; f++) {
                        tablero.setPosition(f,movc,color);
                        setTimeout(Redibujar,1000);
                        tablero.setPosition(f,movc,"white"); 
                        setTimeout(Redibujar,1000);
                    }
                    tablero.setPosition(movf,movc,color);//almaceno la ficha que cayo
                    Redibujar();
                    let resultado= tablero.isGanador(tablero.getLastMove().fila,tablero.getLastMove().columna);
                    resultadoJuego(resultado);
                    }
                }else{
                    noMover();
                } 
            }else{
                noMover();
            } 
        }
    arrastrar = false;
    lastClickedFigure=null;
  }

//carga imagenes 
  function cargarImagenes(){
    let imgj1 = new Image();
    imgj1.src = srcimgj1;
    imgj1.onload = function() {
        imgj1.width = 2 * tablero.getRadio();
        imgj1.height = 2 * tablero.getRadio();
        ficharoja = imgj1;
        loadimgj1=true;
        generarfichas();
        Redibujar();
    
    };
    let imgj2 =new Image();
    imgj2.src = srcimgj2;
    imgj2.onload = function() {
        imgj2.width = 2 * tablero.getRadio();
        imgj2.height = 2 * tablero.getRadio();
        fichaamarilla = imgj2;
        loadimgj2=true;
        generarfichas();
        Redibujar();
    }; 
    
}

function iniciarjuego(){
    clearCanvas(colorCanvas,anchocanvas,altocanvas);
    drawTablero();
    cargarImagenes();
    canvas.removeEventListener("onload",iniciarjuego,false);
}
window.onload = iniciarjuego;
canvas.addEventListener('mousedown',function(e){handleMouseDown(e);},false);
canvas.addEventListener('mousemove',function(e){handleMouseMove(e);},false);
canvas.addEventListener('mouseup',function(e){handleMouseUp(e);},false);