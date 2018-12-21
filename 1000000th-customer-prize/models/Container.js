class Container {
    constructor (l, w, h) {
        this.l = l
        this.w = w
        this.h = h
        this.s = this.v
        this.items = {}

        this.cells = []
        for (let x = 0; x < l; x++) {
            this.cells[x] = new Array(w)
            for (let y = 0; y < w; y++) {
                this.cells[x][y] = new Array(h)
            }
        }
    }

    get v () {
        return this.w * this.h * this.l
    }

    hasSpace (item) {
        if (this.items[item.id]) return false
        return this.s >= item.v
    }
    addItem (item) {
        this.s -= item.v
        this.items[item.id] = item
        console.log(`Added ${item.id} costing ${item.cost}, ${this.s} space remaining`)
    }
    findGoodReplacement (replacement) {
        if (this.items[replacement.id]) return false
        for (const id in this.items) {
            const item = this.items[id]
            const diff = replacement.v - item.v
            if (item.cost < replacement.cost && this.s > diff) return true
        }
    }
    replace (replacement) {
        for (const id in this.items) {
            const item = this.items[id]
            if (item.cost < replacement.cost && this.s > replacement.v - item.v) {
                delete this.items[id]
                this.items[replacement.id] = replacement
                console.log(`Replacing ${item.id} with ${replacement.id}, costing ${replacement.cost - item.cost} more`)
                break
            }
        }
    }
}

module.exports = Container