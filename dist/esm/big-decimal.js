//function add {
function add(number1, number2) {
    var _a;
    if (number2 === void 0) { number2 = "0"; }
    var neg = 0, ind = -1;
    //check for negatives
    if (number1[0] == "-") {
        number1 = number1.substring(1);
        if (!testZero(number1)) {
            neg++;
            ind = 1;
            number1.length;
        }
    }
    if (number2[0] == "-") {
        number2 = number2.substring(1);
        if (!testZero(number2)) {
            neg++;
            ind = 2;
            number2.length;
        }
    }
    number1 = trim(number1);
    number2 = trim(number2);
    _a = pad(trim(number1), trim(number2)), number1 = _a[0], number2 = _a[1];
    if (neg == 1) {
        if (ind === 1)
            number1 = compliment(number1);
        else if (ind === 2)
            number2 = compliment(number2);
    }
    var res = addCore(number1, number2);
    if (!neg)
        return trim(res);
    else if (neg == 2)
        return "-" + trim(res);
    else {
        if (number1.length < res.length)
            return trim(res.substring(1));
        else
            return "-" + trim(compliment(res));
    }
}
function compliment(number) {
    if (testZero(number)) {
        return number;
    }
    var s = "", l = number.length, dec = number.split(".")[1], ld = dec ? dec.length : 0;
    for (var i = 0; i < l; i++) {
        if (number[i] >= "0" && number[i] <= "9")
            s += 9 - parseInt(number[i]);
        else
            s += number[i];
    }
    var one = ld > 0 ? "0." + new Array(ld).join("0") + "1" : "1";
    return addCore(s, one);
}
function trim(number) {
    var parts = number.split(".");
    if (!parts[0])
        parts[0] = "0";
    while (parts[0][0] == "0" && parts[0].length > 1)
        parts[0] = parts[0].substring(1);
    return parts[0] + (parts[1] ? "." + parts[1] : "");
}
function pad(number1, number2) {
    var parts1 = number1.split("."), parts2 = number2.split(".");
    //pad integral part
    var length1 = parts1[0].length, length2 = parts2[0].length;
    if (length1 > length2) {
        parts2[0] =
            new Array(Math.abs(length1 - length2) + 1).join("0") +
                (parts2[0] ? parts2[0] : "");
    }
    else {
        parts1[0] =
            new Array(Math.abs(length1 - length2) + 1).join("0") +
                (parts1[0] ? parts1[0] : "");
    }
    //pad fractional part
    (length1 = parts1[1] ? parts1[1].length : 0),
        (length2 = parts2[1] ? parts2[1].length : 0);
    if (length1 || length2) {
        if (length1 > length2) {
            parts2[1] =
                (parts2[1] ? parts2[1] : "") +
                    new Array(Math.abs(length1 - length2) + 1).join("0");
        }
        else {
            parts1[1] =
                (parts1[1] ? parts1[1] : "") +
                    new Array(Math.abs(length1 - length2) + 1).join("0");
        }
    }
    number1 = parts1[0] + (parts1[1] ? "." + parts1[1] : "");
    number2 = parts2[0] + (parts2[1] ? "." + parts2[1] : "");
    return [number1, number2];
}
function addCore(number1, number2) {
    var _a;
    _a = pad(number1, number2), number1 = _a[0], number2 = _a[1];
    var sum = "", carry = 0;
    for (var i = number1.length - 1; i >= 0; i--) {
        if (number1[i] === ".") {
            sum = "." + sum;
            continue;
        }
        var temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
        sum = (temp % 10) + sum;
        carry = Math.floor(temp / 10);
    }
    return carry ? carry.toString() + sum : sum;
}
function testZero(number) {
    return /^0[0]*[.]{0,1}[0]*$/.test(number);
}

function abs(n) {
    if (typeof n == "number" || typeof n == "bigint")
        n = n.toString();
    if (n[0] == "-")
        return n.substring(1);
    return n;
}

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
})(RoundingModes || (RoundingModes = {}));

/**
 *
 * @param input the number to round
 * @param n precision
 * @param mode Rounding Mode
 */
