const fs = require('fs')

const ids = new Set()

const calcProps = line => {
    const [id, price, length, width, height, mass] = line.split(',')

    const cost = Number(price)
    const l = Number(length)
    const w = Number(width)
    const h = Number(height)
    const m = Number(mass)
    const v = l * w * h

    return {
        id,
        cost,
        l,
        w,
        h,
        m,
        v,
        p: cost / v,
        d: mass / v,
    }
}

const sortItems = (inputPath, outputPath) => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${inputPath}`, 'UTF-8', (err, data) => {
        if (err) return reject(err)

        const sortedItems = data
            .split('\n')
            .map(calcProps)
            .filter(({id}) => (!id || ids.has(id)) ? false : ids.add(id))
            .sort((a, b) => b.p - a.p || b.d - a.d)
        
        if (!outputPath) return resolve(sortedItems)

        fs.writeFile(`${__dirname}/${outputPath}`, JSON.stringify(sortedItems, null, 4), err => {
            if (err) return reject(err)
            return resolve(sortedItems)
        })
    })
})

if (require.main === module) {
    return sortItems('products.csv', 'products.json')
}

module.exports = sortItems