

/* let form=document.querySelector("#dataForm");
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    let inputs = form.querySelectorAll("input[type=text]");
        let nombre = inputs[0].value;
        let email = inputs[1].value;
        let personaje = inputs[2].value;
        let comentario = inputs[3].value;
        
      let div=form.appendChild(div);
}); */

window.addEventListener("load",function(){
    // despueés de cargar le devolvemos el scroll
    document.body.style.overflowY= "visible"; 
});
let inputs=document.querySelectorAll(".formulario__input");
let selects=document.querySelector("#selectpersonaje");
selects.addEventListener('click',function(){
    if(this.value.length>=1){
        this.nextElementSibling.classList.add('fijar');
    }else{
        this.nextElementSibling.classList.remove('fijar');
    }
});
for(let i=0; i<inputs.length;i++){
    inputs[i].addEventListener('keyup',function(){
    if(this.value.length>=1){
        this.nextElementSibling.classList.add('fijar');
    }else{
        this.nextElementSibling.classList.remove('fijar');
    }
    })
}