function roundOff(input, n, mode) {
    if (n === void 0) { n = 0; }
    if (mode === void 0) { mode = RoundingModes.HALF_EVEN; }
    if (mode === RoundingModes.UNNECESSARY) {
        throw new Error("UNNECESSARY Rounding Mode has not yet been implemented");
    }
    if (typeof (input) == 'number' || typeof (input) == 'bigint')
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
        partInt.length;
        if (greaterThanFive(parts[1], partInt, neg, mode)) {
            partInt = increment(partInt);
        }
        return (neg && parseInt(partInt) ? '-' : '') + partInt;
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
            return (neg ? '-' : '') + increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
        }
    }
    return (neg && (parseInt(partInt) || parseInt(partDec)) ? '-' : '') + partInt + '.' + partDec;
}
function greaterThanFive(part, pre, neg, mode) {
    if (!part || part === new Array(part.length + 1).join('0'))
        return false;
    // #region UP, DOWN, CEILING, FLOOR 
    if (mode === RoundingModes.DOWN || (!neg && mode === RoundingModes.FLOOR) ||
        (neg && mode === RoundingModes.CEILING))
        return false;
    if (mode === RoundingModes.UP || (neg && mode === RoundingModes.FLOOR) ||
        (!neg && mode === RoundingModes.CEILING))
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
        case RoundingModes.HALF_DOWN: return false;
        case RoundingModes.HALF_UP: return true;
        case RoundingModes.HALF_EVEN:
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

/*
* Removes zero from front and back*/
function stripTrailingZero(number) {
    var isNegative = number[0] === '-';
    if (isNegative) {
        number = number.substr(1);
    }
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
    if (isNegative && number != '0') {
        number = '-' + number;
    }
    return number;
}

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
    number1 = stripTrailingZero(number1);
    number2 = stripTrailingZero(number2);
    var decimalLength1 = 0;
    var decimalLength2 = 0;
    if (number1.indexOf('.') != -1) {
        decimalLength1 = number1.length - number1.indexOf('.') - 1;
    }
    if (number2.indexOf('.') != -1) {
        decimalLength2 = number2.length - number2.indexOf('.') - 1;
    }
    var decimalLength = decimalLength1 + decimalLength2;
    number1 = stripTrailingZero(number1.replace('.', ''));
    number2 = stripTrailingZero(number2.replace('.', ''));
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
    result = stripTrailingZero(adjustDecimal(result, decimalLength));
    if (negative == 1) {
        result = '-' + result;
    }
    return result;
}
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
    divisor = trim(divisor.replace('.', ''));
    if (pt_dvsr >= 0) {
        var pt_dvnd = dividend.indexOf('.') > 0 ? dividend.length - dividend.indexOf('.') - 1 : -1;
        if (pt_dvnd == -1) {
            dividend = trim(dividend + (new Array(pt_dvsr + 1)).join('0'));
        }
        else {
            if (pt_dvsr > pt_dvnd) {
                dividend = dividend.replace('.', '');
                dividend = trim(dividend + (new Array(pt_dvsr - pt_dvnd + 1)).join('0'));
            }
            else if (pt_dvsr < pt_dvnd) {
                dividend = dividend.replace('.', '');
                var loc = dividend.length - pt_dvnd + pt_dvsr;
                dividend = trim(dividend.substring(0, loc) + '.' + dividend.substring(loc));
            }
            else if (pt_dvsr == pt_dvnd) {
                dividend = trim(dividend.replace('.', ''));
            }
        }
    }
    var prec = 0, dl = divisor.length, quotent = '';
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
            dvnd = add(dvnd, '-' + divisor);
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
    return ((neg == 1) ? '-' : '') + trim(roundOff(quotent, precission - 2));
}

function subtract(number1, number2) {
    number1 = number1.toString();
    number2 = number2.toString();
    number2 = negate(number2);
    return add(number1, number2);
}
function negate(number) {
    if (number[0] == '-') {
        number = number.substr(1);
    }
    else {
        number = '-' + number;
    }
    return number;
}

function modulus(dividend, divisor) {
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }
    dividend = dividend.toString();
    divisor = divisor.toString();
    validate(dividend);
    validate(divisor);
    var sign = '';
    if (dividend[0] == '-') {
        sign = '-';
        dividend = dividend.substr(1);
    }
    if (divisor[0] == '-') {
        divisor = divisor.substr(1);
    }
    var result = subtract(dividend, multiply(divisor, roundOff(divide(dividend, divisor), 0, RoundingModes.FLOOR)));
    return sign + result;
}
function validate(oparand) {
    if (oparand.indexOf('.') != -1) {
        throw new Error('Modulus of non-integers not supported');
    }
}

