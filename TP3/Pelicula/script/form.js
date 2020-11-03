window.addEventListener("load",function(){
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

document.querySelector("body").addEventListener("wheel", movimiento);
function movimiento(){
    let formulario=document.querySelectorAll(".contenerdor");
    let scrollTop=document.documentElement.scrollTop;
    if (formulario.offsetTop -500  < scrollTop){
        if(formulario.classList.contains("desaparecer")){
            formulario.classList.remove("desaparecer");
            formulario.classList.add("entrada");
        }
    }else{
        if(formulario.classList.contains("entrada")){
            formulario.classList.remove("entrada");
            formulario.classList.add("desaparecer");
        }
    }
}

