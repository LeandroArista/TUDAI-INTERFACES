class Figure {
    constructor (posX, posY, fill, context,isDraggin = false){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.isDraggin = isDraggin;
        this.highlighted = false;
        this.highlightedStyle = 'red';
    }

    setFill(fill){
        this.fill=fill;
    }

    getPosition(){
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
    isDraggin(){
        return this.isDraggin;
    }
    setDraggin(value){
        this.isDraggin=value;
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
    isPoinInside(x,y){

    }
}