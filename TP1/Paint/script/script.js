let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let paiting = document.querySelector('.limpiar');
let paintStyle=getComputedStyle(paiting);
canvas.width=parseInt(paintStyle.getPropertyValue("width"));
canvas.height=parseInt(paintStyle.getPropertyValue("height"));
let input = document.querySelector('#carga-imagen');

let pintarLinea = false;
let tipoLinea = 'round';
let color = '#000';
let ancho = 5;
  
window.onmousemove = function (){
    let x = window.event.clientX;
    let y = window.event.clientY;
}
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
    };
  }

function Borrar(){
    tipoLinea = 'square';
    color = '#fff';
    ancho = 5;
    document.addEventListener('mousedown',pulsaRaton,false);
	document.addEventListener('mousemove',mueveRaton,false);
	document.addEventListener('mouseup',levantaRaton,false);
}

function Pintar(){
    tipoLinea = 'round';
    color = '#000';
    ancho = 5;
	document.addEventListener('mousedown',pulsaRaton,false);
	document.addEventListener('mousemove',mueveRaton,false);
	document.addEventListener('mouseup',levantaRaton,false);
}

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
        let message = 'pintar position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
		ctx.lineTo(mousePos.x,mousePos.y);
		ctx.stroke();
	}
}

function levantaRaton(capturo){
	ctx.closePath();
	pintarLinea = false;
}

function borrarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function inicializarCanvas(img){
  // set size proportional to image
  if (img != undefined){
    canvas.height = canvas.width * (img.height / img.width);
    oc.width = img.width * 0.5;
    oc.height = img.height * 0.5;
    octx.drawImage(img, 0, 0, oc.width, oc.height);
  }
}

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