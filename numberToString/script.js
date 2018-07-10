function numberToString( number ) {

    let string = String(number)

    if ( string == "0" ) { return "zero" }

    return string
        .split('')
        .map(function(e,i) {
            return parser(e, i, string ).trim()
        })
        .filter(function(e,i) {
            return e !== "";
        })
        .join(' ')
}

function parser( digit, index, string ) {
    let remaining_length = string.length - (index + 1)
    switch ( remaining_length ) {
        case 0:
            return index === 0 ? digitToString( digit ) : "";
        break;

        case 1:
            return getTens( string.slice( index, index+2 ) )
        break;

        case 2: return digitToString(digit) + (digit != 0 ? " hundred" : "");

        case 3:  case 4 : case 5 : suffix = "thousand";    break;
        case 6:  case 7 : case 8 : suffix = "million";     break;
        case 9:  case 10: case 11: suffix = "billion";     break;
        case 12: case 13: case 14: suffix = "trillion";    break;
        case 15: case 16: case 17: suffix = "quadrillion"; break;
        case 18: case 19: case 20: suffix = "pentillion";  break;
        case 21: case 22: case 23: suffix = "sextillion";  break;
        case 24: case 25: case 26: suffix = "septillion";  break;
        case 27: case 28: case 29: suffix = "octillion";   break;
        case 30: case 31: case 32: suffix = "nonillion";   break;
        case 33: case 34: case 35: suffix = "decillion";   break;
    }

    switch ( remaining_length % 3 ) {
        case 0:
            var n = digitToString( digit )
            return index == 0 && n != ""
                ? n + " " + suffix
                : ""

        case 1:
            var n = getTens( string.slice( index, index+2 ) )
            return index == 0 && n != ""
                ? n + " " + suffix
                : ""
                
        case 2: 
            var n = numberToString( string.slice( index, index+3 ) );
            return n != ""
                ? n + " " + suffix
                : ""
                
    }

    return digitToString( digit )
}

function getTens( tens ) {
    return getTensPrefix( tens ) + getTensSuffix( tens )
}

function getTensPrefix( number ) {
    switch ( number ) {
        case "10": return "ten";
        case "11": return "eleven";
        case "12": return "twelve";
    }
    if ( Number(number) < 20 ) {
        switch ( number.charAt(1) ) {
            case "3": return "thir";
            case "5": return "fif";
            default: return digitToString( number.charAt(1) )
        }
    }
    switch ( number.charAt(0) ) {
        case "2": return "twenty";
        case "3": return "thirty";
        case "4": return "fourty";
        case "5": return "fifty";
        case "6": return "sixty";
        case "7": return "seventy";
        case "8": return "eighty";
        case "9": return "ninety";
        default: return digitToString( number.charAt(1) )
    }
    return ""
}

function getTensSuffix( number ) {
    if ( Number(number) < 20 ) {
        return Number(number) > 12 ? "teen" : ""
    }
    return digitToString( number.charAt(1) )
}

function digitToString( digit ) {
    switch ( Number(digit) ) {
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        case 6: return "six";
        case 7: return "seven";
        case 8: return "eight";
        case 9: return "nine";
    }
    return ""
}

let number = process.argv[2]

if ( isNaN(Number(number)) ) {
    console.error("Usage: node test.js {integer}")
    return;
}

let string = numberToString( number )

console.log(string)