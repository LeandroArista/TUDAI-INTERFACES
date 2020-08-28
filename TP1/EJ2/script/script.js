let imageData = ctx.createImageDAta(width, heigth);

for (let x =0; x < width;x++){
    for (let y=0; y< heigth;y++)
        setPixel(imageDatam,x,y,r,g,b,a);
}

ctx.putImageData(imageData,0,0);

function setPixel(imageData, x,y,r,g,b,a){
    let index = (x + y * imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+0]=g;
    imageData.data[index+0]=b;
    imageData.data[index+0]=a;
}

let image1= new Image();
image1.src = "imagen.jpg";

image1.onload = function (){ myDrawImageMethod(this);}

function myDrawImageMethod (image){
    ctx.drawImage(image,0,0);
}