let int = Number(process.argv[2])

if ( isNaN(int) ) {
    throw "Usage node index.js {int}"
}

getNthPerfectInt_quick(int)

function getNthPerfectInt_quick(n: number) {
    let perfect_count = 1
    let perfect_int   = 19
    console.log(`Found perfect number (${perfect_count}):`, perfect_int)
    
    while ( perfect_count < n ) {
        perfect_count++
        perfect_int = getNextPerfectInt(perfect_int)
        console.log(`Found perfect number (${perfect_count}):`, perfect_int)
    }
}

function getNthPerfectInt_bruteForce(n: number) {
    let perfect_count  = 0
    let current_number = 0

    while ( perfect_count < n ) {
        current_number++
        if ( isPerfectInt(current_number) ) {
            perfect_count++
            console.log(`Found perfect number (${perfect_count}):`, current_number)
        }
    }
}

function getStringSum(integer: number) {
    let sum = 0

    String(integer)
        .split("")
        .forEach(function(digit) {
            sum += Number(digit)
        })
    
    return sum
}

function isPerfectInt(integer: number) {
    return getStringSum(integer) === 10
}

function getNextPerfectInt(perfect_int: number) {
    let digits = String(perfect_int).split("")

    let last_digit    = Number(digits.pop()) - 1
    let prefix_number = Number(digits.join(""))

    let new_prefix = prefix_number + 1
    if ( String(new_prefix).length > String(prefix_number).length ) {
        last_digit = 9
    }
    let mag = 10
    while ( last_digit < 0 ) {
        new_prefix = Math.ceil( new_prefix / mag )*mag
        last_digit = 10 - getStringSum(new_prefix)
        mag *= 10
    }
    let res = Number(`${new_prefix}${last_digit}`)

    if ( !isPerfectInt(res) ) {
        console.log(`${new_prefix}${last_digit}`, res)
        throw res
    }

    if ( res === perfect_int ) {
        console.error(new_prefix)
        console.error(last_digit)
        throw res;
    }

    return res
}