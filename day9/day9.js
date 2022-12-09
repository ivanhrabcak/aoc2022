const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString().split('\n')
    .map(x => x.split(' '))
    .map(([direction, ...n]) => {
        let d = [0, 0];
        if (direction == 'D') {
            d[0] = -1
        } else if (direction == 'U') {
            d[0] = 1
        } else if (direction == 'L') {
            d[1] = -1
        } else if (direction == 'R') {
            d[1] = 1
        }

        return [d, parseInt(n)]
    })

const visitedPositions = new Set();

const add = ([x, y], [x1, y1]) => [x + x1, y + y1]

const simulateMotion = (ropeLength) => {
    let rope = []
    for (let i = 0; i < ropeLength; i++) {
        rope.push([0, 0])
    }
    
    lines.forEach(([direction, n]) => {
        for (let i = 0; i < n; i++) {
            rope[0] = add(rope[0], direction);
            for (let i = 1; i < rope.length; i++) {
                const current = rope[i];
                const previous = rope[i - 1];

                let distanceX = Math.abs(current[0] - previous[0])
                let distanceY = Math.abs(current[1] - previous[1])
                while (distanceX > 1 || distanceY > 1) {
                    if (previous[0] > current[0]) {
                        rope[i][0] += 1;
                    } else if (previous[0] < current[0]) {
                        rope[i][0] -= 1;
                    }
                    
                    if (previous[1] > current[1]) {
                        rope[i][1] += 1;
                    } else if (previous[1] < current[1]) {
                        rope[i][1] -= 1;
                    }
                    
                    distanceX = Math.abs(current[0] - previous[0]);
                    distanceY = Math.abs(current[1] - previous[1]);   
                }
            }

            const tail = rope[rope.length - 1];
            visitedPositions.add(`${tail[0]}-${tail[1]}`)
        }
    })
}

simulateMotion(2)
console.log(visitedPositions.size)

visitedPositions.clear()

simulateMotion(10)
console.log(visitedPositions.size)