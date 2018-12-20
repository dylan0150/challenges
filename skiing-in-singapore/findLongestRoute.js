const fs = require('fs')

const convertToSkiiMap = filePath => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${filePath}`, 'UTF-8', (err, data) => {
        if (err) return reject(err)

        const skiiMap = data
            .replace(/\r/g,'')
            .split('\n')
            .map(line => line.split(' ').map(Number))

        return resolve(skiiMap)
    })
})

const findLongestRoute = map => {
    const [w, h] = map.shift()

    let longest = []
    let greatest = 0
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const n = map[x][y]
            const { path, diff } = findLongestDsc(n, x, y, w, h, map)
            if (path.length > longest.length) {
                longest = path
                greatest = diff
                continue
            }
            if (path.length === longest.length && diff > greatest) {
                longest = path
                greatest = diff
                continue
            }
        }
    }

    return longest
}

const findLongestDsc = (n, x, y, w, h, map, current_path=[], current_diff=0, ) => {
    if (typeof n === 'object') return n

    const adjacentNodes = getAdjacentNodes(x, y, w, h, map)

    let longest = []
    let greatest = 0
    for (const [x2, y2, n2] of adjacentNodes) {
        const { path, diff } = n2 < n
            ? findLongestDsc(n2, x2, y2, w, h, map, [...current_path, n], current_diff + n - n2)
            : { path: [...current_path, n], diff: current_diff }
        
        if (path.length > longest.length) {
            longest = path
            greatest = diff
            continue
        }
        if (path.length === longest.length && diff > greatest) {
            longest = path
            greatest = diff
            continue
        }
    }

    return {
        path: longest,
        diff: greatest
    }
}

const getAdjacentNodes = (x, y, w, h, map) => {
    const nodes = []
    if (x > 1) nodes.push([x-1, y, map[x-1][y]])
    if (y > 1) nodes.push([x, y-1, map[x][y-1]])
    if (x < w-1) nodes.push([x+1, y, map[x+1][y]])
    if (y < h-1) nodes.push([x, y+1, map[x][y+1]])

    return nodes
}

module.exports = {
    convertToSkiiMap,
    findLongestRoute,
}
