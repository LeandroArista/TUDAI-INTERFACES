function cargarImgFicha(ubicacion){

    let reader = new FileReader();
    reader.readAsDataURL(ubicacion);

    reader.onload = readerEvent =>{
        let content =readerEvent.target.result;
        let image = new Image();
        image.src = content;
        image.onload= function (){
            return image;
        }
    }
}

function calcularTamañoFicha(width,height){
    let tam = 10;
    return tam;
}

class Tablero{
    constructor (filas,columnas,lineas=4,cantFichas,context){
        this.filas=filas;
        this.columnas=columnas;
        this.cantFichas = cantFichas;
        this.context = context;
        let imgj1= "./img/ficharoja.png";
        let imgj2 ="./img/fichaazul.png";
        this.lineas =lineas;//cantidad de fichas para ganar
        this.arreglo = [];

        this.fichas = [];
        let posx = 10;
        let posy = 10;
        let lado=calcularTamañoFicha(10,10);

        for (let cant =0 ; cant< cantFichas;cant++){
            this.fichas.push(new Ficha(false,posx,posy,'#fff',context,lado,cargarImgFicha(imgj1)));

        }
        for (let i =0; i < filas;i++){
            this.arreglo[i] = [];
            for ( let j=0; j < columnas;j++){
                let ficha = new Ficha(true,i,j,'#fff',context,40,null);
                this.arreglo[i][j]= ficha;
            }
        }
    }
    getFilas(){
        return this.filas;
    }
    getColumnas(){
        return this.columnas;
    }

    getPosicion(x,y){
        return this.arreglo[x][y];
    }

    setPosition(x,y,value){
        this.arreglo[x][y] = value;
    }

    isGanador(x,y){
        let centro = this.arreglo[x][y].getColor();
        let count=0;
        //izquierda
        let i = x; 
        while (i> x-this.lineas && i>=0 ){
            if (this.arreglo[i][y].getColor() == centro ){
                count++;
            }else
            break;
            i--;
        }
        if (count == this.lineas)
            return true;
        //derecha
        let count2 = 0;
        i = x;
        while ( i> x+this.lineas && i>columnas){
            if (this.arreglo[i][y].getColor() == centro){
                count2++;
            }else
            break;
            i++;
        }
        if (count == this.lineas || (count+count2-1) == this.lineas) //resto 1 xq cuento las dos veces el centro
            return true;
        //abajo
        count=0;
        let c = y;
        while (c > y-this.lineas && c <= 0){
            if (this.arreglo[x][i].getColor() == centro){
                count++;
            }else
                break;
            c++;
        }
        if (count == this.lineas)
            return true;
        //diagonal sup izq (-x,-y)
        count=0;
        i = 0;
        while ( i < this.lineas && x-this.lineas>= 0 && y-this.lineas>=0){
            if (this.arreglo[x-i][y-i] == centro){
                count++;
            }else
                break;
            i++;
        }
        if (count == this.lineas)
            return true;
        //diagonal inf der (+x,+y)
        count2=0;
        i = 0;
        while ( i < this.lineas && x+this.lineas<this.filas && y+this.lineas<this.columnas){
            if (this.arreglo[x+i][y+i] == centro){
                count2++;
            }else
                break;
            i++;
        }
        if (count2 == this.lineas || (count+count2-1) == this.lineas)
            return true;

        //diagonal inf izq (+x,-y)
        count=0;
        i=0;
        while ( i < this.lineas && x+this.lineas<this.filas && y-this.lineas>=0){
            if (this.arreglo[x+i][y-i] == centro){
                count++;
            }
            else 
                break;
            i++
        }
        if (count == this.lineas)
            return true;
        //diagonal sup der (-x,+y)
        count2=0;
        i = 0;
        while ( i < this.lineas && x-this.lineas >= 0 && y+this.lineas<this.columnas){
            if (this.arreglo[x+i][y+i] == centro){
                count2++;
            }else
                break;
            i++;
        }
        if (count2 == this.lineas || (count+count2-1) == this.lineas)
            return true;

        return false;
    }

    dibujarTablero(){
        let ancho = this.context.width/100 * 80; // ancho del tablero
        let alto = this.context.height;
        let blanco = this.context.width/100 * 10; // 10 porciento de cada lado para acomodar fichas

        //dibujar fondo todo
        this.context.fillStyle = "#9c9c9c";
        this.context.fillRect(blanco,0,ancho,alto);
        // setear las posiciones de las fichas 
        // dibujar fichas vacias


    }
}
