const fs = require('fs')
const Container = require('./models/Container')

const items = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, 'UTF-8')
)

const tote = new Container(45, 30, 35)

for (const item of items) {
    if (tote.hasSpace(item)) {
        tote.addItem(item)
    }
    if (tote.s === 0) break
}


while (tote.s > 0) {
    const found = false
    for (const item of items) {
        if (tote.findGoodReplacement(item)) {
            found = true
            tote.replace(item)
        }
    }
    if (!found) break
}

let n = 0
for (const item of items) {
    n += Number(item.id)
}

console.log(n)