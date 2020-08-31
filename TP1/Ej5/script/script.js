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
    for (let y = 0; y < heigth; y++){
        for (let x = 0; x < width; x++){
        if (x <= width/2) {
            r = Math.round(255/(width/2)*(x+1));
            g  = r;
        }else{
            g = Math.round((-255 /(width/2)*(x+1)+510));
        }
        
            setPixel(imageData, x, y, r, g, 0, 255);
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