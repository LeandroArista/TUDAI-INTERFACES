
class Tablero{
    constructor (filas,columnas,lineas=4,cantFichas,context){
        this.filas=filas;
        this.columnas=columnas;
        this.cantFichas = cantFichas;
        this.context = context;
    
        this.lineas =lineas;//cantidad de fichas para ganar
        this.arreglo = [];
        this.figuras = [];
        this.radio= 0;

        for (let i =0; i < filas;i++){
            this.arreglo[i] = [];
            for ( let j=0; j < columnas;j++){
                this.arreglo[i][j]= 0;
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
    getCantFichas(){
        return this.cantFichas;
    }
    getRadio(){
        return this.radio;
    }

    isGanador(x,y){
        let centro = this.arreglo[x][y];
        let count=0;
        //izquierda
        let i = x; 
        while (i> x-this.lineas && i>=0 ){
            if (this.arreglo[i][y] == centro ){
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
            if (this.arreglo[i][y] == centro){
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
            if (this.arreglo[x][i] == centro){
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

    dibujarTablero(x,y,ancho,alto){
       
        this.figuras = [];
        //genero fondo todo
        let casillaancho=ancho/this.columnas;
        let casillaalto=alto/this.filas;
        let centroX =  casillaancho/2;
        let centroY =  casillaalto/2;
        let radio=centroY;
        if (centroX<centroY)
            radio=centroX;
        radio--;
        this.radio=radio;
        let color = "#9c9c9c";
        let rect = new Rectangulo(x,y,ancho,alto,color,this.context);
        this.figuras.push(rect);
     
        // genero las casillas
        let posX =x;
        let posY =y;
        for (let i =0; i < this.filas;i++){
            posX=x;
            for ( let j=0; j < this.columnas;j++){
                color="white";
                if(this.arreglo[i][j]==1)
                    color="red";
                if(this.arreglo[i][j]==2)
                    color="blue";
                let circulo = new Circle(posX+centroX,posY+centroY,radio,color,this.context);
                posX +=casillaancho;
                this.figuras.push(circulo);
            }
            posY+=casillaalto;
        }
        
        
        // dibujar el tablero
            for (let i =0;i<this.figuras.length;i++){
                this.figuras[i].draw(this.context);
    }
    }
}
