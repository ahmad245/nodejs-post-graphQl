// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(getChange(parseInt(line, 10)));
    process.exit();
}

function getChange(m){
   let coins = [10, 5, 1]  
  let  count = 0
    for(let coin of coins)
     {
         count+=Math.floor(m/coin);
         m%=coin;
         
        
     }
     return count
 }