document.querySelector("body").addEventListener("wheel", myFunction);

function myFunction() {
	let animacion=document.querySelector("#animacion");
	let scrollTop=document.documentElement.scrollTop;
	let scrollHeight = document.documentElement.scrollHeight;
	let clientHeight = document.documentElement.clientHeight;
	let windowHeight = scrollHeight - clientHeight;
	let porcentaje = scrollTop / windowHeight *100;

	//cuando carga la pagina
	if (animacion.classList.contains('animacion-in')){
		animacion.classList.toggle('animacion-in');
		animacion.classList.add('animacion');
	}
	if(porcentaje<=45){
		if (animacion.classList.contains('animacion-activa')){
			animacion.classList.toggle('animacion-activa');
			animacion.classList.add('animacion');
		}
	}else if(porcentaje>45 && porcentaje <75){/*seccion media*/
				if (animacion.classList.contains('animacion')){
					animacion.classList.toggle('animacion');
					animacion.classList.add('animacion-activa');
				}
				if (animacion.classList.contains('animacion-super')){
					animacion.classList.toggle('animacion-super');
					animacion.classList.add('animacion-activa');
				}
			}else if(porcentaje>=75){
					animacion.classList.toggle('animacion-activa');
					animacion.classList.add('animacion-super');
			}
}	
