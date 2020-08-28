"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 
let width= 500;
let heigth=500;
let imageData = ctx.createImageData(width, heigth);

let r = 255;
let g = 0;
let b = 255;
let a = 255;

function drawRect(ImageData, r , g, b, a){
    for (let x = 0; x < width; x++){
        for (let y = 0; y < heigth; y++)
            setPixel(imageData, x, y, r, g, b, a);
    }
}

function setPixel(imageData, x,y,r,g,b,a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0]= r;
    imageData.data[index + 1]= g;
    imageData.data[index + 2]= b;
    imageData.data[index + 3]= a;
}

drawRect(imageData, r, g, b, a);
ctx.putImageData(imageData, 0, 0);

/* let image1= new Image();
image1.src = "imagen.jpg";

image1.onload = function (){ myDrawImageMethod(this);}

function myDrawImageMethod (image){
    ctx.drawImage(image,0,0);
}  */