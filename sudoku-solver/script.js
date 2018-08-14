"use strict";
(function Sudoku() {

    var prevLoad = window.onload || null
    window.onload = init

    var canvas, ctx,
    grid = [
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ],
    guesses = [],
    try_to_solve = true;

    function init() {

        canvas        = document.getElementById("sudoku")
        canvas.width  = 600
        canvas.height = 600
        ctx           = canvas.getContext("2d")

        generateRandomGrid(15)

        draw()

        prevLoad instanceof Function && prevLoad()
    }

    function draw() {

        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawCells()
        drawGrid()

        window.requestAnimationFrame(draw)
    }

    function drawGrid() {
        ctx.strokeStyle = "#eee";

        var left = canvas.width/9
        var dist = canvas.width/9

        var top  = canvas.height/9
        var dist2 = canvas.height/9

        for ( var i = 1; i <= 8; i++ ) {
            ctx.lineWidth = (i % 3 == 0) ? 5 : 1

            ctx.beginPath()
            ctx.moveTo(left, 0)
            ctx.lineTo(left, canvas.height)
            ctx.closePath()
            ctx.stroke()
            left += dist

            ctx.beginPath()
            ctx.moveTo(0, top)
            ctx.lineTo(canvas.width, top)
            ctx.closePath()
            ctx.stroke()
            top += dist2
        }
    }

    function drawCells() {

        var w = canvas.width / 9
        var h = canvas.height / 9
        var solved = false

        for (var i = 0; i < grid.length; i++) {
            var row = grid[i];
            for (var j = 0; j < row.length; j++) {
                var cell = row[j];
                if ( cell === undefined ) {
                    if ( try_to_solve && !solved ) {
                        var vals = getPossibleValues(i, j)
                        if ( vals.length === 1 ) {
                            solved = true
                            new Guess(i, j, vals)
                        } else continue;
                    } else continue;
                }
                ctx.font = "40px Arial"
                ctx.strokeStyle = "white"
                ctx.fillStyle   = "blue"
                ctx.fillRect(i*w, j*h, w, h)
                ctx.strokeText(cell, i*w + w/2 - 11, j*h + h/2 + 12)
            }
        }
        if ( !solved && try_to_solve ) {
            var cell = getUnsolvedCell()
            if ( cell === null ) {
                throw "No cells remaining";
            }
            var vals = getPossibleValues(cell[0], cell[1])
            if ( vals.length > 0 ) {
                solved = true
                new Guess( cell[0], cell[1], vals)
            }
        }
        if ( !solved ) {
            backtrack()
        }
    }

    function backtrack() {
        var idx = guesses.length - 1
        var last_guess = guesses[idx]
        if ( last_guess.hasOtherAnswers() ) {
            last_guess.tryAnswer()
        } else {
            last_guess.clear()
            guesses.splice(idx, 1)
            return backtrack()
        }
    }

    function generateRandomGrid(no_of_cells) {
        for ( var i = 1; i <= no_of_cells; i++ ) {
            var cell = getRandomCell()
            var vals = getPossibleValues(cell[0], cell[1])
            var val = vals[Math.floor(Math.random()*vals.length)]
            grid[cell[0]][cell[1]] = val
        }
    }

    function getUnsolvedCell() {
        for (var i = 0; i < grid.length; i++) {
            var row = grid[i];
            for (var j = 0; j < row.length; j++) {
                var cell = row[j];
                if ( cell === undefined ) {
                    return [i,j]
                }
            }
        }
        return null
    }

    function getRandomCell() {
        var cell_i = Math.floor(Math.random()*9)
        var cell_j = Math.floor(Math.random()*9)
        if ( grid[cell_i] && grid[cell_i][cell_j] ) {
            return getRandomCell()
        }
        return [cell_i, cell_j]
    }

    function isSolved() {
        var unsolved_rows = grid.filter(function(row) {
            var unsolved_cells = row.filter(function(cell) {
                return cell === undefined
            })
            return unsolved_cells.length > 0
        })
        return unsolved_rows.length == 0
    }

    function getPossibleValues(cell_i, cell_j) {
        var values = [1,2,3,4,5,6,7,8,9]
        
        var col = grid.map(function(row){ return row[cell_j] })
        var row = grid[cell_i]
        
        values = values.filter(function(e) {
            return col.indexOf(e) == -1 && row.indexOf(e) == -1
        })

        var grid_section_i = cell_i - (cell_i%3)
        var grid_section_j = cell_j - (cell_j%3)
        var grid_section_i_end = grid_section_i + 2
        var grid_section_j_end = grid_section_j + 2

        for ( var i = grid_section_i; i <= grid_section_i_end; i++ ) {
            for ( var j = grid_section_j; j <= grid_section_j_end; j++ ) {
                if ( grid[i][j] === undefined ) { continue; }
                var val = grid[i][j]
                values = values.filter(function(e){ return e != val })
            }
        }

        return values
    }

    function Guess(i, j, vals) {
        this.i = i
        this.j = j
        this.vals = vals
        this.tryAnswer()

        guesses.push(this)
    }
    Guess.prototype.hasOtherAnswers = function() {
        return this.vals.length > 0
    }
    Guess.prototype.tryAnswer = function() {
        this.value = this.vals.shift()
        console.log("GUESS: cell ["+(this.i+1)+":"+(this.j+1)+"] = "+this.value)
        grid[this.i][this.j] = this.value
    }
    Guess.prototype.clear = function() {
        grid[this.i][this.j] = undefined
    }

}())