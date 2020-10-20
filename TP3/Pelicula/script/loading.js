/*loading */
let hiddens=document.querySelectorAll(".hidden");

function clearHidden() {
	hiddens.forEach(function(item) {
		if (item.classList.contains('hidden')  ){
			item.classList.toggle('hidden');
			if(item.classList.contains('animacion-in')){
				item.classList.toggle('animacion-in');
				item.classList.add('animacion');
			}
		}
	  }, this);
}
window.addEventListener("load",function(){
	let container = document.getElementById('loading');
	setTimeout(function() {
	container.classList.add('cerrar');
		
  	// despueés de cargar le devolvemos el scroll
	  setTimeout(function(){
		clearHidden();
		document.body.style.overflowY= "visible";
		container.classList.add('hidden');
		},2000);
	}, 3000);
});