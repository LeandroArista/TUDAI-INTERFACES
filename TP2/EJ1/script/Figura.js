class Figure {
    constructor (posX, posY, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.highlighted = false;
        this.highlightedStyle = 'red';
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
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;
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