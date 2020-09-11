let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');


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

input.onchange = e =>{
    borrarCanvas();
 
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = readerEvent =>{
        let content =readerEvent.target.result;
        let image = new Image();
        image.src = content;
        image.onload= function (){
            let imageAspectRatio = (1.0 * this.height)/this.width;
            let imagescaledwidth = canvas.width;
            let imagescaledheight = canvas.width * imageAspectRatio;

            ctx.drawImage(this,0,0,imagescaledwidth,imagescaledheight);
        
        }
    }
    
}

function descargarImagen (el) {
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
};


//nuevo 
/* let cw = canvas.width = 600;
let ch = canvas.height = 800;


		if (canvas && canvas.getContext) {
		  let ctx = canvas.getContext("2d");
		  if (ctx) {
		   

		    canvas.addEventListener("mousemove", function(evt) {
		      var mousePos = oMousePos(canvas, evt);
		      marcarCoords(ctx, mousePos.x, mousePos.y)
		    }, false);

		    canvas.addEventListener("mouseout", function(evt) {
		      limpiarCoords(ctx);
		    }, false);
		  }
		}

		function marcarCoords(output, x, y) {
		  output.innerHTML = ("x: " + x + ", y: " + y);
		  output.style.top = (y + 10) + "px";
		  output.style.left = (x + 10) + "px";
		  output.style.backgroundColor = "#FFF";
		  output.style.border = "1px solid #d9d9d9"
		  canvas.style.cursor = "pointer";
		}

		function limpiarCoords(output) {
		  output.innerHTML = "";
		  output.style.top = 0 + "px";
		  output.style.left = 0 + "px";
		  output.style.backgroundColor = "transparent"
		  output.style.border = "none";
		  canvas.style.cursor = "default";
		}

		function oMousePos(canvas, evt) {
		  var ClientRect = canvas.getBoundingClientRect();
		  return { //objeto
		    x: Math.round(evt.clientX - ClientRect.left),
		    y: Math.round(evt.clientY - ClientRect.top)
		  }
		}

function oMousePosScaleCSS(canvas, evt) {
  let ClientRect = canvas.getBoundingClientRect(), 
      scaleX = canvas.width / ClientRect.width,
      scaleY = canvas.height / ClientRect.height; 
      return {
      x: (evt.clientX - ClientRect.left) * scaleX, 
      y: (evt.clientY - ClientRect.top) * scaleY 
  }
}

let ultimo = {}

canvas.addEventListener("mousedown", (e)=>{
  m = oMousePosScaleCSS(canvas, e)
  ctx.clearRect(0,0,cw,ch);
  ultimo.x = m.x;
  ultimo.y = m.y;
});

canvas.addEventListener("mouseup", (e)=>{
    ultimo={}
});


canvas.addEventListener("mousemove", (e)=>{
  if(ultimo.x){
   m = oMousePosScaleCSS(canvas, e)
    ctx.beginPath();
    ctx.moveTo(ultimo.x,ultimo.y);
    ctx.lineTo(m.x,m.y);
    ctx.stroke();
    ultimo.x = m.x;
    ultimo.y = m.y;
  }
}) */