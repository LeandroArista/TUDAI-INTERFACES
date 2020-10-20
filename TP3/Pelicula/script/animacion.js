document.querySelector("body").addEventListener("wheel", myFunction);

function myFunction() {
	let animacion=document.querySelector("#animacion");
	if (animacion.classList.contains('animacion-in')){
		animacion.classList.toggle('animacion-in');
		animacion.classList.add('animacion');
	}else
		if (animacion.classList.contains('animacion') ){
			animacion.classList.toggle('animacion');
			animacion.classList.add('animacion-activa');
		}else{
			animacion.classList.toggle('animacion-activa');
			animacion.classList.add('animacion');
		}
}