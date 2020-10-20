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


