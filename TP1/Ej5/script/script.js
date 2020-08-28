"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 
let width= 500;
let heigth= 500;
let imageData = ctx.createImageData(width, heigth);

let r = 255;
let g = 0;
let b = 255;
let a = 255;

function drawRect(imageData, r , g, b, a){
    
    for (let x = 0; x < width; x++){
        if (x <= width/2) {
            let coeficiente = 255 / (width / 2);
            r = x * coeficiente;
            g = x * coeficiente;
            b = 0;
        }else{
            let coeficiente2 = 255 / width;
            r = 255;
            g = 255 - (x * coeficiente2);
            b = 0;
        }
        for (let y = 0; y < heigth; y++){
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0]= r;
    imageData.data[index + 1]= g;
    imageData.data[index + 2]= b;
    imageData.data[index + 3]= a;
}

drawRect(imageData, r, g, b, a);
ctx.putImageData(imageData, 0, 0);