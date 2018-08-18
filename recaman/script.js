"use strict";
(function Recaman(){
    var prevLoad = window.onload || null
    window.onload = init;
    
    var c, ctx, arcs, numbers, counter, index, y, dir, biggest;
    
    class Arc {
        constructor(x, y, radius, start, end) {
            this.x = x
            this.y = y
            this.radius = radius
            this.start  = start
            this.end    = end
        }
    
        show() {
            ctx.strokeStyle = "lightblue";
            ctx.lineWidth = 0.1
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, this.start, this.end, false)
            ctx.stroke()
        }
    }
    
    function init() {
        c        = document.querySelector('#canvas')
        ctx      = c.getContext('2d')
        c.width  = window.innerWidth - 50
        c.height = window.innerHeight - 50
        arcs     = []
        numbers  = [true]
        counter  = 1
        index    = 0
        biggest  = 10
        y        = c.height/2
    
        setInterval(loop, 10)
        draw()

        prevLoad instanceof Function && prevLoad()
    }
    
    function loop() {
    
        dir = !dir;
    
        let radius = counter/2
        let old_index = index
        let new_index = getNextNumber()
        let x = Math.min(old_index, new_index) + counter/2
        let arc;
    
        if ( dir ) {
            arc = new Arc( x, y, radius, Math.PI, 0, true )
        } else {
            arc = new Arc( x, y, radius, 0, Math.PI, true )
        }
        arcs.push( arc )
    
        if ( new_index > biggest ) {
            biggest = new_index + 5
        }
    }
    
    function draw() {
        let factor = c.width/biggest
    
        ctx.save()
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, c.width, c.height);
    
        ctx.translate(0, c.height/2)
        ctx.scale(factor, factor)
        ctx.translate(0, -c.height/2)
        
        for ( let arc of arcs ) {
            arc.show()
        }
        ctx.restore()
    
        window.requestAnimationFrame(draw)
    }
    
    function getNextNumber() {
        let next = index - counter
    
        if (next < 0 || numbers[next]) {
            next = index + counter
        }
    
        numbers[next] = true
        counter++
        
        return index = next
    }
})()