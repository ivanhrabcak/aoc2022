const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().split('\n')

const parseInput = (x) => {
    return x.slice(0, 8)
        .map((x) => [...x].filter((_, i) => i != 0 && (i - 1) % 4 == 0))
        .reduce(
            (acc, x) => {
                x.forEach((k, i) => acc[i].push(k))
                
                return acc
            }, 
            new Array(
                (x[0].length + 1) / 4
            ).fill(1).map(() => [])
        )
        .map(x => x.filter(k => k !== ' ').reverse())
}

const part1 = (input) => {
    const ship = parseInput(input)

    const result = input.slice(10)
        .map((x) => (
            x.replace('move ', '')
            .replace(' from ', ' ')
            .replace(' to ', ' ')
            .split(' ')
            .map((x, i) => i !== 0 ? parseInt(x) - 1 : parseInt(x))
        ))
        .reduce((s, [n, from, to]) => {
            for (let i = 0; i < n; i++) {
                const crate = s[from].pop()
                s[to].push(crate)
            }

            return s
        }, ship)
        .map(x => x.pop())
        .join('')

    console.log(result)
}

const part2 = (input) => {
    const ship = parseInput(input)

    const result = input.slice(10)
        .map((x) => (
            x.replace('move ', '')
            .replace(' from ', ' ')
            .replace(' to ', ' ')
            .split(' ')
            .map((x, i) => i !== 0 ? parseInt(x) - 1 : parseInt(x))
        ))
        .reduce((s, [n, from, to]) => {
            const stack = s[from]
            const stackTaken = stack.slice(stack.length - n, stack.length)
            const stackLeft = stack.slice(0, stack.length - n)

            s[from] = stackLeft
            stackTaken.forEach(x => s[to].push(x))

            return s
        }, ship)
        .map(x => x.pop())
        .join('')

    console.log(result)
}

part1(input)
part2(input)