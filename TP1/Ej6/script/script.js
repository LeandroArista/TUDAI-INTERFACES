"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 
let width= 500;
let heigth= 500;
let imageData = ctx.createImageData(width, heigth);

let r = 130;
let g = 130;
let b = 217;
let a = 255;

/*paleta elegida
rgb = 130 130 217   38  28
rgb =92 92 189      27  25
rgb =65 65 164      24  25
rgb 41 41 139
*/

function drawRect(imageData, r , g, b, a){
        let r1 = r,g1 = g ,b1=b;
        for (let x = 0; x < width; x++){
            for (let y = 0; y < heigth; y++){
                let mitad= width/2;
                let cuarto=width/4;
                if (x <= cuarto) {
                    let coeficiente = (130 - 92)/cuarto;
                    let coeficiente2 = (217 - 189)/cuarto;
                    r1 = r - x * coeficiente;
                    g1 = g - x * coeficiente;
                    b1 = b - x * coeficiente2;
                }
                if(x <= mitad && x > cuarto){
                    if (x == cuarto+1 ){
                        r1 = 92;
                        g1 = 92;
                        b1 = 189;
                    }else{
                        let coeficiente = (92 - 65)/cuarto;
                        let coeficiente2 = (189-164)/cuarto;
                        r1 = r - x * coeficiente;
                        g1 = g - x * coeficiente;
                        b1 = b - x * coeficiente2;
                    }
                }
                if(x > mitad && x <= (mitad + cuarto)){
                    if (x == mitad ){
                        r1 = 65;
                        g1 = 65;
                        b1 = 164;
                    }else{
                        let coeficiente = (65-41)/cuarto;
                        let coeficiente2 = (164-139)/cuarto;
                        r1 = r - x * coeficiente;
                        g1 = g - x * coeficiente;
                        b1 = b - x * coeficiente2;
                    }
                }
                if(x > (mitad + cuarto)){
                    if (x == mitad+cuarto+1 ){
                        r1 = 41;
                        g1 = 41;
                        b1 = 139;
                    }else{
                        let coeficiente = (65-41)/cuarto;
                        let coeficiente2 = (164-139)/cuarto;
                        r1 = r - x * coeficiente;
                        g1 = g - x * coeficiente;
                        b1 = b - x * coeficiente2;
                    }
                }
                    console.log(r1,g1,b1,a);
                    setPixel(imageData, x, y, r1, g1, b1, a);
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