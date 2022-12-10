const fs = require('fs');

const commands = fs.readFileSync('input.txt').toString()
    .split('\n')
    .map(x => x.split(' '))
    .map(([instruction, x]) => instruction == 'addx' ?
        [instruction, parseInt(x)] : [instruction])

const simulateCPU = (instructions, onCycle) => {
    let currentX = 1
    let cycleCount = 1

    instructions.forEach(([,value]) => {
        onCycle(currentX, cycleCount++)

        if (value) {
            onCycle(currentX, cycleCount++)
            currentX += value;
        }
    })
}

const part1 = () => {
    let signal = 0;
    simulateCPU(commands, (currentX, cycleCount) => {
        if (cycleCount % 40 == 20) {
            signal += cycleCount * currentX;
        }
    })

    console.log(signal)
}

const part2 = () => {
    let image = '';
    simulateCPU(commands, (currentX, cycleCount) => {
        let c = cycleCount - 1;
        if (c % 40 - 1 <= currentX && c % 40 + 1 >= currentX) {
            image += '#'
        } else {
            image += ' '
        }
    })

    console.log([...image].map((x, i) => (i + 1) % 40 == 0 ? `${x}\n` : x).join(''))
}

part1()
part2()