let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight=canvas.height;

let figuras = [];

const FIGURE_SIZE = 40;
const NUM_FIGURES = 4;



function drawFigures(){
    clearCanvas();
    for (let i =0;i<figures.length;i++){
        figuras[i].draw(context);
    }
}

function addRectangulo(){
    let posX = Math.round(Math.random()*canvasWidth);
    let posY = Math.round(Math.random()*canvasHeight);
    let color = randomRGBA();
    let rect = new Rectangulo(posX,posY,20,20,color,context);
    figures.push(rect);
}

function addCircle(){
    let posX = Math.round(Math.random()*canvasWidth);
    let posY = Math.round(Math.random()*canvasHeight);
    let color = randomRGBA();
    let circle = new Circle(posX,posY,FIGURE_SIZE/2,color,context);
    figures.push(circle);
}
/* //Evento temporal para agregar figuras
function addFigures(){
    addFigure();
    if (figures.length < 30){
        setTimeout(addFigures,333);
    }
}

setTimeout(() => {
    addFigures();
},333);
//fin evento temporal para agregar figuras */


function findClickedFigure(x,y){
    for (index = 0; index < NUM_FIGURES;index++){
        const element = figures[index];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}

function initExample() {
    for (index = 0; index < NUM_FIGURES;index++){
        
        if(Math.random()> 0.5){
            addRectangulo();
        }else
            addCircle();
    }
}


drawFigures();
//inicializar listeners
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

initExample();

