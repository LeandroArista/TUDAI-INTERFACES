let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let paiting = document.querySelector('#lienzo');
let paintStyle=getComputedStyle(paiting);

canvas.width=parseInt(paintStyle.getPropertyValue("height"));
canvas.height=parseInt(paintStyle.getPropertyValue("height"));
let input = document.querySelector('#carga-imagen');
let selectorColor = document.querySelector('#favcolor');
let pintarLinea = false;
let goma = false;
let tipoLinea = 'round';
let color = '#000';
let ancho = 5;


function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
    };
  }

//aumentar tamaño 
function masTamaño(){
    ancho+=5;    
}

function menosTamaño(){
    if ((ancho-5)>0)
        ancho-=5;    
}

 //seleccionar color lapiz
 function asignarColor(valor){
     if (!goma)
        color=valor;
 } 

//goma
function Borrar(){
    tipoLinea = 'square';
    color = '#fff';
    ancho = 5;
    goma= true;
    document.addEventListener('mousedown',pulsaRaton,false);
	document.addEventListener('mousemove',mueveRaton,false);
	document.addEventListener('mouseup',levantaRaton,false);
}
//comenzar a pintar
function Pintar(){
    tipoLinea = 'round';
    color =selectorColor.value;
    ancho = 5;
    goma= false;
	document.addEventListener('mousedown',pulsaRaton,false);
	document.addEventListener('mousemove',mueveRaton,false);
	document.addEventListener('mouseup',levantaRaton,false);
}
//comenzar a dibujar
function pulsaRaton(capturo){
    pintarLinea = true;
    let mousePos = getMousePos(canvas, capturo);
	ctx.beginPath();
	ctx.moveTo(mousePos.x,mousePos.y);
}

function mueveRaton(capturo){
    let mousePos = getMousePos(canvas, capturo);
	if(pintarLinea){
        ctx.lineJoin = ctx.lineCap = tipoLinea;
        ctx.strokeStyle = color;
        ctx.lineWidth = ancho;
		ctx.lineTo(mousePos.x,mousePos.y);
		ctx.stroke();
	}
}
//dejar de dibujar
function levantaRaton(capturo){
	ctx.closePath();
	pintarLinea = false;
}
//borrar canvas
function borrarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//carga imagen seleccionada
input.onchange = e =>{
    borrarCanvas();
    if (input.value != ""){
        let file = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = readerEvent =>{
            let content =readerEvent.target.result;
            let image = new Image();
            image.src = content;
            image.onload= function (){
              canvas.width = image.width;
              canvas.height = image.height;
                ctx.drawImage(this,0,0);
            }
        }
        input.value="";
    }
}

///descargar imagen
function descargarImagen () {
    let link = window.document.createElement( 'a' ),
        url = canvas.toDataURL(),
        filename = 'imagen.jpg';
 
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
};