// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== "\n") {
        const a = parseInt(line.toString().split(' ')[0], 10);
        const b = parseInt(line.toString().split(' ')[1], 10);

        console.log(lcm(a, b));
        process.exit();
    }
}
function lcm(a,b){
 //Find the gcd first 
 let g= gcd(a, b);

 //then calculate the lcm
 return (a * b) / g;
}
function gcd(a, b) {
    // write your code here
    if(b===0)return a;
    let c=a%b;
    return  gcd(b,c)
}

module.exports = gcd;
