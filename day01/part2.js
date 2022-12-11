const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();
const result = input.split('\n\n')
    .map((x) => x.split('\n'))
    .reduce((acc, x) => {
        const sum = x.reduce((s, k) => s + parseInt(k), 0);
        
        return [...acc, sum];
    }, []);

const sorted = result.sort((a, b) => b - a);

console.log(sorted.slice(0, 3).reduce((acc, x) => x + acc, 0));