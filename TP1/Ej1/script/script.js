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
}

console.table(matriz);

incisoA(matriz)
//inciso a Escribir una función que retorne el valor máximo de toda la matriz 
function incisoA(){
    let max = 0;
    for (let i=0;i< row;i++){
        for (let j=0;j< row ;j++){
            if (matriz[i][j] > max){
                max=matriz[i][j];
            }
        }
    }
    console.log("valor maximo tabla "+max);
}
//inciso b Escribir una función que retorne el valor máximo contenido en las filas pares y el valor mínimo en las filas impare
function incisoB(){
    let max = 0;
    let min = 9999;
    for (let i=0;i< row;i++){
        max = 0;
        min = 9999;
        for (let j=0;j< row ;j++){
            if ( i % 2 == 0 ){
               if (matriz[i][j]>max){
                   max = matriz[i][j];
               }
            }else{
                if (matriz[i][j]<min){
                    min = matriz[i][j];
                }
            }
        }
        let fila=i;
        if ( i % 2 == 0){
            FileReader.innerHTMl+="<p> valor maximo fila "+fila+" "+max+"</p>";
            console.log("valor maximo fila "+fila+" "+max);
        } 
        else{   
            FileReader.innerHTMl+="<p>valor minimo fila "+fila+" "+min+"</p>";
            console.log("valor minimo fila "+fila+" "+min);
        }
    }
}
incisoB(matriz);

function incisoC(){
    let arreglo = [];
    for (let i=0;i< row;i++){
        arreglo[i]=0;
        for (let j=0;j< row ;j++){
            arreglo[i]+=matriz[i][j];
        }
    }
    console.log(arreglo);   
}

incisoC(matriz);