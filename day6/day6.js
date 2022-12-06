const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

const part1 = () => {
    for (let i = 3; i < input.length; i++) {
        if (new Set(
            [
                input.charAt(i-3), 
                input.charAt(i-2), 
                input.charAt(i-1), 
                input.charAt(i)
            ]).size != 4) {
                continue;
            } else {
                console.log(i+1);
                break;
            }
    }
}

const part2 = () => {
    for (let i = 13; i < input.length; i++) {
        let e = [];
        for (let k = 0; k <= 13; k++) {
            e.push(input[i - k]);
        }

        if (new Set(e).size != 14) {
            continue;
        } else {
            console.log(i+1);
            break;
        }
    }
}

part1();
part2();