const fs = require('fs')

const monkeys = fs.readFileSync('input.txt').toString()
    .split('\n\n')
    .map(x => x.split('\n'))
    .reduce((acc, monkey) => {
        const startingItems = monkey[1].split(': ')[1]
            .split(', ')
            .map(x => parseInt(x))
        
        const operation = monkey[2].split('new = ')[1]
        const test = parseInt(monkey[3].split('by ')[1])
        const ifTrue = parseInt(monkey[4].split('monkey ')[1])
        const ifFalse = parseInt(monkey[5].split('monkey ')[1])
    
        const m = {
            startingItems,
            operation: (x) => eval(operation.replace(/old/g, `${x}`)),
            test: (x) => x % test == 0,
            ifTrue,
            ifFalse,
            mod: test
        }

        return [...acc, m]
    }, [])

const part1 = () => {
    for (let i = 0; i < 20; i++) {
        for (let k = 0; k < monkeys.length; k++) {
            const monkey = monkeys[k]
            
            if (!monkey.inspections) {
                monkey.inspections = monkey.startingItems.length;
            } else {
                monkey.inspections += monkey.startingItems.length;
            }
    
            while (monkey.startingItems.length > 0) {
                let item = monkey.startingItems.pop()
                item = monkey.operation(item)
                item = Math.floor(item / 3)
    
    
                if (monkey.test(item)) {
                    monkeys[monkey.ifTrue].startingItems.push(item)
                } else {
                    monkeys[monkey.ifFalse].startingItems.push(item)
                }
            }
        }
    }
    
    const inspections = monkeys.map(x => x.inspections).sort((a, b) => b - a)
    console.log(inspections[0] * inspections[1])
}

const part2 = () => {
    const supermodulo = monkeys.reduce((acc, x) => x.mod * acc, 1)

    for (let i = 0; i < 10_000; i++) {
        for (let k = 0; k < monkeys.length; k++) {
            const monkey = monkeys[k]
            
            if (!monkey.inspections) {
                monkey.inspections = monkey.startingItems.length;
            } else {
                monkey.inspections += monkey.startingItems.length;
            }
    
            while (monkey.startingItems.length > 0) {
                let item = monkey.startingItems.pop()
                item = monkey.operation(item)
                item = item % supermodulo
    
    
                if (monkey.test(item)) {
                    monkeys[monkey.ifTrue].startingItems.push(item)
                } else {
                    monkeys[monkey.ifFalse].startingItems.push(item)
                }
            }
        }
    }
    
    const inspections = monkeys.map(x => x.inspections).sort((a, b) => b - a)
    console.log(inspections[0] * inspections[1])
}

part2()