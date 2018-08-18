function Node(data, parentNode) {
    if ( parentNode ) {
        parentNode.addChild(this)
    }
    this.children = []
    this.data = data
}
Node.prototype.addChild = function(node) {
    node.parentNode = this
    this.children.push(node)
}
Node.prototype.serialize = function(res) {
    res = res || []
    res.push( JSON.stringify(this.data))
    res.push(this.children.length)

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        res = child.serialize(res, child)
    }

    return res
}
Node.prototype.toString = function() {
    return JSON.stringify( this.serialize() )
}
Node.deserialize = function(serialized_node_array) {
    var root = new Node( JSON.parse(serialized_node_array.shift()) )
    var children_count = serialized_node_array.shift()

    for ( var i = 0; i < children_count; i++ ) {
        var child = Node.deserialize( serialized_node_array )
        root.addChild(child)
    }

    return root
}
Node.fromString = function(json_serialized) {
    return this.deserialize( JSON.parse(json_serialized) )
}

var tree = new Node(1)
tree.addChild(new Node(2))
tree.addChild(new Node(3))
tree.children[0].addChild(new Node(4))
tree.children[1].addChild(new Node(5))
tree.children[1].addChild(new Node(6))

console.log( tree )
console.log( Node.deserialize( tree.serialize() ) )
var string   = tree.toString()
var string_2 = Node.fromString( tree.toString() ).toString()
console.log(string)
console.log(string_2)
console.log( string === string_2 )