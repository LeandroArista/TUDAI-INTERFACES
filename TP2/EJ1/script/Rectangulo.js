class Rectangulo extends Figure{
    constructor (posX, posY, fill, context, width, height){
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
    }
    draw(){
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.height);

        if (this.hifhtlighted === true){
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.strokeRect(this.posX,this.posY,this.width,this.height);
        }
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    isPointInside(x,y){
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }
}
