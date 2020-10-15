//agrego musica
let sonando=false;
let reproduccion=false;
let video=document.querySelector("#trailer");
let audio=document.querySelector("#musica");
document.addEventListener("onload",function(){
	video.load();
	audio.load();
});
//commienzo la reproduccion de soundtrack


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

video.addEventListener('ended',function(){
	video.currentTime=0;
	video.poster="./img/DB001.jpg";
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