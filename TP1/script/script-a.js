let col=10;
let row=10;

let matriz = [];

for (let i = 0; i < row ;i++){
    matriz[i]=[];
    for (let j=0; j < col;j++){
        let num=Math.floor(Math.random()*100);
        matriz[i][j]=num;
        FileReader.innerHTMl+="<td>"+num+"</td>";
    }
    tabla.appendChild(matriz);
}

console.table(matriz);

incisoA(matriz)
//inciso a
function incisoA(){
    let max = 0;
    for (let i=0;i< row;i++){
        for (let j=0;j< row ;j++){
            if (matiz[i][j] > max){
                max=matriz[i][j];
            }
        }
    }
    console.log(max);
}


