"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function roundOff(input, n) {
    if (n === void 0) { n = 0; }
    if (typeof (input) == 'number')
        input = input.toString();
    var parts = input.split('.'), partInt = parts[0];
    if (n == 0) {
        var l = partInt.length;
        if (greaterThanFive(parts[1], partInt)) {
            return increment(partInt);
        }
        return partInt;
    }
    if (!parts[1]) {
        return partInt + '.' + (new Array(n + 1).join('0'));
    }
    else if (parts[1].length < n) {
        return partInt + '.' + parts[1] + (new Array(n - parts[1].length + 1).join('0'));
    }
    var partDec = parts[1].substring(0, n), rem = parts[1].substring(n);
    if (rem && greaterThanFive(rem, partDec)) {
        partDec = increment(partDec);
        if (partDec.length > n) {
            return increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
        }
    }
    return partInt + '.' + partDec;
}
exports.roundOff = roundOff;
function greaterThanFive(part, pre) {
    if (!part)
        return false;
    var five = '5' + (new Array(part.length + 1).join('0'));
    return (part > five || (part == '5' && parseInt(pre[pre.length - 1]) % 2 == 1));
}
function increment(part, c) {
    if (c === void 0) { c = 0; }
    if (!c)
        c = 1;
    if (typeof (part) == 'number')
        part.toString();
    var l = part.length - 1, s = '';
    for (var i = l; i >= 0; i--) {
        var x = parseInt(part[i]) + c;
        if (x == 10) {
            c = 1;
            x = 0;
        }
        else {
            c = 0;
        }
        s += x;
    }
    if (c)
        s += c;
    return s.split('').reverse().join('');
}
