

//Pintar una región rectangular de un color utilizando el Contexto de HTML5. 
let ctx = document.querySelector("#canvas").getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(250,25,150,100);
ctx.stroke();


