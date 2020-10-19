//agrego musica
let sonando=false;
let reproduccion=false;
let video=document.querySelector("#trailer");
let audio=document.querySelector("#musica");

/* loading*/
/* let Loading=(loadingDelayHidden=0)=>{
	let loading=null;
	const myLoadingDelayHidden=loadingDelayHidden;
	let interval=null;
	function hideLoading(){
		if(loading!==null){
			loading.classList.remove('show');
			setTimeout(function(){
				loading.remove()
			},myLoadingDelayHidden)
		}
	}
	function decrement(){
		if(loadingDelayHidden>0)
			loadingDelayHidden--;
	
	}
	function init(){
		document.addEventListener('DOMContentLoaded',function(){
			loading=document.querySelector('.loading');
			
		
			interval=setInterval(decrement, 100);
			
			
			if(loadingDelayHidden===0){
				hideLoading();
				clearInterval(interval);
			}else{
				loadingDelayHidden--;
			}
		})
	}return{'init':init}}

Loading(3).init(); */	

/*carga de elementos en la pagina */
document.addEventListener("onload",function(){
	video.load();
	audio.load();
});
/* seccion reproduccion musica y video*/
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
	sonando=false;
}

document.querySelector("body").addEventListener("wheel", myFunction);

function myFunction() {
	let animacion=document.querySelector("#animacion");
	if (animacion.classList.contains('animacion') ){
		animacion.classList.toggle('animacion');
		animacion.classList.add('animacion-activa');
	}else{
		animacion.classList.toggle('animacion-activa');
		animacion.classList.add('animacion');
	}

}

 /*Cuenta regresiva*/
const DATE_TARGET = new Date('11/09/2020 08:00 PM');

const SPAN_DAYS = document.querySelector('span#days');
const SPAN_HOURS = document.querySelector('span#hours');
const SPAN_MINUTES = document.querySelector('span#minutes');
const SPAN_SECONDS = document.querySelector('span#seconds');

const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

function updateText(valor){
	if(valor>=0 && valor<10)
		valor="0"+valor;
	return valor;
}

function updateCountdown() {
    const NOW = new Date()
    const DURATION = DATE_TARGET - NOW;
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);

    SPAN_DAYS.textContent = updateText(REMAINING_DAYS);
    SPAN_HOURS.textContent = updateText(REMAINING_HOURS);
    SPAN_MINUTES.textContent = updateText(REMAINING_MINUTES);
    SPAN_SECONDS.textContent = updateText(REMAINING_SECONDS);
}
updateCountdown();
setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);