const fs = require('fs')
const input = fs.readFileSync('input.txt').toString()
    .split('\n\n')
    .map(x => x.split('\n'))
    .map(x => x.map(x => JSON.parse(x)))

const isArray = (x) => typeof x === 'object'

const arraysEqual = (a, b) => {
    if (a.length != b.length) {
        return false
    }

    for (let i = 0; i < a.length; i++) {
        const x = a[i]
        const y = b[i]

        if (isArray(x) || isArray(y)) {
            if (isArray(x) != isArray(y)) {
                return false
            }

            if (!arraysEqual(x, y)) {
                return false
            }
        } else if (x != y) {
            return false
        }
    }

    return true
}

const compare = (a, b) => {
	if (!isArray(a) && !isArray(b)) {
        return a - b
    }

    if (!isArray(a)) {
        a = [a]
    } else if (!isArray(b)) {
        b = [b]
    }
    
    let length
    if (a.length <= b.length) {
        length = a.length
    } else {
        length = b.length
    }

    for (let i = 0; i < length; i++) {
        const x  = a[i]
        const y = b[i]
        const comparison = compare(x, y)
        
        if (comparison != 0) {
            return comparison
        }
    }

    return a.length - b.length
}

const part1 = () => {
    let sum = 0
    for (let i = 0; i < input.length; i++) {
        const [first, second] = input[i]
        const difference = compare(first, second)
    
        if (difference <= 0) {
            sum += i + 1
        }
    }
    
    console.log(sum)
}


const part2 = () => {
    const part2Input = [...input, [[[2]], [[6]]]].flat()
    const sortedPackets = part2Input.sort(compare)

    let result = 1
    result *= sortedPackets.findIndex(x => arraysEqual([[2]], x)) + 1
    result *= sortedPackets.findIndex(x => arraysEqual([[6]], x)) + 1

    console.log(result)
}

part1()
part2()