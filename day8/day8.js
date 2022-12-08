const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString()
    .split('\n')
    .map(x => [...x])
    .map(x => x.map(k => parseInt(k)))

const leftToRight = [];
for (let i = 0; i < lines.length; i++) {
    leftToRight.push([])
    let lineMax = lines[i][0];
    for (let j = 0; j < lines[0].length; j++) {
        const n = lines[i][j];
        leftToRight[i].push(lineMax);
        if (n > lineMax) {
            lineMax = n;
        }
    } 
}

const rightToLeft = [];
for (let i = 0; i < lines.length; i++) {
    rightToLeft.push([]);
    for (let j = 0; j < lines.length; j++) {
        rightToLeft[i].push(0);
    }
}

for (let i = lines.length - 1; i >= 0; i--) {
    let lineMax = lines[i][lines[0].length - 1];
    for (let j = lines[0].length - 1; j >= 0; j--) {
        const n = lines[i][j];
        rightToLeft[i][j] = lineMax;
        if (n > lineMax) {
            lineMax = n;
        }

    }
}

const upToDown = []
for (let i = 0; i < lines.length; i++) {
    upToDown.push([]);
    for (let j = 0; j < lines[0].length; j++) {
        upToDown[i].push(0)
    }
}

for (let i = 0; i < lines.length; i++) {
    let columnMax = lines[0][i];
    for (let j = 0; j < lines.length; j++) {
        const n = lines[j][i];
        upToDown[j][i] = columnMax;
        if (n > columnMax) {
            columnMax = n;
        }

    }
}

const downToUp = []
for (let i = 0; i < lines.length; i++) {
    downToUp.push([])
    for (let j = 0; j < lines[0].length; j++) {
        downToUp[i].push(0);
    }
}

for (let i = lines.length - 1; i >= 0; i--) {
    let columnMax = lines[lines.length - 1][i];
    for (let j = lines[0].length - 1; j >= 0; j--) {
        const n = lines[j][i];
        downToUp[j][i] = columnMax;
        if (n > columnMax) {
            columnMax = n;
        }
    }
}

console.log(
    lines.reduce((sum, arr, i) => arr.reduce((acc, n, j) => {
        if (i == 0 || j == 0 || i == lines.length - 1 || j == lines[0].length - 1) {
            return acc;
        }

        const visibleFromAbove = upToDown[i][j] < n
        const visibleFromBelow = downToUp[i][j] < n
        const visibleFromLeft = leftToRight[i][j] < n
        const visibleFromRight = rightToLeft[i][j] < n

        if ([visibleFromAbove, visibleFromBelow, visibleFromLeft, visibleFromRight].includes(true)) {
            return acc + 1
        }

        return acc
    }, sum), 0) + lines.length * 2 + (lines[0].length - 2) * 2
)

const scores = [];
for (let i = 0; i < lines.length; i++) {
    scores.push([])
    for (let j = 0; j < lines[0].length; j++) {
        scores[i].push(0)
    }
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        let right = 0
        let left = 0;
        let top = 0;
        let bottom = 0;

        const n = lines[i][j];

        // right
        for (let k = j + 1; k < lines[0].length; k++) {
            let kn = lines[i][k];
            right++;
            if (kn >= n) {
                break;
            }
        }

        // left
        for (let k = j - 1; k >= 0; k--) {
            let kn = lines[i][k];
            left++;
            if (kn >= n) {
                break;
            }
        }

        // down
        for (let k = i + 1; k < lines.length; k++) {
            let kn = lines[k][j];
            bottom++;
            if (kn >= n) {
                break;
            }
        }

        // up
        for (let k = i - 1; k >= 0; k--) {
            let kn = lines[k][j];
            top++;
            if (kn >= n) {
                break;
            }
        }

        let score = top * left * bottom * right;
        scores[i][j] = score;
    }
}

console.log(
    scores.reduce((sum, arr) => arr.reduce((acc, x) => x > acc ? x : acc, sum), 0)
)