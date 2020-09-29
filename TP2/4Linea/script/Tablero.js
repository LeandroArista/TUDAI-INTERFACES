
class Tablero{
    constructor (filas,columnas,lineas=4,cantFichas,context){
        this.filas=filas;
        this.columnas=columnas;
        this.cantFichas = cantFichas;
        this.context = context;
        this.lineas =lineas;//cantidad de fichas para ganar
        this.arreglo = [];
        this.figuras = [];
        this.casillas = [];
        this.radio= 0;
        this.ancho=0;
        this.alto=0;
        this.posinicx=0;
        this.posinicy=0;
        this.lastMovefila=-1;
        this.lastMovecolumna=-1;

        this.lugareslibres=filas*columnas;

        for (let i =0; i < filas;i++){
            this.arreglo[i] = [];
            for ( let j=0; j < columnas;j++){
                this.arreglo[i][j]= 0;
            }
        }
    }
    getLugaresLibres(){
        return this.lugareslibres;
    }

    getFilas(){
        return this.filas;
    }
    getColumnas(){
        return this.columnas;
    }
    getPosicionTablero(posx,posy){
        let fila = -1;
        let columna = -1;
        if(this.figuras[0].isPointInside(posx,posy)){//esta dentro del tablero
            for (let i=0;i<this.casillas.length;i++){
                if (this.casillas[i].isPointInside(posx,posy)){
                    fila = Math.floor(i / this.columnas);
                    columna =Math.floor( i % this.columnas); 
                    return {fila:fila,columna:columna};
                }
            }
        }
        return {fila:fila,columna:columna};
    }
   

    agregarFicha(posx,posy){
        let pos=this.getPosicionTablero(posx,posy);
        for (let f=this.filas-1;f>=0;f--){
            if(this.arreglo[f][pos.columna]==0){
                this.lugareslibres--;
                this.lastMovefila=f;
                this.lastMovecolumna=pos.columna;
                return true;
            }
        }
        return false;
    }

    getLastMove(){
        return {fila:this.lastMovefila,columna:this.lastMovecolumna};
    }

    getPosicion(x,y){
        return this.arreglo[x][y];
    }

    setPosition(x,y,value){
        if(value=="red")
            value=1;
        else if(value=="yellow")
                value=2;
            else 
                value=0;
        this.arreglo[x][y] = value;
    }
    getCantFichas(){
        return this.cantFichas;
    }
    getRadio(){
        return this.radio;
    }

    isGanador(fila,columna){//x col, y fila
        let centro = this.arreglo[fila][columna];
        let count=0;
        //izquierda
        let c = columna; 
        while ( c >= 0 ){
            if (this.arreglo[fila][c] == centro ){
                count++;
            }else
            break;
            c--;
        }
        if (count == this.lineas)
            return true;
        //derecha
        let count2 = 0;
        c = columna;
        while ( c < this.columnas){
            if (this.arreglo[fila][c] == centro){
                count2++;
            }else
            break;
            c++;
        }
        if (count == this.lineas || (count+count2-1) == this.lineas) //resto 1 xq cuento las dos veces el centro
            return true;
        //abajo
        count=0;
        let f = fila;
        while (f < this.filas){
            if (this.arreglo[f][columna] == centro){
                count++;
            }else
                break;
            f++;
        }
        if (count == this.lineas)
            return true;
        //diagonal sup izq (-x,-y)
        count=0;
        let i = 0;
        while ( columna-i>=0 && fila-i>=0){
            if (this.arreglo[fila-i][columna-i] == centro){
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
        while ( i+fila<this.filas && i+columna<this.columnas){
            if (this.arreglo[fila+i][columna+i] == centro){
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
        while ( i+fila<this.filas && columna-i>=0){
            if (this.arreglo[fila+i][columna-i] == centro){
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
        while ( fila-i >=0 && columna+i<this.columnas){
            if (this.arreglo[fila-i][columna+i] == centro){
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
        this.posinicx=x;
        this.posinicy=y;
        this.figuras = [];
        this.casillas= [];
        //genero fondo todo
        this.ancho=ancho;
        this.alto=alto;
        let casillaancho=ancho/this.columnas;
        let casillaalto=alto/this.filas;
        let centroX =  casillaancho/2;
        let centroY =  casillaalto/2;
        let radio=centroY;
        if (centroX<centroY)
            radio=centroX;
        radio--;
        this.radio=radio;
        let color = "#000080";
        let rect = new Rectangulo(x,y,ancho,alto,color,this.context);
        this.figuras.push(rect);
     
        // genero las casillas
        let posX =x;
        let posY =y;
        for (let i =0; i < this.filas;i++){
            posX=x;
            for ( let j=0; j < this.columnas;j++){
                color="white";
                if(this.arreglo[i][j] == 1)
                    color="red";
                if(this.arreglo[i][j] == 2 )
                    color="yellow";
                let circulo = new Circle(posX+centroX,posY+centroY,radio,color,this.context);
                this.figuras.push(circulo);
                let rec=new Rectangulo(posX,posY,casillaancho,casillaalto,color,this.context);
                this.casillas.push(rec);
                posX +=casillaancho; 
            }
            posY+=casillaalto;
        }
        // dibujar el tablero
        for (let i =0;i<this.figuras.length;i++){
            this.figuras[i].draw();
        }
    }
}