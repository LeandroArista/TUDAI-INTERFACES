function randomRGBA(){
    let r = Math.round(Math.random()* 255);
    let g = Math.round(Math.random()* 255);
    let b = Math.round(Math.random()* 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function clearCanvas(color,width,height){
    context.fillStyle = color;
    context.fillRect(0,0,width,height);
}