const tape = require('tape')
const {
    convertToSkiiMap,
    findLongestRoute,
} = require('./findLongestRoute')

const testMap1 = [
    [4, 4],
    [4, 8, 7, 3],
    [2, 5, 9, 3],
    [6, 3, 2, 5],
    [4, 4, 1, 6],
]
tape('findLongestRoute :: Finds longest route 9-5-3-2-1 for testMap1', t => {
    const route = findLongestRoute(testMap1)
    t.ok(Array.isArray(route), 'returns an array')
    t.equal(route.length, 5, 'of length 5')
    t.deepEqual(route, [9, 5, 3, 2, 1], 'that is correct')
    t.end()
})

tape('findLongestRoute :: Finds longest route for challenge map', async t => {
    const map = await convertToSkiiMap('map.txt')
    const route = findLongestRoute(map)
    console.log(route)
    t.ok(route)
    t.end()
})
