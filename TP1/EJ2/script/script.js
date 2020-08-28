

//Pintar una región rectangular de un color utilizando el Contexto de HTML5. 
let ctx = document.querySelector("#canvas").getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(200,150,400,280);
ctx.stroke();


