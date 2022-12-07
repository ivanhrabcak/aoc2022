const fs = require('fs');

const commands = fs.readFileSync('input.txt').toString()
    .split('$ ')
    .slice(1)
    .map(x => x.trim().split('\n'));

const fileSize = (state, path) => {
    let currentFolder = state.filesystem;
    if (path.length >= 1) {
        for (let pathPart of path.slice(0, path.length - 1)) {
            currentFolder = currentFolder[pathPart];
        }
    }

    const fileOrDirectory = currentFolder[path[path.length - 1]];
    if (typeof fileOrDirectory == 'number') {
        return fileOrDirectory;
    }

    let size = 0;
    for (let file of Object.keys(fileOrDirectory)) {
        size += fileSize(state, [...path, file])
    }

    return size;
}

const createDirectory = (state, dirname) => {
    let currentFolder = state.filesystem;
    for (let pathPart of state.currentDirectory) {
        currentFolder = currentFolder[pathPart];
    }

    currentFolder[dirname] = {};
}

const createFile = (state, filename, size) => {
    let currentFolder = state.filesystem;
    for (let pathPart of state.currentDirectory) {
        currentFolder = currentFolder[pathPart];;
    }

    currentFolder[filename] = parseInt(size);
}

const state = {filesystem: {'/': {}}, currentDirectory: []};
for (let terminalCommand of commands) {
    output = terminalCommand.slice(1);
    const [command, ...commandArgs] = terminalCommand[0].split(' ');
    
    if (command === 'ls') {
        output.forEach(x => {
            const [sizeOrDir, ...filename] = x.split(' ');
            if (sizeOrDir === 'dir') {
                createDirectory(state, filename[0]);
            } else {
                createFile(state, filename[0], sizeOrDir);
            }
        })
    } else {
        if (commandArgs[0] === '..') {
            state.currentDirectory.pop();
        } else {
            state.currentDirectory.push(commandArgs[0]);
        }
    }

}

const getAllDirectorySizes = (directory, path) => {
    let currentDirectory = directory;
    const directories = [];
    for (let filename of Object.keys(currentDirectory)) {
        const file = currentDirectory[filename];
        if (typeof file !== 'number') {
            const size = fileSize(state, [...path, filename]);
            directories.push({name: filename, path: [...path, filename], size});
            for (let dir of getAllDirectorySizes(file, [...path, filename])) {
                directories.push(dir);
            }
        }
    }

    return directories;
}

const allDirs = getAllDirectorySizes(state.filesystem, []);

const part1 = () => {
    let sum = 0
    for (let dir of allDirs) {
        if (dir.size <= 100_000) {
            sum += dir.size;
        }
    }

    console.log(sum);
}

const part2 = () => {
    const total = 70000000;
    const required = 30000000;

    
    const free = total - allDirs[0].size;

    console.log(
        allDirs
            .filter(x => x.size + free > required)
            .sort((a, b) => a.size - b.size)[0].size
    );
}

part1();
part2();