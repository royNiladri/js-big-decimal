var bigDecimal =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//function add {
function add(number1, number2) {
    var _a;
    if (number2 === void 0) { number2 = "0"; }
    var neg = 0, ind = -1, neg_len;
    //check for negatives
    if (number1[0] == '-') {
        neg++;
        ind = 1;
        number1 = number1.substring(1);
        neg_len = number1.length;
    }
    if (number2[0] == '-') {
        neg++;
        ind = 2;
        number2 = number2.substring(1);
        neg_len = number2.length;
    }
    number1 = trim(number1);
    number2 = trim(number2);
    _a = pad(trim(number1), trim(number2)), number1 = _a[0], number2 = _a[1];
    if (neg == 1) {
        if (ind == 1)
            number1 = compliment(number1);
        else
            number2 = compliment(number2);
    }
    var res = addCore(number1, number2);
    if (!neg)
        return trim(res);
    else if (neg == 2)
        return ('-' + trim(res));
    else {
        if (number1.length < (res.length))
            return trim(res.substring(1));
        else
            return ('-' + trim(compliment(res)));
    }
}
exports.add = add;
function compliment(number) {
    var s = '', l = number.length, dec = number.split('.')[1], ld = dec ? dec.length : 0;
    for (var i = 0; i < l; i++) {
        if (number[i] >= '0' && number[i] <= '9')
            s += (9 - parseInt(number[i]));
        else
            s += number[i];
    }
    var one = (ld > 0) ? ('0.' + (new Array(ld)).join('0') + '1') : '1';
    return addCore(s, one);
}
function trim(number) {
    var parts = number.split('.');
    if (!parts[0])
        parts[0] = '0';
    while (parts[0][0] == '0' && parts[0].length > 1)
        parts[0] = parts[0].substring(1);
    return parts[0] + (parts[1] ? ('.' + parts[1]) : '');
}
exports.trim = trim;
function pad(number1, number2) {
    var parts1 = number1.split('.'), parts2 = number2.split('.');
    //pad integral part
    var length1 = parts1[0].length, length2 = parts2[0].length;
    if (length1 > length2) {
        parts2[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts2[0] ? parts2[0] : '');
    }
    else {
        parts1[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts1[0] ? parts1[0] : '');
    }
    //pad fractional part
    length1 = parts1[1] ? parts1[1].length : 0,
        length2 = parts2[1] ? parts2[1].length : 0;
    if (length1 || length2) {
        if (length1 > length2) {
            parts2[1] = (parts2[1] ? parts2[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
        }
        else {
            parts1[1] = (parts1[1] ? parts1[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
        }
    }
    number1 = parts1[0] + ((parts1[1]) ? ('.' + parts1[1]) : '');
    number2 = parts2[0] + ((parts2[1]) ? ('.' + parts2[1]) : '');
    return [number1, number2];
}
exports.pad = pad;
function addCore(number1, number2) {
    var _a;
    _a = pad(number1, number2), number1 = _a[0], number2 = _a[1];
    var sum = '', carry = 0;
    for (var i = number1.length - 1; i >= 0; i--) {
        if (number1[i] === '.') {
            sum = '.' + sum;
            continue;
        }
        var temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
        sum = (temp % 10) + sum;
        carry = Math.floor(temp / 10);
    }
    return carry ? (carry.toString() + sum) : sum;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var roundingModes_1 = __webpack_require__(2);
/**
 *
 * @param input the number to round
 * @param n precision
 * @param mode Rounding Mode
 */
function roundOff(input, n, mode) {
    if (n === void 0) { n = 0; }
    if (mode === void 0) { mode = roundingModes_1.RoundingModes.HALF_EVEN; }
    if (mode === roundingModes_1.RoundingModes.UNNECESSARY) {
        throw new Error("UNNECESSARY Rounding Mode has not yet been implemented");
    }
    if (typeof (input) == 'number')
        input = input.toString();
    var neg = false;
    if (input[0] === '-') {
        neg = true;
        input = input.substring(1);
    }
    var parts = input.split('.'), partInt = parts[0], partDec = parts[1];
    //handle case of -ve n: roundOff(12564,-2)=12600
    if (n < 0) {
        n = -n;
        if (partInt.length <= n)
            return '0';
        else {
            var prefix = partInt.substr(0, partInt.length - n);
            input = prefix + '.' + partInt.substr(partInt.length - n) + partDec;
            prefix = roundOff(input, 0, mode);
            return (neg ? '-' : '') + prefix + (new Array(n + 1).join('0'));
        }
    }
    // handle case when integer output is desired
    if (n == 0) {
        var l = partInt.length;
        if (greaterThanFive(parts[1], partInt, neg, mode)) {
            return (neg ? '-' : '') + increment(partInt);
        }
        return (neg ? '-' : '') + partInt;
    }
    // handle case when n>0
    if (!parts[1]) {
        return (neg ? '-' : '') + partInt + '.' + (new Array(n + 1).join('0'));
    }
    else if (parts[1].length < n) {
        return (neg ? '-' : '') + partInt + '.' + parts[1] + (new Array(n - parts[1].length + 1).join('0'));
    }
    partDec = parts[1].substring(0, n);
    var rem = parts[1].substring(n);
    if (rem && greaterThanFive(rem, partDec, neg, mode)) {
        partDec = increment(partDec);
        if (partDec.length > n) {
            return increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
        }
    }
    return (neg ? '-' : '') + partInt + '.' + partDec;
}
exports.roundOff = roundOff;
function greaterThanFive(part, pre, neg, mode) {
    if (!part || part === new Array(part.length + 1).join('0'))
        return false;
    // #region UP, DOWN, CEILING, FLOOR 
    if (mode === roundingModes_1.RoundingModes.DOWN || (!neg && mode === roundingModes_1.RoundingModes.FLOOR) ||
        (neg && mode === roundingModes_1.RoundingModes.CEILING))
        return false;
    if (mode === roundingModes_1.RoundingModes.UP || (neg && mode === roundingModes_1.RoundingModes.FLOOR) ||
        (!neg && mode === roundingModes_1.RoundingModes.CEILING))
        return true;
    // #endregion
    // case when part !== five
    var five = '5' + (new Array(part.length).join('0'));
    if (part > five)
        return true;
    else if (part < five)
        return false;
    // case when part === five
    switch (mode) {
        case roundingModes_1.RoundingModes.HALF_DOWN: return false;
        case roundingModes_1.RoundingModes.HALF_UP: return true;
        case roundingModes_1.RoundingModes.HALF_EVEN:
        default: return (parseInt(pre[pre.length - 1]) % 2 == 1);
    }
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RoundingModes;
(function (RoundingModes) {
    /**
     * Rounding mode to round towards positive infinity.
     */
    RoundingModes[RoundingModes["CEILING"] = 0] = "CEILING";
    /**
     * Rounding mode to round towards zero.
     */
    RoundingModes[RoundingModes["DOWN"] = 1] = "DOWN";
    /**
     * Rounding mode to round towards negative infinity.
     */
    RoundingModes[RoundingModes["FLOOR"] = 2] = "FLOOR";
    /**
     * Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant,
     * in which case round down.
     */
    RoundingModes[RoundingModes["HALF_DOWN"] = 3] = "HALF_DOWN";
    /**
     * Rounding mode to round towards the "nearest neighbor" unless both neighbors are equidistant,
     * in which case, round towards the even neighbor.
     */
    RoundingModes[RoundingModes["HALF_EVEN"] = 4] = "HALF_EVEN";
    /**
     * Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant,
     * in which case round up.
     */
    RoundingModes[RoundingModes["HALF_UP"] = 5] = "HALF_UP";
    /**
     * Rounding mode to assert that the requested operation has an exact result, hence no rounding is necessary.
     * UNIMPLEMENTED
     */
    RoundingModes[RoundingModes["UNNECESSARY"] = 6] = "UNNECESSARY";
    /**
     * Rounding mode to round away from zero.
     */
    RoundingModes[RoundingModes["UP"] = 7] = "UP";
})(RoundingModes = exports.RoundingModes || (exports.RoundingModes = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var add_1 = __webpack_require__(0);
var round_1 = __webpack_require__(1);
var multiply_1 = __webpack_require__(4);
var divide_1 = __webpack_require__(5);
var compareTo_1 = __webpack_require__(6);
var subtract_1 = __webpack_require__(7);
var roundingModes_1 = __webpack_require__(2);
var bigDecimal = /** @class */ (function () {
    function bigDecimal(number) {
        if (number === void 0) { number = '0'; }
        this.value = bigDecimal.validate(number);
    }
    bigDecimal.validate = function (number) {
        if (number) {
            number = number.toString();
            if (isNaN(number))
                throw Error("Parameter is not a number: " + number);
            if (number[0] == '+')
                number = number.substring(1);
        }
        else
            number = '0';
        //handle exponentiation
        if (/e/i.test(number)) {
            var _a = number.split(/[eE]/), mantisa = _a[0], exponent = _a[1];
            mantisa = add_1.trim(mantisa);
            exponent = parseInt(exponent) + mantisa.indexOf('.');
            mantisa = mantisa.replace('.', '');
            if (mantisa.length < exponent) {
                number = mantisa + (new Array(exponent - mantisa.length + 1)).join('0');
            }
            else if (mantisa.length >= exponent && exponent > 0) {
                number = add_1.trim(mantisa.substring(0, exponent)) +
                    ((mantisa.length > exponent) ? ('.' + mantisa.substring(exponent)) : '');
            }
            else {
                number = '0.' + (new Array(-exponent + 1)).join('0') + mantisa;
            }
        }
        return number;
    };
    bigDecimal.prototype.getValue = function () {
        return this.value;
    };
    bigDecimal.getPrettyValue = function (number, digits, separator) {
        if (!(digits || separator)) {
            digits = 3;
            separator = ',';
        }
        else if (!(digits && separator)) {
            throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
        }
        number = bigDecimal.validate(number);
        var neg = number.charAt(0) == '-';
        if (neg)
            number = number.substring(1);
        var len = number.indexOf('.');
        len = len > 0 ? len : (number.length);
        var temp = '';
        for (var i = len; i > 0;) {
            if (i < digits) {
                digits = i;
                i = 0;
            }
            else
                i -= digits;
            temp = number.substring(i, i + digits) + ((i < (len - digits) && i >= 0) ? separator : '') + temp;
        }
        return (neg ? '-' : '') + temp + number.substring(len);
    };
    bigDecimal.prototype.getPrettyValue = function (digits, separator) {
        return bigDecimal.getPrettyValue(this.value, digits, separator);
    };
    bigDecimal.round = function (number, precision, mode) {
        if (precision === void 0) { precision = 0; }
        if (mode === void 0) { mode = roundingModes_1.RoundingModes.HALF_EVEN; }
        number = bigDecimal.validate(number);
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return round_1.roundOff(number, precision, mode);
    };
    bigDecimal.prototype.round = function (precision, mode) {
        if (precision === void 0) { precision = 0; }
        if (mode === void 0) { mode = roundingModes_1.RoundingModes.HALF_EVEN; }
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return new bigDecimal(round_1.roundOff(this.value, precision, mode));
    };
    bigDecimal.floor = function (number) {
        number = bigDecimal.validate(number);
        if (number.indexOf('.') === -1)
            return number;
        return bigDecimal.round(bigDecimal.subtract(number, 0.5));
    };
    bigDecimal.prototype.floor = function () {
        if (this.value.indexOf('.') === -1)
            return new bigDecimal(this.value);
        return this.subtract(new bigDecimal(0.5)).round();
    };
    bigDecimal.ceil = function (number) {
        number = bigDecimal.validate(number);
        if (number.indexOf('.') === -1)
            return number;
        return bigDecimal.round(bigDecimal.add(number, 0.5));
    };
    bigDecimal.prototype.ceil = function () {
        if (this.value.indexOf('.') === -1)
            return new bigDecimal(this.value);
        return this.add(new bigDecimal(0.5)).round();
    };
    bigDecimal.add = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return add_1.add(number1, number2);
    };
    bigDecimal.prototype.add = function (number) {
        return new bigDecimal(add_1.add(this.value, number.getValue()));
    };
    bigDecimal.subtract = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return subtract_1.subtract(number1, number2);
    };
    bigDecimal.prototype.subtract = function (number) {
        return new bigDecimal(subtract_1.subtract(this.value, number.getValue()));
    };
    bigDecimal.multiply = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply_1.multiply(number1, number2);
    };
    bigDecimal.prototype.multiply = function (number) {
        return new bigDecimal(multiply_1.multiply(this.value, number.getValue()));
    };
    bigDecimal.divide = function (number1, number2, precision) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return divide_1.divide(number1, number2, precision);
    };
    bigDecimal.prototype.divide = function (number, precision) {
        return new bigDecimal(divide_1.divide(this.value, number.getValue(), precision));
    };
    bigDecimal.compareTo = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo_1.compareTo(number1, number2);
    };
    bigDecimal.prototype.compareTo = function (number) {
        return compareTo_1.compareTo(this.value, number.getValue());
    };
    bigDecimal.negate = function (number) {
        number = bigDecimal.validate(number);
        return subtract_1.negate(number);
    };
    bigDecimal.prototype.negate = function () {
        return new bigDecimal(subtract_1.negate(this.value));
    };
    bigDecimal.RoundingModes = roundingModes_1.RoundingModes;
    return bigDecimal;
}());
module.exports = bigDecimal;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function multiply(number1, number2) {
    number1 = number1.toString();
    number2 = number2.toString();
    /*Filter numbers*/
    var negative = 0;
    if (number1[0] == '-') {
        negative++;
        number1 = number1.substr(1);
    }
    if (number2[0] == '-') {
        negative++;
        number2 = number2.substr(1);
    }
    number1 = trailZero(number1);
    number2 = trailZero(number2);
    var decimalLength1 = 0;
    var decimalLength2 = 0;
    if (number1.indexOf('.') != -1) {
        decimalLength1 = number1.length - number1.indexOf('.') - 1;
    }
    if (number2.indexOf('.') != -1) {
        decimalLength2 = number2.length - number2.indexOf('.') - 1;
    }
    var decimalLength = decimalLength1 + decimalLength2;
    number1 = trailZero(number1.replace('.', ''));
    number2 = trailZero(number2.replace('.', ''));
    if (number1.length < number2.length) {
        var temp = number1;
        number1 = number2;
        number2 = temp;
    }
    if (number2 == '0') {
        return '0';
    }
    /*
    * Core multiplication
    */
    var length = number2.length;
    var carry = 0;
    var positionVector = [];
    var currentPosition = length - 1;
    var result = "";
    for (var i = 0; i < length; i++) {
        positionVector[i] = number1.length - 1;
    }
    for (var i = 0; i < 2 * number1.length; i++) {
        var sum = 0;
        for (var j = number2.length - 1; j >= currentPosition && j >= 0; j--) {
            if (positionVector[j] > -1 && positionVector[j] < number1.length) {
                sum += parseInt(number1[positionVector[j]--]) * parseInt(number2[j]);
            }
        }
        sum += carry;
        carry = Math.floor(sum / 10);
        result = sum % 10 + result;
        currentPosition--;
    }
    /*
    * Formatting result
    */
    result = trailZero(adjustDecimal(result, decimalLength));
    if (negative == 1) {
        result = '-' + result;
    }
    return result;
}
exports.multiply = multiply;
/*
* Add decimal point
*/
function adjustDecimal(number, decimal) {
    if (decimal == 0)
        return number;
    else {
        number = (decimal >= number.length) ? ((new Array(decimal - number.length + 1)).join('0') + number) : number;
        return number.substr(0, number.length - decimal) + '.' + number.substr(number.length - decimal, decimal);
    }
}
/*
* Removes zero from front and back*/
function trailZero(number) {
    while (number[0] == '0') {
        number = number.substr(1);
    }
    if (number.indexOf('.') != -1) {
        while (number[number.length - 1] == '0') {
            number = number.substr(0, number.length - 1);
        }
    }
    if (number == "" || number == ".") {
        number = '0';
    }
    else if (number[number.length - 1] == '.') {
        number = number.substr(0, number.length - 1);
    }
    if (number[0] == '.') {
        number = '0' + number;
    }
    return number;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = __webpack_require__(0);
var round_1 = __webpack_require__(1);
function divide(dividend, divisor, precission) {
    if (precission === void 0) { precission = 8; }
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }
    dividend = dividend.toString();
    divisor = divisor.toString();
    // remove trailing zeros in decimal ISSUE#18
    dividend = dividend.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
    divisor = divisor.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
    if (dividend == 0)
        return '0';
    var neg = 0;
    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        neg++;
    }
    if (dividend[0] == '-') {
        dividend = dividend.substring(1);
        neg++;
    }
    var pt_dvsr = divisor.indexOf('.') > 0 ? divisor.length - divisor.indexOf('.') - 1 : -1;
    divisor = add_1.trim(divisor.replace('.', ''));
    if (pt_dvsr >= 0) {
        var pt_dvnd = dividend.indexOf('.') > 0 ? dividend.length - dividend.indexOf('.') - 1 : -1;
        if (pt_dvnd == -1) {
            dividend = add_1.trim(dividend + (new Array(pt_dvsr + 1)).join('0'));
        }
        else {
            if (pt_dvsr > pt_dvnd) {
                dividend = dividend.replace('.', '');
                dividend = add_1.trim(dividend + (new Array(pt_dvsr - pt_dvnd + 1)).join('0'));
            }
            else if (pt_dvsr < pt_dvnd) {
                dividend = dividend.replace('.', '');
                var loc = dividend.length - pt_dvnd + pt_dvsr;
                dividend = add_1.trim(dividend.substring(0, loc) + '.' + dividend.substring(loc));
            }
            else if (pt_dvsr == pt_dvnd) {
                dividend = add_1.trim(dividend.replace('.', ''));
            }
        }
    }
    var prec = 0, dl = divisor.length, rem = '0', quotent = '';
    var dvnd = (dividend.indexOf('.') > -1 && dividend.indexOf('.') < dl) ? dividend.substring(0, dl + 1) : dividend.substring(0, dl);
    dividend = (dividend.indexOf('.') > -1 && dividend.indexOf('.') < dl) ? dividend.substring(dl + 1) : dividend.substring(dl);
    if (dvnd.indexOf('.') > -1) {
        var shift = dvnd.length - dvnd.indexOf('.') - 1;
        dvnd = dvnd.replace('.', '');
        if (dl > dvnd.length) {
            shift += dl - dvnd.length;
            dvnd = dvnd + (new Array(dl - dvnd.length + 1)).join('0');
        }
        prec = shift;
        quotent = '0.' + (new Array(shift)).join('0');
    }
    precission = precission + 2;
    while (prec <= precission) {
        var qt = 0;
        while (parseInt(dvnd) >= parseInt(divisor)) {
            dvnd = add_1.add(dvnd, '-' + divisor);
            qt++;
        }
        quotent += qt;
        if (!dividend) {
            if (!prec)
                quotent += '.';
            prec++;
            dvnd = dvnd + '0';
        }
        else {
            if (dividend[0] == '.') {
                quotent += '.';
                prec++;
                dividend = dividend.substring(1);
            }
            dvnd = dvnd + dividend.substring(0, 1);
            dividend = dividend.substring(1);
        }
    }
    return ((neg == 1) ? '-' : '') + add_1.trim(round_1.roundOff(quotent, precission - 2));
}
exports.divide = divide;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = __webpack_require__(0);
function compareTo(number1, number2) {
    var _a;
    var negative = false;
    if (number1[0] == '-' && number2[0] != "-") {
        return -1;
    }
    else if (number1[0] != '-' && number2[0] == '-') {
        return 1;
    }
    else if (number1[0] == '-' && number2[0] == '-') {
        number1 = number1.substr(1);
        number2 = number2.substr(1);
        negative = true;
    }
    _a = add_1.pad(number1, number2), number1 = _a[0], number2 = _a[1];
    if (number1.localeCompare(number2) == 0) {
        return 0;
    }
    for (var i = 0; i < number1.length; i++) {
        if (number1[i] == number2[i]) {
            continue;
        }
        else if (number1[i] > number2[i]) {
            if (negative) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else {
            if (negative) {
                return 1;
            }
            else {
                return -1;
            }
        }
    }
    return 0;
}
exports.compareTo = compareTo;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = __webpack_require__(0);
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


/***/ })
/******/ ]);