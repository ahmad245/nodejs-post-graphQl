// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
    const values = [];
    const weights = [];
    let count = 0;

    rl.on('line', line => {
        const [v, w] = readLine(line);
        values.push(v);
        weights.push(w);

        if (++count >= itemsCount) {
            console.log(max(itemsCount, knapsackCapacity, values, weights));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function max(count, capacity, values, weights) {
    // write your code here
    let value=0;
    let rank=[];
    let  new_values=[];
    let   new_weights =[];
   // # sorting
   for(let j=0;j<count;j++){
      let  div = values[j] / weights[j];
        rank[j] = div;
    }
    
    for(let i=0;i<count;i++){
        new_values[i] = values[rank.indexOf(Math.max(...rank))]
        new_weights[i] = weights[rank.indexOf(Math.max(...rank))]
        rank[rank.indexOf(Math.max(...rank))]=0
    }


    //#packing
    for(let i=0;i<count;i++){
        if (capacity == 0) return value
        a = Math.min(new_weights[i], capacity);
        value += a * (new_values[i] / new_weights[i])
        new_weights[i] -= a
        capacity -= a
    }
    return value

}

module.exports = max;








