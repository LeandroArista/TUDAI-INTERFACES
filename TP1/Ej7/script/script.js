
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
            filtersbw(context2,canvas2,imageObj.width,imageObj.height);

        }    
    };

    function filtersbw (contexto,canvas,width,height) {
        let imageData = contexto.getImageData( 0, 0, width, height ),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

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


//https://www.etnassoft.com/2016/11/08/manipulacion-de-imagenes-con-javascript-parte-2/ INTERESANTE

loadPicture("space.jpg");        
//document.querySelector('body').innerHTML+='<input type="button" href="filtersbw()" value="grises" ></input>';
loadPicture2("space.jpg");