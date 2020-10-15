//agrego musica

//commienzo la reproduccion de soundtrack
let sonando=false;
let reproduccion=false;
let video=document.querySelector("#trailer");
let audio=document.querySelector("#musica");

video.addEventListener('playing',function(){
	if(!audio.paused){
		audio.pause();
		sonando=true;
		reproduccion=true;
	}
});
video.addEventListener('pause',function(){
	if(sonando){
		audio.play();
		reproduccion=false;
	}
});

function sonarCancion(){
	if(!sonando && !reproduccion){
		audio.play();
		sonando=true;
	}
}
function pararCancion(){
	if(sonando ){
		audio.pause();
		sonando=false;
	}
}