function compareTo(number1, number2) {
    var _a, _b;
    var negative = false;
    _a = [number1, number2].map(function (n) { return stripTrailingZero(n); }), number1 = _a[0], number2 = _a[1];
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
    _b = pad(number1, number2), number1 = _b[0], number2 = _b[1];
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

var bigDecimal = /** @class */ (function () {
    function bigDecimal(number) {
        if (number === void 0) { number = "0"; }
        this.value = bigDecimal.validate(number);
    }
    bigDecimal.validate = function (number) {
        if (number) {
            number = number.toString();
            if (isNaN(number))
                throw Error("Parameter is not a number: " + number);
            if (number[0] == "+")
                number = number.substring(1);
        }
        else
            number = "0";
        //handle missing leading zero
        if (number.startsWith("."))
            number = "0" + number;
        else if (number.startsWith("-."))
            number = "-0" + number.substr(1);
        //handle exponentiation
        if (/e/i.test(number)) {
            var _a = number.split(/[eE]/), mantisa = _a[0], exponent = _a[1];
            mantisa = trim(mantisa);
            var sign = "";
            if (mantisa[0] == "-") {
                sign = "-";
                mantisa = mantisa.substring(1);
            }
            if (mantisa.indexOf(".") >= 0) {
                exponent = parseInt(exponent) + mantisa.indexOf(".");
                mantisa = mantisa.replace(".", "");
            }
            else {
                exponent = parseInt(exponent) + mantisa.length;
            }
            if (mantisa.length < exponent) {
                number =
                    sign + mantisa + new Array(exponent - mantisa.length + 1).join("0");
            }
            else if (mantisa.length >= exponent && exponent > 0) {
                number =
                    sign +
                        trim(mantisa.substring(0, exponent)) +
                        (mantisa.length > exponent ? "." + mantisa.substring(exponent) : "");
            }
            else {
                number = sign + "0." + new Array(-exponent + 1).join("0") + mantisa;
            }
        }
        return number;
    };
    bigDecimal.prototype.getValue = function () {
        return this.value;
    };
    bigDecimal.prototype.setValue = function (num) {
        this.value = bigDecimal.validate(num);
    };
    bigDecimal.getPrettyValue = function (number, digits, separator) {
        if (digits === void 0) { digits = 3; }
        if (separator === void 0) { separator = ","; }
        // if (!(digits || separator)) {
        //     digits = 3;
        //     separator = ',';
        // } else if (!(digits && separator)) {
        //     throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
        // }
        number = bigDecimal.validate(number);
        var neg = number.charAt(0) == "-";
        if (neg)
            number = number.substring(1);
        var len = number.indexOf(".");
        len = len > 0 ? len : number.length;
        var temp = "";
        for (var i = len; i > 0;) {
            if (i < digits) {
                digits = i;
                i = 0;
            }
            else
                i -= digits;
            temp =
                number.substring(i, i + digits) +
                    (i < len - digits && i >= 0 ? separator : "") +
                    temp;
        }
        return (neg ? "-" : "") + temp + number.substring(len);
    };
    bigDecimal.prototype.getPrettyValue = function (digits, separator) {
        if (digits === void 0) { digits = 3; }
        if (separator === void 0) { separator = ","; }
        return bigDecimal.getPrettyValue(this.value, digits, separator);
    };
    bigDecimal.round = function (number, precision, mode) {
        if (precision === void 0) { precision = 0; }
        if (mode === void 0) { mode = RoundingModes.HALF_EVEN; }
        number = bigDecimal.validate(number);
        // console.log(number)
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return roundOff(number, precision, mode);
    };
    bigDecimal.prototype.round = function (precision, mode) {
        if (precision === void 0) { precision = 0; }
        if (mode === void 0) { mode = RoundingModes.HALF_EVEN; }
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return new bigDecimal(roundOff(this.value, precision, mode));
    };
    bigDecimal.abs = function (number) {
        number = bigDecimal.validate(number);
        return abs(number);
    };
    bigDecimal.prototype.abs = function () {
        return new bigDecimal(abs(this.value));
    };
    bigDecimal.floor = function (number) {
        number = bigDecimal.validate(number);
        if (number.indexOf(".") === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.FLOOR);
    };
    bigDecimal.prototype.floor = function () {
        if (this.value.indexOf(".") === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.FLOOR);
    };
    bigDecimal.ceil = function (number) {
        number = bigDecimal.validate(number);
        if (number.indexOf(".") === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.CEILING);
    };
    bigDecimal.prototype.ceil = function () {
        if (this.value.indexOf(".") === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.CEILING);
    };
    bigDecimal.add = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return add(number1, number2);
    };
    bigDecimal.prototype.add = function (number) {
        return new bigDecimal(add(this.value, number.getValue()));
    };
    bigDecimal.subtract = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return subtract(number1, number2);
    };
    bigDecimal.prototype.subtract = function (number) {
        return new bigDecimal(subtract(this.value, number.getValue()));
    };
    bigDecimal.multiply = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply(number1, number2);
    };
    bigDecimal.prototype.multiply = function (number) {
        return new bigDecimal(multiply(this.value, number.getValue()));
    };
    bigDecimal.divide = function (number1, number2, precision) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return divide(number1, number2, precision);
    };
    bigDecimal.prototype.divide = function (number, precision) {
        return new bigDecimal(divide(this.value, number.getValue(), precision));
    };
    bigDecimal.modulus = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return modulus(number1, number2);
    };
    bigDecimal.prototype.modulus = function (number) {
        return new bigDecimal(modulus(this.value, number.getValue()));
    };
    bigDecimal.compareTo = function (number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo(number1, number2);
    };
    bigDecimal.prototype.compareTo = function (number) {
        return compareTo(this.value, number.getValue());
    };
    bigDecimal.negate = function (number) {
        number = bigDecimal.validate(number);
        return negate(number);
    };
    bigDecimal.prototype.negate = function () {
        return new bigDecimal(negate(this.value));
    };
    bigDecimal.stripTrailingZero = function (number) {
        number = bigDecimal.validate(number);
        return stripTrailingZero(number);
    };
    bigDecimal.prototype.stripTrailingZero = function () {
        return new bigDecimal(stripTrailingZero(this.value));
    };
    bigDecimal.RoundingModes = RoundingModes;
    return bigDecimal;
}());

export { bigDecimal as default };
//# sourceMappingURL=big-decimal.js.map
