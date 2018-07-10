function numberToString( number ) {

    let string = String(number)
    let res = ""

    if ( string.trim().charAt(0) == "-" ) {
        string = string.replace("-","")
        res += "negative "
    }

    if ( string == "0" ) { return res+"zero" }

    res += string
        .split('')
        .map(function(e,i) {
            return parser(e, i, string ).trim()
        })
        .filter(function(e,i) {
            return e !== "";
        })
        .join(' ')
    
    if ( res.charAt(res.length - 1) == "," ) {
        res = res.slice(0, res.length - 1)
    }
    
    return res
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

        case 3:  case 4 : case 5 : suffix = "thousand,";          break;
        case 6:  case 7 : case 8 : suffix = "million,";           break;
        case 9:  case 10: case 11: suffix = "billion,";           break;
        case 12: case 13: case 14: suffix = "trillion,";          break;
        case 15: case 16: case 17: suffix = "quadrillion,";       break;
        case 18: case 19: case 20: suffix = "pentillion,";        break;
        case 21: case 22: case 23: suffix = "sextillion,";        break;
        case 24: case 25: case 26: suffix = "septillion,";        break;
        case 27: case 28: case 29: suffix = "octillion,";         break;
        case 30: case 31: case 32: suffix = "nonillion,";         break;
        case 33: case 34: case 35: suffix = "decillion,";         break;
        case 36: case 37: case 38: suffix = "undecillion,";       break;
        case 39: case 40: case 41: suffix = "duodecillion,";      break;
        case 42: case 43: case 44: suffix = "tredecillion,";      break;
        case 45: case 46: case 47: suffix = "quattuordecillion,"; break;
        case 48: case 49: case 50: suffix = "quindecillion,";     break;
        case 51: case 52: case 53: suffix = "sexdecillion,";      break;
        case 54: case 55: case 56: suffix = "septendecillion,";   break;
        case 57: case 58: case 59: suffix = "octodecillion,";     break;
        case 60: case 61: case 62: suffix = "novemdecillion,";    break;
        case 63: case 64: case 65: suffix = "vigintillion,";      break;

        default: suffix = numberToString( Math.floor(remaining_length/3)-1 ).replace(/\s/g,"")+"cillion"
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