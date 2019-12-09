// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', () => {
    rl.on('line', readLine);
});

function readLine (line) {
    const arr = line.toString().split(' ').map(Number);

    console.log(max(arr));
    process.exit();
}

function max(arr) {
  
    let max=0;
    for (let i = 1; i < arr.length; i++) {
        if(arr[i]>arr[max])
        {
            max=i;
        }
          
    }
    let temp1=arr[arr.length-1];
    arr[arr.length-1]=arr[max];
    arr[max]=temp1;
    
    max=0;
    for (let j = 1; j < arr.length-1; j++) {
        if(arr[j]>arr[max] )
        {
            max=j;
        }
          
    }
    let temp=arr[arr.length-2];
    arr[arr.length-2]=arr[max];
    arr[max]=temp;
   
    return arr[arr.length-2]*arr[arr.length-1]; 
    

}

module.exports = max;
