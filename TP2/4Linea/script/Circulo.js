class Circle extends Figure{
    constructor (posX, posY, radius, fill, context,img = null){
        super(posX,posY,fill,context,img);
        this.radius=radius;
    }
    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        this.context.fill();
        if(this.img!=null)
        this.context.drawImage(this.img, this.posX-this.radius, this.posY-this.radius, this.img.width, this.img.height);
        if (this.hifhtlighted === true){
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 10;
            this.context.strokeStyle="#9c9c9c";    
            this.context.stroke();
        }

        this.context.closePath();
        this.context.stroke();
            

    }
    getRadius(){
        return this.radius;
    }
    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) <this.radius;
    }
}