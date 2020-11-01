window.addEventListener("load",function(){
    // despueés de cargar le devolvemos el scroll
    document.body.style.overflowY= "visible"; 
});
let pictures = document.querySelectorAll('.picture');
pictures.forEach(element => {
    document.addEventListener('mousemove', function(e) {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 10;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 5;
        element.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      })});
