const fs = require('fs');

const commands = fs.readFileSync('input.txt').toString()
    .split('$ ')
    .slice(1)
    .map(x => x.trim().split('\n'));

const fileSize = (state, path) => {
    const lastElement = path.length - 1;
    let currentFolder = path.slice(0, lastElement).reduce((acc, x) => acc[x], state.filesystem);

    const fileOrDirectory = currentFolder[path[lastElement]];
    if (typeof fileOrDirectory == 'number') {
        return fileOrDirectory;
    }

    return Object.keys(fileOrDirectory).reduce((acc, x) => acc + fileSize(state, [...path, x]), 0);
}

const getCurrentDirectory = (state) => state.currentDirectory.reduce((acc, x) => acc[x], state.filesystem);

const createDirectory = (state, dirname) => {
    getCurrentDirectory(state)[dirname] = {};
}

const createFile = (state, filename, size) => {
    getCurrentDirectory(state)[filename] = parseInt(size);
}

const state = {filesystem: {'/': {}}, currentDirectory: []};
commands.forEach((terminalCommand) => {
    const commandOutput = terminalCommand.slice(1);
    const [command, ...commandArgs] = terminalCommand[0].split(' ');
    
    if (command === 'ls') {
        commandOutput.forEach(x => {
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

});

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
    console.log(
        allDirs.reduce((acc, x) => x.size <= 100_000 ? acc + x.size : acc, 0)
    );
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