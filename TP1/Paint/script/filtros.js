//let canvas = document.querySelector('#canvas');
//let context = canvas.getContext("2d");

function getR(imageData , x , y){
    index = (x + y * imageData.width)*4;
    return imageData.data[index+0];
}
function getG(imageData , x , y){
    index = (x + y * imageData.width)*4;
    return imageData.data[index+1];
}
function getB(imageData , x , y){
    index = (x + y * imageData.width)*4;
    return imageData.data[index+2];
}

    
function aplicarFiltro(filtro){
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.onload= function (){
            let imageAspectRatio = (1.0 * this.height)/this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            ctx.drawImage(this,0,0,imageScaledWidth,imageScaledHeight);
            let imageData = ctx.getImageData(0,0,imageScaledWidth,imageScaledHeight);
            switch (filtro) {
                case 'bn':{
                    filtroBN(imageData);
                }
                break;
                case 'sepia':{
                    filtroSepia(imageData);
                }
                break;
                case 'invertir':{
                    filtroInvertir(imageData);
                }
                break;
                case 'brillo':{
                    filtroBrillo(imageData);
                }
                break;
                default:

                break;
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

//filtro blanco y negro
function filtroBN(imageData){
    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            let grey=(r+g+b)/3;
            setPixel(imageData,x,y,grey,grey,grey,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}

//filtros Invertir
function filtroInvertir(imageData){
    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);

            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
            
            setPixel(imageData,x,y,r,g,b,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}
//filtros Sepia
function filtroSepia(imageData){
    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);

            let luminosidad = .3 * r + .6 * g + .1 * b;
            r = Math.min(luminosidad + 40, 255); // rojo
            g = Math.min(luminosidad + 15, 255); // verde	
            b = luminosidad; // azul									
            
            setPixel(imageData,x,y,r,g,b,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}
///filtro brillo
function filtroBrillo(imageData,contraste){
    if (contraste == undefined)
        contraste=100; 
    let factor = (259 * (contraste + 255))/(255 * (259 - contraste));

    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            r = factor * (r - 128) + 128;
            g = factor * (g - 128) + 128;
            b = factor * (b - 128) + 128;
            
            setPixel(imageData,x,y,r,g,b,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}


//filtro desenfoque


///filtro blur