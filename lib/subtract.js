"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./add");
function subtract(number1, number2) {
    number1 = number1.toString();
    number2 = number2.toString();
    if (number2[0] == '-') {
        number2 = number2.substr(1);
    }
    else {
        number2 = '-' + number2;
    }
    return add_1.add(number1, number2);
}
exports.subtract = subtract;
