/**
 * @description - create a n X n array matrix containing a given character at each slot
 * @difficulty - 2/5
 * 
 * @param {Number} n - integer > 0
 * @param {String} char
 * @returns {Array<String[]>} - 2d array matrix
 * 
 * @example - buildGrid(1, 'x') // --> [['x']]
 * @example - buildGrid(3,'x') // --> [['x', 'x', 'x'],['x', 'x', 'x'], ['x', 'x', 'x']]
 */

const buildGrid = (n, char) => {
    const shell = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        shell.push(row)
        for (let j = 0; j < n; j++) {
            row.push(char)
        }
    }
    return shell;
}

module.exports = buildGrid;