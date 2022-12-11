const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
const result = input.split('\n\n')
    .map((x) => x.split('\n'))
    .reduce((acc, x) => {
        const sum = x.reduce((s, k) => s + parseInt(k), 0);
        
        return [...acc, sum];
    }, []);

console.log({result});

const max = Math.max(...result);

console.log(max);