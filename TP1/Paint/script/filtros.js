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

    
function aplicarFiltro(filtro,valor){
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.onload= function (){
      
            canvas.setAttribute.width = image.width;
            canvas.setAttribute.height = image.height;
           
           /*  let imageAspectRatio = (1.0 * this.height)/this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            ctx.drawImage(this,0,0,imageScaledWidth,imageScaledHeight);
            let imageData = ctx.getImageData(0,0,imageScaledWidth,imageScaledHeight); */
            //ctx.drawImage(this,0,0);
            let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

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
                    filtroBrillo(imageData,valor);
                }
                case 'saturacion':{
                    filtroSaturacion(imageData,valor);
                }
                break;
                case 'blur':{
                    Blur(imageData);
                }
                break;
                //desenfoque
                case 'suavizado':{
                   // gaussian(imageData);
                }
                break;
                case 'detecbordes':{
                    filtroDetecBordes(imageData);
                }
                break;
                case 'binarizacion':{
                    filtroBinarizacion(imageData,valor);
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

            let luminosidad = .3 * r + .59 * g + .11 * b;
            r = luminosidad + 40; // rojo
            g = luminosidad + 20; // verde	
            b = luminosidad - 20; // azul									
            
            setPixel(imageData,x,y,r,g,b,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}

function limitar(sum) {
    if (sum < 0) {
      return 0;
    } else if (sum > 255) {
      return 255;
    } else {
      return sum;
    }
}
///filtro brillo
function filtroBrillo(imageData,brillo = 0){
    let factor = Math.floor(255 * (brillo / 100));
    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){

            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            r = limitar(r + factor);
            g = limitar(g + factor);
            b = limitar (b + factor);
            //console.log("R",r,"G",g,"B",b);
        
            setPixel(imageData,x,y,r,g,b,255); 
        }
    }
    ctx.putImageData(imageData,0,0);
}

//saturacion
function filtroSaturacion (imageData,nivel = 2.9) {

let RW = 0.3086,
    RG = 0.6084,
    RB = 0.082,
    RW0 = (1 - nivel) * RW + nivel,
    RW1 = (1 - nivel) * RW,
    RW2 = (1 - nivel) * RW,
    RG0 = (1 - nivel) * RG,
    RG1 = (1 - nivel) * RG + nivel,
    RG2 = (1 - nivel) * RG,
    RB0 = (1 - nivel) * RB,
    RB1 = (1 - nivel) * RB,
    RB2 = (1 - nivel) * RB + nivel

    for( let y = 0; y < imageData.height; y++){
        for ( let x = 0; x < imageData.width; x++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);

            r = RW0 * r + RG0 * g + RB0 * b;
            g = RW1 * r + RG1 * g + RB1 * b;
            b = RW2 * r + RG2 * g + RB2 * b;
            
            setPixel(imageData,x,y,r,g,b,255); 
    }
    ctx.putImageData(imageData,0,0);
  }
}


/* function convolution(imageData, operador) {
    let lado = Math.round(Math.sqrt(operador.length)),
      mitad = Math.floor(lado / 2),
    //   src = imageData.data,
      canvasWidth = imageData.width,
      canvasHeight = imageData.height,
      tempCanvas = document.createElement('canvas'),
      tempCtx = tempCanvas.getContext('2d'),
      tempData = tempCtx.createImageData(canvasWidth, canvasHeight);
  
    for (let y = 0; y < canvasHeight; y++) {
      for (let x = 0; x < canvasWidth; x++) {
          let r = 0,
          g = 0,
          b = 0;
  
        for (let y1 = 0; y1 < lado; y1++) {
          for (let x1 = 0; x1 < lado; x1++) {
            let actualY = y + y1 - mitad,
              actualX = x + x1 - mitad;
  
            if (actualY >= 0 && actualY < canvasHeight && actualX >= 0 && actualX < canvasWidth) {
              let item = operador[y1 * lado + x1];
              r += getR(imageData,x1,y1) * item;
              g += getG(imageData,x1,y1) * item;
              b += getB(imageData,x1,y1) * item;
            }
          }
        }
        setPixel(tempData,x,y,r,g,b,255);
      
      }
    }
    ctx.putImageData(tempData,0,0);
}

//filtro desenfoque
function gaussian (imageData) {
    let divider = 16
    let operator = [
      1 / divider,
      2 / divider,
      1 / divider,
      2 / divider,
      4 / divider,
      2 / divider,
      1 / divider,
      2 / divider,
      1 / divider,
    ];
    convolution(imageData, operator);
}

///filtro blur
function bigGaussian (imageData) {
    let divider = 159
    let operator = [
      2 / divider,
      4 / divider,
      5 / divider,
      4 / divider,
      2 / divider,
      4 / divider,
      9 / divider,
      12 / divider,
      9 / divider,
      4 / divider,
      5 / divider,
      12 / divider,
      15 / divider,
      12 / divider,
      5 / divider,
      4 / divider,
      9 / divider,
      12 / divider,
      9 / divider,
      4 / divider,
      2 / divider,
      4 / divider,
      5 / divider,
      4 / divider,
      2 / divider,
    ];
    convolution(imageData, operator); 
} */
function Blur (imageData)
{
    tempCanvas = document.createElement('canvas'),
    tempCtx = tempCanvas.getContext('2d'),
    tempData = tempCtx.createImageData(canvas.width, canvas.height);

   
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            let r=0, g=0, b=0;
            if  (x != 0 && y != 0 && x < canvas.width-1 && y < canvas.height-1) {           
                r = getR(imageData,x-1,y+1) + getR(imageData,x - 1, y + 1) + getR(imageData,x, y + 1) +  getR(imageData,x + 1, y + 1) + getR(imageData,x - 1, y)+getR(imageData,x, y)+ getR(imageData,x+1, y) + getR(imageData,x-1, y-1) + getR(imageData,x, y-1) +getR(imageData,x+1, y-1);
                g = getG(imageData,x-1,y+1) + getG(imageData,x - 1, y + 1) + getG(imageData,x, y + 1) +  getG(imageData,x + 1, y + 1) + getG(imageData,x - 1, y)+getG(imageData,x, y)+ getG(imageData,x+1, y) + getG(imageData,x-1, y-1) + getG(imageData,x, y-1) +getG(imageData,x+1, y-1);
                b = getB(imageData,x-1,y+1) + getB(imageData,x - 1, y + 1) + getB(imageData,x, y + 1) +  getB(imageData,x + 1, y + 1) + getB(imageData,x - 1, y)+getB(imageData,x, y)+ getB(imageData,x+1, y) + getB(imageData,x-1, y-1) + getB(imageData,x, y-1) +getB(imageData,x+1, y-1);
                setPixel(tempData,x, y,r/9,g/9,b/9,255);
            }
            else{
                r = getR(imageData,x,y);
                g = getG(imageData,x,y);
                b = getB(imageData,x,y);
                setPixel(tempData,x, y,r/9,g/9,b/9,255);
            }
        }
    }
    ctx.putImageData(tempData,0,0);
   
}
//binarizacion
 function filtroBinarizacion(imageData, tope) {
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            let r = getR(imageData,x,y);
            let g = getG(imageData,x,y);
            let b = getB(imageData,x,y);
            let valor=0.2126*r + 0.7152*g + 0.0722*b;
            //console.log(valor);
            if (valor >= tope ){
                valor=255;
            }else{
                valor=0;
            } 
            setPixel(imageData,x,y,valor,valor,valor,255);
        }
    }
    ctx.putImageData(imageData,0,0);
}
// 
function filtroDetecBordes(imageData){

}
