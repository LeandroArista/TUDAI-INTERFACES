let canvas = document.querySelector('#canvas'),
context = canvas.getContext( '2d' );
let imageObj = new Image();
imageObj.src = "space.jpg";
imageObj.onload = function () {
    context.drawImage( imageObj, 0, 0 );

    let canvas2 = document.querySelector("#canvas2");
    let contexto2 = canvas2.getContext("2d");
    let img = new Image();
    img.src= "space.jpg";
    contexto2.drawImage(img, 0, 0);
    let imgData = contexto2.getImageData(0, 0, canvas2.width, canvas2.height);//script.js:90 Uncaught DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
    // invert colors
    let i;
    for (i = 0; i < imgData.data.length; i += 4) {
       let greyscale = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3 
      imgData.data[i] = greyscale;
      imgData.data[i+1] = greyscale;
      imgData.data[i+2] = greyscale;
      imgData.data[i+3] = 255;
    }
    contexto2.putImageData(imgData, 0, 0);
} ;


/* 
    let canvas = document.querySelector('#canvas'),
        context = canvas.getContext( '2d' );
    let canvas2 = document.querySelector('#canvas2'),
        context2 = canvas2.getContext( '2d' );

    function loadPicture (source) {
        let imageObj = new Image();
        imageObj.src = source;
        imageObj.onload = function () {
            context.drawImage( imageObj, 0, 0 );
        }    
    };
    function loadPicture2 (source) {
        let imageObj = new Image();
        imageObj.src = source;
        //imageObj.crossOrigin = "Anonymous";
        imageObj.onload = function () {
            context2.drawImage( imageObj, 0, 0 );
            filtersbw(context2,canvas2);

        }    
    };

    function filtersbw (contexto,canvas,width,height) {
        let imageData = contexto.getImageData( 0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;
        let numPixels = imageData.width * imageData.height;

        for ( let i = 0; i < numPixels; i++ ) {
            let r = pixels[ i * 4 ];
            let g = pixels[ i * 4 + 1 ];
            let b = pixels[ i * 4 + 2 ];

            let grey = ( r + g + b ) / 3;

            pixels[ i * 4 ] = grey;
            pixels[ i * 4 + 1 ] = grey;
            pixels[ i * 4 + 2 ] = grey;
        }
        contexto.putImageData( imageData, 0, 0 );
    };
 */

//https://www.etnassoft.com/2016/11/08/manipulacion-de-imagenes-con-javascript-parte-2/ INTERESANTE

//loadPicture("space.jpg");        
//document.querySelector('body').innerHTML+='<input type="button" href="filtersbw()" value="grises" ></input>';
//loadPicture2("space.jpg");

/* esto esta funcionando<html>
<body>

<img id="scream" src="img_the_scream.jpg" alt="The Scream" width="220" height="277">
<canvas id="myCanvas" width="220" height="277" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

<script>
document.getElementById("space.jpg").onload = function() {
  let canvas2 = document.queryselector("#canvas2");
  let contexto2 = canvas2.getContext("2d");
  let img = new.Imagen();
  img.src= "space.jpg";
  contexto2.drawImage(img, 0, 0);
  let imgData = contexto.getImageData(0, 0, canvas2.width, canvas2.height);
  // invert colors
  let i;
  for (i = 0; i < imgData.data.length; i += 4) {
     let greyscale = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3 
    imgData.data[i] = greyscale;
    imgData.data[i+1] = greyscale;
    imgData.data[i+2] = greyscale;
    imgData.data[i+3] = 255;
  }
  contexto2.putImageData(imgData, 0, 0);
};
</script>
*/ 