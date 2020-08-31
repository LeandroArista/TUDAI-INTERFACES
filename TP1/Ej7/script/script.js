"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let canvas2 = document.querySelector("#canvas2");
let ctxgrey = canvas.getContext("2d");
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 

let width= document.querySelector("#canvas").width;
let height= document.querySelector("#canvas").height;


let image1= new Image();
image1.src = "imagen.jpg";


image1.onload = function (){ 
    myDrawImageMethod(this); 
    myDrawImageMethodgrey (this);
}


function myDrawImageMethod (image){
    ctx.drawImage(image,0,0);
}

function myDrawImageMethodgrey (image){
    ctxgrey.drawImage(image,0,0);
    getGreyscale(ctxgrey);
}


// ctx.myDrawImageMethod(image1);
// ctx.putImageData(image1, 0, 0);

function getGreyscale(contexto){
    let imgData = contexto.getImageData(0, 0, width, height);
    let pixels = imgData.data;
    for (let i=0 , n = pixels.length;i < n;i+=4){
        let greyscale = pixels[i] * .3 + pixels[i+1]*.59 + pixels[i+2]* .11;
        imageData.data[index + 0]= greyscale;
        imageData.data[index + 1]= greyscale;
        imageData.data[index + 2]= greyscale;
    }
    contexto.putImageData(imgData,0,0)
}