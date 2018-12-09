'use strict'
/**
 * 1 step Search in a matrix all neighbours via BFS
 * 2 Given a grid find the maximum number of connected colors, given colors(Blue, Grey, Red)
 *   B|B|G|R
 *   B|G|R|G
 *   R|G|G|G
 */

let matrix = [
    ['B', 'B', 'G', 'R'],
    ['B', 'G', 'R', 'G'],
    ['R', 'G', 'G', 'G']
];

let visited = new Map()
let colorMap = new Map()
let stack = [];
let currentColorCounter;

init()

function init() {
    // validation here, edge cases in the input
    findMaxHelper()
}
function findMaxHelper() {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // TODO: key stack, !trick, didnt know what to put, string or int etc, 
            // for ex: when to get back what would do it, like converting etc
            stack.push(`${row}${col}`)
            currentColorCounter = 1;
            deapthFirstSearch();
        }
    }

    for (var [key, value] of colorMap) {
        console.log(key + ' = ' + value);
    }
}
function deapthFirstSearch() {
    while (stack.length > 0) {
        let keyIndex = stack.pop()

        visited.set(`${keyIndex}`, true)

        const [row, col] = keyIndex.split('')

        console.log(`keyIndex=${keyIndex}`, matrix[row][col])

        const neighbours = getNeighbours([row, col]);

        neighbours.forEach(neighbour => {
            if (!visited.has(neighbour) && isColor([neighbour.split(''), [row, col]])) {
                stack.push(neighbour)
                currentColorCounter = currentColorCounter + 1;
                console.log(`neighbo=${neighbour}`)
                console.log(`currentColorCounter=${currentColorCounter}`)
            }
        })
        setMaxConnectedColor(row, col)
    }
}

function setMaxConnectedColor(row, col) {
    let maxColor = colorMap.get(matrix[row][col])
    maxColor = maxColor ? maxColor : -Infinity
    maxColor = Math.max(maxColor, currentColorCounter)
    colorMap.set(matrix[row][col], maxColor)
}

function isColor([neighbourIndexes, currentIndex]) {
    const [n_row, n_col] = neighbourIndexes
    const [row, col] = currentIndex
    const neighbourColor = matrix[n_row][n_col]
    const currentColor = matrix[row][col]
    return neighbourColor === currentColor
}

function isValid(row, col) {
    return matrix[row] && matrix[row][col] !== undefined
}

// TODO:  it's easy but could take time
function getNeighbours([_row, _col]) {
    const row = new Number(_row)
    const col = new Number(_col)
    const top = isValid(row - 1, col) ? `${row - 1}${col}` : null
    const botton = isValid(row + 1, col) ? `${row + 1}${col}` : null
    const left = isValid(row, col - 1) ? `${row}${col - 1}` : null
    const right = isValid(row, col + 1) ? `${row}${col + 1}` : null

    return [top, botton, left, right].filter(item => item !== null)
}

function Queue() {
    let queue = []
    return {
        enqueue(item) {
            queue.unshift(item)
        },
        dequeue() {
            queue.pop()
        },
        peek() {
            return queue[queue.length - 1]
        }
    }
}
//TODO: unfinished
function BreathFirstSearch(cell, row, col) {
    let queue = Queue();
    let visited = new Map();

    // add to the beggind and when it pops , get the first in
    queue.enqueue(cell);

    while (queue.length > 0) {
        let currentCell = queue.dequeue();

        let neighbours = getNeighbours(currentCell);

        print(currentCell, neighbours);

        for (let i = 0; i < neighbours.length; i++) {
            let neigh = neighbours[i];
            if (isNotVisited(neigh) && isNotInQueue(neigh, queue)) {
                // add to the queue
                queue.unshift(neigh);
            }
        }
        visited.set(getKey(currentCell), currentCell);
    }
}




