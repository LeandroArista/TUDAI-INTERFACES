//agrego musica
window.addEventListener("load",function(){
	document.getElementById("play").addEventListener("click",sonarCancion);
	document.getElementById("stop").addEventListener("click",pararCancion);			
});
//commienzo la reproduccion de soundtrack
function sonarCancion(){
	let sonido = document.createElement("iframe");
	sonido.setAttribute("src","./media/soundtrack.mp3");
	document.body.appendChild(sonido);
	document.getElementById("play").removeEventListener("click",sonarCancion);
}
//paro la reproduccion de soundtrack
function pararCancion(){
	let iframe = document.getElementsByTagName("iframe");

	if (iframe.length > 0){
		iframe[0].parentNode.removeChild(iframe[0]);
		document.getElementById("play").addEventListener("click",pararCancion);
	}
}