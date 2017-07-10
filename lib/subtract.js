"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./add");
function subtract(number1, number2) {
    number1 = number1.toString();
    number2 = number2.toString();
    number2 = negate(number2);
    return add_1.add(number1, number2);
}
exports.subtract = subtract;
function negate(number) {
    if (number[0] == '-') {
        number = number.substr(1);
    }
    else {
        number = '-' + number;
    }
    return number;
}
exports.negate = negate;
