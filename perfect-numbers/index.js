var int = Number(process.argv[2]);
if (isNaN(int)) {
    throw "Usage node index.js {int}";
}
getNthPerfectInt_quick(int);
function getNthPerfectInt_quick(n) {
    var perfect_count = 1;
    var perfect_int = 19;
    console.log("Found perfect number (" + perfect_count + "):", perfect_int);
    while (perfect_count < n) {
        perfect_count++;
        perfect_int = getNextPerfectInt(perfect_int);
        console.log("Found perfect number (" + perfect_count + "):", perfect_int);
    }
}
function getNthPerfectInt_bruteForce(n) {
    var perfect_count = 0;
    var current_number = 0;
    while (perfect_count < n) {
        current_number++;
        if (isPerfectInt(current_number)) {
            perfect_count++;
            console.log("Found perfect number (" + perfect_count + "):", current_number);
        }
    }
}
function getStringSum(integer) {
    var sum = 0;
    String(integer)
        .split("")
        .forEach(function (digit) {
        sum += Number(digit);
    });
    return sum;
}
function isPerfectInt(integer) {
    return getStringSum(integer) === 10;
}
function getNextPerfectInt(perfect_int) {
    var digits = String(perfect_int).split("");
    var last_digit = Number(digits.pop()) - 1;
    var prefix_number = Number(digits.join(""));
    var new_prefix = prefix_number + 1;
    if (String(new_prefix).length > String(prefix_number).length) {
        last_digit = 9;
    }
    var mag = 10;
    while (last_digit < 0) {
        new_prefix = Math.ceil(new_prefix / mag) * mag;
        last_digit = 10 - getStringSum(new_prefix);
        mag *= 10;
    }
    var res = Number("" + new_prefix + last_digit);
    if (isNaN(res)) {
        console.error(new_prefix);
        console.error(last_digit);
        throw res;
    }
    return res;
}
