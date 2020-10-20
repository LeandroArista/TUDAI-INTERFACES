

let form=document.querySelector("#dataForm");
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    let inputs = form.querySelectorAll("input[type=text]");
        let nombre = inputs[0].value;
        let email = inputs[1].value;
        let personaje = inputs[2].value;
        let comentario = inputs[3].value;
        
  
        let data = {
            "id": id,
            "launcher": launcher,
            "client": client,
            "place": place,
            "vehicle": vehicle,
            "objective": objective
        };
        array.push(data);
        postTableContent(data);
        updateTable();
    }
});