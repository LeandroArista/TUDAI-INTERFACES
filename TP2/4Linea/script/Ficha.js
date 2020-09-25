class Ficha{
    constructor(vacio,posX,posY,color,context,lado,imagen){
        this.posX = posX;
        this.posY = posY;
        this.imagen = imagen;
        this.vacio=vacio;
        this.color = color;
        this.context = context;
        this.lado = lado;
        this.radio = lado/2;
    }
    setFill(fill){
        this.fill=fill;
    }

    getPosition(){
        return {
            x : this.getPosX(),
            y : this.getComputedStyle()
        };
    }
    setPosX(posX){
        this.posX =posX;
    }
    setPosY(posY){
        this.posY =posY;
    }

    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;
    }

    getColor(){
        return this.color;
    }
    isVacio(){
        return this.vacio;
    }
    setImg(imagen){
        this.vacio=false;
        this.imagen=imagen;
    }
    
    draw(){
        if (vacio){
            //dibujar circulo vacio
            this.context.fillStyle = this.fill;
            this.context.beginPath();
            this.context.arc(this.posX+radio,this.posY+radio,this.radio,0,2*Math.PI);
            this.context.fill();
            this.context.closePath();
            
        }else{
            this.context.draw(x,y,this.imagen,lado,lado);//dibuja imagen de ficha
        }

    }
    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) <this.radio;
    }

}