class Figure {
    constructor (posX, posY, fill, context,img = null){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.highlighted = false;
        this.img=img;
    }
    setImg(img){
        this.img=img;
    }

    setFill(fill){
        this.fill=fill;
    }

    getPosicion(){
        return {
            x : this.getPosX(),
            y : this.getPosY()
        };
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
    setPosX(x){
        this.posX=x;
    }
    setPosY(y){
        this.posY=y;
    }

    setHighlighted(value){
        this.highlighted = value;
    }

    setHighlightedStyle(style){
        this.highlightedStyle=style;
    }
    draw(){
        this.context.fillStyle = this.fill;
    }
    drawIMG(){

    }
    isPointInside(x,y){

    }

}