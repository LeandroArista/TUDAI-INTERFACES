
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
        this.posinic=0;
        this.lastMovex=-1;
        this.lastMovey=-1;

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
    getCanvasposicion(posx,posy){
        let x = -1;
        let y = -1;
        if(this.figuras[0].isPointInside(posx,posy)){//esta dentro del tablero
            for (let i=0;i<this.casillas.length;i++){
                if (this.casillas[i].isPointInside(posx,posy)){
                    x = Math.floor(i / this.columnas);
                    y =Math.floor( i % this.columnas); 
                }
            }
        }
        return {x:x,y:y};
    }

    agregarFicha(posx,posy,valor){
        let pos=this.getCanvasposicion(posx,posy);
        for (let f=this.filas-1;f>0;f--){
            if(this.arreglo[f][pos.y]==0){
                let color=0;
                if (valor == "red")
                    color = 1;
                else
                    color = 2;
                this.arreglo[f][pos.y] = color;
                this.lastMovex=f;
                this.lastMovey=pos.y;
                return true;
            }
        }
        return false;

    }
    getLastMove(){
        return {x:this.lastMovex,y:this.lastMovey};
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
        let c = y; 
        while ( c >= 0 ){
            if (this.arreglo[x][c] == centro ){
                count++;
            }else
            break;
            c--;
        }
        if (count == this.lineas)
            return true;
        //derecha
        let count2 = 0;
        c = y;
        while ( c < this.columnas){
            if (this.arreglo[x][c] == centro){
                count2++;
            }else
            break;
            c++;
        }
        if (count == this.lineas || (count+count2-1) == this.lineas) //resto 1 xq cuento las dos veces el centro
            return true;
        //abajo
        count=0;
        let f = x;
        while (f < this.filas){
            if (this.arreglo[f][y] == centro){
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
        while ( x-i>=0 && y-1>=0){
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
        while ( i+x<this.filas && y+i<this.columnas){
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
        while ( x+i<this.filas && y-i>=0){
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
        while ( x-i >=0 && y+i<this.columnas){
            if (this.arreglo[x-i][y+i] == centro){
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
       this.posinic=x;
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
                if(this.arreglo[i][j] == 1)
                    color="red";
                if(this.arreglo[i][j] == 2 )
                    color="blue";
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
