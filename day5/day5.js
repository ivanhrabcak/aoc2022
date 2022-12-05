const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

const parseInput = (x) => {
    let ship = [[], [], [], [], [], [], [], [], []];

    let i = 0;
    let line;
    while ((line = x[i++]).includes('[')) {
        // 🤭
        const crates = line
            .slice(1)
            .replace(/]/g, '] [')
            .replace(/    /g, '] [')
            .split('] [')
            .map(x => x.replace('[', '').replace(' ', ''))
            .slice(0, 9);

        crates.forEach((crate, i) => ship[i].push(crate));
    }

    ship = ship.map((x) => x.reverse().filter(x => x !== ''));
    return ship;
}

const part1 = (input) => {
    const ship = parseInput(input);

    let i = 9;
    while (++i != input.length) {
        const [n, from, to] = input[i]
            .replace('move ', '')
            .replace(' from ', ' ')
            .replace(' to ', ' ')
            .split(' ')
            .map(x => parseInt(x));

        for (let i = 0; i < n; i++) {
            const crate = ship[from - 1].pop();
            ship[to - 1].push(crate)
        }
    }

    const result = ship.map(x => x.pop()).join('');
    console.log(result);
}

const part2 = (input) => {
    const ship = parseInput(input);

    let i = 9;
    while (++i != input.length) {
        const [n, from, to] = input[i]
            .replace('move ', '')
            .replace(' from ', ' ')
            .replace(' to ', ' ')
            .split(' ')
            .map(x => parseInt(x));

        const stack = ship[from - 1];
        const stackTaken = stack.slice(stack.length - n, stack.length);
        const stackLeft = stack.slice(0, stack.length - n);

        ship[from - 1] = stackLeft;
        stackTaken.forEach(x => ship[to - 1].push(x));
    }

    const result = ship.map(x => x.pop()).join('');
    console.log(result);   
}

part1(input);
part2(input);