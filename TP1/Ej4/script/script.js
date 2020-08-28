"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 
let width= 500;
let heigth= 500;
let imageData = ctx.createImageData(width, heigth);

let r = 0;
let g = 0;
let b = 0;
let a = 255;

function drawRect(imageData, r , g, b, a){
    let coeficiente = 255/ heigth;
    for (let x = 0; x < heigth; x++){
        r = x * coeficiente;
        g = x * coeficiente;
        b = x * coeficiente;
        for (let y = 0; y < width; y++){
            setPixel(imageData, y, x, r, g, b, a);
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