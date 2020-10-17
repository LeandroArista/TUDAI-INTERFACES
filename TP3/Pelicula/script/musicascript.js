let sonando=false;
let audio=document.querySelector("#musica");
document.addEventListener("onload",function(){
	audio.load();
});
function sonarCancion(){
	if(!sonando){
		audio.play();
		sonando=true;
	}
}
function pararCancion(){
	if(sonando){
		audio.pause();
		sonando=false;	
	}
	sonando=false;
}