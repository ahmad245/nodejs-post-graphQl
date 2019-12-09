// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const arr = line.toString().split(' ').slice(1).map(Number);

    rl.once('line', line => {
        const keys = line.toString().split(' ').slice(1).map(Number);
        const result = [];

        for (let key of keys) {
            result.push(binarySearch(arr, key));
        }

        const res = result.join(' ');
        const maxLength = 50000;

        for (let i = 0; i < res.length; i += maxLength) {
            process.stdout.write(res.slice(i, i + maxLength));
        }

        process.stdout.write('\n');
        process.exit();
    })
});

function binarySearch(arr = [], key) {
    // write your code here
    let start=0;
    let end=arr.length-1;
    let middel=Math.floor((start+end)/2);
    while(arr[middel]!==key && start<=end){
        middel=Math.floor((start+end)/2);
            if(arr[middel]>key){
                end=middel-1;
            }
            else{
                start=middel+1;
            }
            
        }
        return arr[middel]===key?middel:-1;

}

module.exports = binarySearch;
