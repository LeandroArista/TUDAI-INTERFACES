let canvas = document.querySelector('#canvas');
let context = canvas.getContext("2d");

let file = e.target.files[0];

let reader = new FileReader();
reader.readAsDataURL(file);

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
reader.onload = readerEvent => {
    let content = readerEvent.target.result;
    let image = new Image();

    context.drawImage(this,0,0,imageScaledWidth, imageScaledHeight);

    let imageData = context.getImageDAta(0,0,imageScaledWidth,imageScaledHeight);

    //filtros
}


//filtros grises
function filtroGrises(){
    for( let j = 0; j < imageData.height; j++){
        for ( let i = 0; i < imageData.width; i++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            let grey=(r+g+b)/3;
            
            imageData[x,y].r=grey;
            imageData[x,y].g=grey;
            imageData[x,y].b=grey;
        }
        context.putImageData(imageData,0,0);
    }
}

//filtros Invertir
function filtroInvertir(){
    for( let j = 0; j < imageData.height; j++){
        for ( let i = 0; i < imageData.width; i++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            imageData[x,y].r= 255 - r;
            imageData[x,y].g= 255 - g;
            imageData[x,y].b= 255 - b;
        }
        context.putImageData(imageData,0,0);
    }
}
//filtros Sepia
function filtroSepia(){
    for( let j = 0; j < imageData.height; j++){
        for ( let i = 0; i < imageData.width; i++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            imageData[x,y].r= 255 - r;
            imageData[x,y].g= 255 - g;
            imageData[x,y].b= 255 - b;

            imageData[x,y].r= (r * .393)+(g * .769)+(b * .189);
            imageData[x,y].g= (r * .349)+(g * .686)+(b * .168);
            imageData[x,y].b= (r * .272)+(g * .534)+(b * .131);
            
        }

        context.putImageData(imageData,0,0);
    }
}
///filtro brillo
function filtroBrillo(contraste){
    if (contraste == undefined)
        contraste=100; 
    let factor = (259 * (contraste + 255))/(255 * (259 - contraste));

    for( let j = 0; j < imageData.height; j++){
        for ( let i = 0; i < imageData.width; i++){
            let r=getR(imageData,x,y);
            let g=getG(imageData,x,y);
            let b=getB(imageData,x,y);
            
            imageData[x,y].r= factor * (r - 128) + 128;
            imageData[x,y].g= factor * (g - 128) + 128;
            imageData[x,y].b= factor * (b - 128) + 128;
            
        }

        context.putImageData(imageData,0,0);
    }
}


//filtro desenfoque


///filtro blur