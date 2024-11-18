function add(number1, number2 = "0") {
    let exponent = 0;
    let negativeNumber1 = '';
    let negativeNumber2 = '';
    let negativeResult = '';
    //check for negatives
    if (number1[0] == '-') {
        number1 = number1.substring(1);
        if (!testZero(number1))
            negativeNumber1 = '-';
        else
            return number2;
    }
    if (number2[0] == '-') {
        number2 = number2.substring(1);
        if (!testZero(number2))
            negativeNumber2 = '-';
        else
            return negativeNumber1 + number1;
    }
    ({ number1, number2, exponent } = pad(number1, number2));
    number1 = negativeNumber1 + number1;
    number2 = negativeNumber2 + number2;
    let result = (BigInt(number1) + BigInt(number2)).toString();
    if (result[0] == '-') {
        result = result.substring(1);
        negativeResult = '-';
    }
    if (exponent > 0) {
        exponent = result.length - exponent;
        if (exponent < 0) {
            result = result.padStart(result.length + Math.abs(exponent), '0');
            exponent = 0;
        }
        result = result.slice(0, exponent) + '.' + result.slice(exponent);
    }
    if (result[0] == '.')
        result = '0' + result;
    result = negativeResult + result;
    return result;
}
function pad(number1, number2) {
    const length1 = number1.length;
    const length2 = number2.length;
    let decimalIndex1 = (number1.includes('.')) ? number1.indexOf('.') : length1;
    let decimalLength1 = length1 - decimalIndex1;
    let decimalIndex2 = (number2.includes('.')) ? number2.indexOf('.') : length2;
    let decimalLength2 = length2 - decimalIndex2;
    let pad1 = number1.substring(0, decimalIndex1) + number1.substring(decimalIndex1 + 1);
    let pad2 = number2.substring(0, decimalIndex2) + number2.substring(decimalIndex2 + 1);
    const decimalDifference = decimalLength1 - decimalLength2;
    const decimalLength = Math.max(decimalLength1, decimalLength2) - 1;
    const decimalIndex = Math.min(decimalIndex1, decimalIndex2);
    if (decimalDifference < 0) {
        pad1 = pad1.padEnd(decimalIndex1 + decimalLength, '0');
        pad2 = pad2.padEnd(decimalIndex + decimalLength, '0');
    }
    if (decimalDifference > 0) {
        pad1 = pad1.padEnd(decimalIndex + decimalLength - 1, '0');
        pad2 = pad2.padEnd(decimalIndex2 + decimalLength, '0');
    }
    return {
        number1: pad1,
        number2: pad2,
        exponent: Math.max(decimalLength, 0)
    };
}
function trim(number) {
    let parts = number.split(".");
    if (!parts[0])
        parts[0] = "0";
    while (parts[0][0] == "0" && parts[0].length > 1)
        parts[0] = parts[0].substring(1);
    return parts[0] + (parts[1] ? "." + parts[1] : "");
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

/*
* Removes zero from front and back*/
function stripTrailingZero(number) {
    // number = number.replace(/(^[-]?)([0]*)/, `${1}`);
    // number = number.replace(/([0]*$){1}/, '');
    // return number;
    const trimStart = /^(?:[0]+)([^0.]*)/;
    const isNegative = number[0] === '-';
    if (isNegative) {
        number = number.substring(1);
    }
    number = number.replace(trimStart, "$1");
    // while (number[0] == '0') {
    // 	number = number.replace(trimStart, "$1");
    // }
    if (number.indexOf('.') != -1) {
        while (number[number.length - 1] == '0') {
            number = number.substring(0, number.length - 1);
        }
        // number = number.replace(trimEnd, "")
    }
    if (number == "" || number == ".") {
        number = '0';
    }
    else if (number[number.length - 1] == '.') {
        number = number.substring(0, number.length - 1);
    }
    if (number[0] == '.') {
        number = '0' + number;
    }
    if (isNegative && number != '0') {
        number = '-' + number;
    }
    return number;
}

/**
 *
 * @param input the number to round
 * @param n precision
 * @param mode Rounding Mode
 */
function roundOff(input, n = 0, mode = RoundingModes.HALF_EVEN) {
    if (mode === RoundingModes.UNNECESSARY) {
        let [integers, mantissa] = stripTrailingZero(input.replace('-', '')).split('.');
        if (n > 0 && mantissa) {
            if (mantissa.length <= n) {
                return input;
            }
            if (/[^0]/.test(mantissa.slice(n))) {
                throw new Error('Number is not an exact value. Rounding necessary.');
            }
            return input;
        }
        else if (n < 0 && mantissa) {
            throw new Error('Number is not an exact value. Rounding necessary.');
        }
        else if (n < 0) {
            if (integers.length <= Math.abs(n) || /[^0]/.test(integers.slice(n))) {
                throw new Error('Number is not an exact value. Rounding necessary.');
            }
            return input;
        }
        else if (n == 0 && mantissa) {
            throw new Error('Number is not an exact value. Rounding necessary.');
        }
        return input;
    }
    let neg = false;
    if (input[0] === '-') {
        neg = true;
        input = input.substring(1);
    }
    let parts = input.split('.'), partInt = parts[0], partDec = parts[1];
    //handle case of -ve n: roundOff(12564,-2)=12600
    if (n < 0) {
        n = -n;
        if (partInt.length <= n)
            return '0';
        else {
            let prefix = partInt.substring(0, partInt.length - n);
            input = prefix + '.' + partInt.substring(partInt.length - n) + partDec;
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
    let rem = parts[1].substring(n);
    if (rem && greaterThanFive(rem, partDec, neg, mode)) {
        partDec = increment(partDec);
        if (partDec.length > n) {
            return (neg ? '-' : '') + increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
        }
    }
    return (neg && (parseInt(partInt) || parseInt(partDec)) ? '-' : '') + partInt + '.' + partDec;
}
function greaterThanFive(part, pre, neg, mode) {
    if (!part || part == ''.padEnd(part.length, '0'))
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
    let five = '5'.padEnd(part.length, '0');
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
function increment(part, c = 0) {
    if (!c)
        c = 1;
    if (typeof (part) == 'number')
        part.toString();
    let l = part.length - 1, s = '';
    for (let i = l; i >= 0; i--) {
        let x = parseInt(part[i]) + c;
        if (x == 10) {
            c = 1;
            x = 0;
        }
        else {
            c = 0;
        }
        s = x + s;
    }
    if (c)
        s = c + s;
    return s;
}

function compareTo(number1, number2) {
    let negative = '';
    [number1, number2] = [number1, number2].map(n => stripTrailingZero(n));
    // Early escapes
    // If num 1 is negative and num 2 is positive
    if (number1[0] == '-' && number2[0] != "-")
        return -1;
    // If num 2 is negative and num 1 is positive
    if (number1[0] != '-' && number2[0] == '-')
        return 1;
    // If num 1 and num 2 are negative
    if (number1[0] == '-' && number2[0] == '-') {
        number1 = number1.substring(1);
        number2 = number2.substring(1);
        negative = '-';
    }
    ({ number1, number2 } = pad(number1, number2));
    if (number1.length > number2.length)
        return parseInt(negative + '1');
    if (number1.length < number2.length)
        return (negative) ? 1 : -1;
    const n1 = BigInt(negative + number1);
    const n2 = BigInt(negative + number2);
    if (n1 < n2)
        return -1;
    if (n1 > n2)
        return 1;
    return 0;
}
// Wrapper functions
function lessThan(left, right, orEquals = false) {
    return (orEquals) ? (compareTo(left, right) <= 0) : (compareTo(left, right) < 0);
}
function greaterThan(left, right, orEquals = false) {
    return (orEquals) ? (compareTo(left, right) >= 0) : (compareTo(left, right) > 0);
}
function equals(left, right) {
    return (compareTo(left, right) == 0);
}
function isExatclyZero(number) {
    return /^0[0]*[.]{0,1}[0]*$/.test(number);
}
function isExatclyOne(number) {
    return /^[0]*[1](?:[.]{1}[0]*)?$/.test(number);
}
function isEven(number) {
    if (number.includes('.'))
        return /[02468]{1}$/.test(number[number.indexOf('.') - 1]);
    return /[02468]{1}$/.test(number[number.length - 1]);
}
function isOdd(number) {
    if (number.includes('.'))
        return /[13579]{1}$/.test(number[number.indexOf('.') - 1]);
    return /[13579]{1}$/.test(number[number.length - 1]);
}

function multiply(number1, number2) {
    let negativeNumber1 = '';
    let negativeNumber2 = '';
    let negativeResult = '';
    if (number1[0] == '-') {
        number1 = number1.substring(1);
        negativeNumber1 = '-';
    }
    if (number2[0] == '-') {
        number2 = number2.substring(1);
        negativeNumber2 = '-';
    }
    if (isExatclyZero(number1) || isExatclyZero(number2))
        return '0';
    number1 = stripTrailingZero(number1);
    number2 = stripTrailingZero(number2);
    let decimalLength1 = 0;
    let decimalLength2 = 0;
    if (number1.indexOf('.') + 1) {
        decimalLength1 = number1.length - number1.indexOf('.') - 1;
    }
    if (number2.indexOf('.') + 1) {
        decimalLength2 = number2.length - number2.indexOf('.') - 1;
    }
    let decimalLength = decimalLength1 + decimalLength2;
    number1 = negativeNumber1 + stripTrailingZero(number1.replace('.', ''));
    number2 = negativeNumber2 + stripTrailingZero(number2.replace('.', ''));
    let result = (BigInt(number1) * BigInt(number2)).toString();
    if (result[0] == '-') {
        result = result.substring(1);
        negativeResult = '-';
    }
    if (decimalLength > 0) {
        decimalLength = result.length - decimalLength;
        if (decimalLength < 0) {
            result = result.padStart(result.length + Math.abs(decimalLength), '0');
            decimalLength = 0;
        }
        result = (result.slice(0, decimalLength) || '0') + '.' + result.slice(decimalLength);
    }
    return stripTrailingZero(negativeResult + result);
}

function divide(dividend, divisor, precission = 8) {
    // Return 0 
    if (divisor == '0') {
        return '0' + (!precission) ? '' : '.' + new Array(precission).join('0');
    }
    if (equals(abs(divisor), '1')) {
        return multiply(dividend, divisor);
    }
    // precission = precission + 2;
    let negativeDividend = '';
    let negativeDivisor = '';
    let negativeResult = '';
    let dividendIndex = dividend.length;
    let divisorIndex = divisor.length;
    let resultIndex = 0;
    const findNegativeOffset = /^(?:[0]+)(?:[.])([0]+)(?:\d+)/;
    const trimStart = /^(?:[0]+)([^0.]*)/;
    const trimEnd = /((?:[.][0])?[0]*)$/;
    //check for negatives
    if (dividend[0] == '-') {
        dividend = dividend.substring(1);
        negativeDividend = '-';
        dividendIndex--;
    }
    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        negativeDivisor = '-';
        divisorIndex--;
    }
    if (negativeDividend !== negativeDivisor)
        negativeResult = '-';
    if (dividend.includes('.')) {
        dividend = dividend.replace(trimEnd, "");
        if (dividend.includes('.')) {
            if (findNegativeOffset.test(dividend))
                dividendIndex = -(dividend.replace(findNegativeOffset, '$1').length);
            else if (dividend[0] == '0')
                dividendIndex = dividend.indexOf('.') - 1;
            else
                dividendIndex = dividend.indexOf('.');
            dividend = dividend.substring(0, dividend.indexOf('.')) + dividend.substring(dividend.indexOf('.') + 1);
        }
        else
            dividendIndex = dividend.length;
    }
    if (divisor.includes('.')) {
        divisor = divisor.replace(trimEnd, "");
        if (divisor.includes('.')) {
            if (findNegativeOffset.test(divisor))
                divisorIndex = -(divisor.replace(findNegativeOffset, '$1').length);
            else if (divisor[0] == '0')
                divisorIndex = divisor.indexOf('.') - 1;
            else
                divisorIndex = divisor.indexOf('.');
            divisor = divisor.substring(0, divisor.indexOf('.')) + divisor.substring(divisor.indexOf('.') + 1);
        }
        else
            divisorIndex = divisor.length;
    }
    resultIndex = dividendIndex - divisorIndex;
    const dividendInt = BigInt(dividend);
    const divisorInt = BigInt(divisor);
    const precisionInt = BigInt('1'.padEnd(Math.max(dividend.length, divisor.length) + precission + 2, '0'));
    dividend = dividend.replace(trimStart, "$1");
    divisor = divisor.replace(trimStart, "$1");
    const intDifference = dividend.length - divisor.length;
    const paddingInt = BigInt('1'.padEnd(Math.abs(intDifference) + 1, '0'));
    let result = ((dividendInt * precisionInt) / divisorInt).toString();
    if (resultIndex > 0) {
        if (intDifference > 0) {
            if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && dividendInt > (divisorInt * paddingInt))
                resultIndex++;
            else if (Math.sign(dividendIndex) >= 0 && dividendInt > (divisorInt * paddingInt))
                resultIndex++;
        }
        else {
            if ((dividendInt * paddingInt) > divisorInt)
                resultIndex++;
        }
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
    }
    if (resultIndex < 0) {
        if (intDifference > 0) {
            if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && dividendInt > (divisorInt * paddingInt))
                resultIndex++;
            else if (Math.sign(dividendIndex) >= 0 && dividendInt > (divisorInt * paddingInt))
                resultIndex++;
        }
        else {
            if ((dividendInt * paddingInt) > divisorInt)
                resultIndex++;
        }
        return roundOff(negativeResult + '0.'.padEnd(Math.abs(resultIndex) + 2, '0') + result, precission);
    }
    if (resultIndex == 0) {
        if (intDifference > 0 && dividendInt > (divisorInt * paddingInt)) {
            resultIndex++;
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (intDifference <= 0 && (dividendInt * paddingInt) > divisorInt) {
            resultIndex++;
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (dividendInt == divisorInt) {
            resultIndex++;
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
    }
}

function subtract(number1, number2) {
    return add(number1, negate(number2));
}
function negate(number) {
    return (number[0] == '-') ? number.substring(1) : '-' + number;
}

function validateInteger(number, label) {
    if (number.includes('.')) {
        throw Error(`${(label) ? `[${label}]: ` : ''}Non-integers not supported`);
    }
}
function validatePositive(number, label) {
    if (number[0] == '-') {
        throw Error(`${(label) ? `[${label}]: ` : ''}Negatives not supported`);
    }
}
function validateGTZero(number, label) {
    if (lessThan(number, '0', true)) {
        throw Error(`${(label) ? `[${label}]: ` : ''}Argument x must be greater than 0`);
    }
}
function validateIsInRange(number, label) {
    if (greaterThan(abs(number), '1')) {
        throw Error(`${(label) ? `[${label}]: ` : ''}Argument x is out of range`);
    }
}
function validateDivideByZero(number, label) {
    if (isExatclyZero(number)) {
        throw Error(`${(label) ? `[${label}]: ` : ''}Cannot divide by 0`);
    }
}
function validateArray(array, label) {
    if (array.length === 0) {
        throw Error(`${(label) ? `[${label}]: ` : ''}Empty array`);
    }
}

function modulusE(n, base = '1', precision = 64) {
    validateDivideByZero(base, 'modulus');
    return stripTrailingZero(roundOff(subtract(n, multiply(base, roundOff(divide(n, base, precision + 1), 0, RoundingModes.FLOOR))), precision));
}
function modulus(n, base = '1', precision = 64) {
    validateDivideByZero(base, 'modulus');
    const result = modulusE(abs(n), abs(base), precision);
    return stripTrailingZero((n.includes('-')) ? negate(result) : result);
}

function tolerance(precision) {
    precision = precision.toString();
    validateInteger(precision.toString());
    if (isExatclyZero(precision))
        return '0';
    if (precision[0] == '-')
        return '1'.padEnd(Number(abs(precision)) + 1, '0');
    return '0.'.padEnd(Number(abs(precision)) + 1, '0') + '1';
}
function isAproxZero(number, precision = 8) {
    precision = Math.max(1, precision);
    number = abs(number.toString());
    if (isExatclyZero(number))
        return true;
    if (lessThan(number, tolerance(precision - 1), true))
        return true;
    return false;
}
function isAproxOne(number, percision = 8) {
    percision = Math.max(1, percision);
    number = abs(number);
    if (isExatclyOne(number))
        return true;
    if (lessThan(abs(subtract('1', number)), tolerance(percision - 1), true))
        return true;
    return false;
}
function sign(number) {
    if (isExatclyZero(number))
        return 0;
    return (number[0] == '-') ? -1 : 1;
}
function testTolerance(target, precision) {
    return (RegExp(`^([0]{1}\\.[0]{${precision + 2},}[\\d]{1})`).test(target) || target == '0');
}
function min(numbers) {
    if (numbers.length === 0)
        throw Error('[Min]: Empty array.');
    if (numbers.length === 1)
        return numbers[0];
    return numbers.reduce((prev, curr) => {
        if (lessThan(prev, curr, true))
            return prev;
        return curr;
    }, numbers[0]);
}
function max(numbers) {
    if (numbers.length === 0)
        throw Error('[Min]: Empty array.');
    if (numbers.length === 1)
        return numbers[0];
    return numbers.reduce((prev, curr) => {
        if (greaterThan(prev, curr, true))
            return prev;
        return curr;
    }, numbers[0]);
}
function clamp(n, x = '0', y = '1') {
    return min([y, max([x, n])]);
}
function step(number, step = number) {
    return multiply(roundOff(divide(number, step)), step);
}
function lerp(x, y, a = '1') {
    return add(multiply(x, subtract('1', a)), multiply(y, a));
}
function invlerp(x, y, a) {
    return clamp(divide(subtract(a, x), subtract(y, x)));
}
function random(length = 32) {
    length = Math.max(length, 32);
    const n = crypto.getRandomValues(new Uint32Array(length + 10));
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let r = '.';
    // let c = 10;
    // while (c != 0) {
    //     let i = Math.floor((n[length - c] / 4294967296) * c);
    //     c--;
    //     [digits[c], digits[i]] = [digits[i], digits[c]];
    // }
    for (let i = 0; i < length; i++) {
        let c = 10;
        while (c != 0) {
            let i = Math.floor((n[length - c] / 4294967296) * c);
            c--;
            [digits[c], digits[i]] = [digits[i], digits[c]];
        }
        r += digits[Math.floor((n[i] / 4294967296) * 10)];
    }
    return r;
}

/**
 * Calculates the power of a given base raised to an integer exponent
 *
 * @param base - Base number
 * @param exponent - Exponent integer
 * @param negate - If set to true, parameters will be evaluated as `-(x ^ n)`
 *
 * @returns The resulting power as a string
 *
 *
 * @example Basic usage:
 * ```
 * // Positive Base
 * console.log(pow(2,2)) // Prints '4'
 * // Negative Base
 * console.log(pow(-2,2)) // Prints '4'
 * // Negative Base where the result will be a negative number
 * console.log(pow(-2,3)) // Prints '-8'
 * ```
 *
 * @example Negation usage:
 * ```
 * // Positive Base
 * console.log(pow(2, 2, true)) // Prints '-4'
 * // Negative Base
 * console.log(pow(-2, 2, true)) // Prints '-4'
 * // Negative Base where the result will be a negative number
 * console.log(pow(-2, 3, true)) // Prints '8'
 * ```
 *
 * @example Special cases:
 * ```
 * // Exponent of 0
 * console.log(pow(2, 0)) // Prints '1'
 * // Exponent of 1
 * console.log(pow(2, 1)) // Prints '2'
 * ```
 */
function pow(base, exponent, precision = 32, negate$1 = false) {
    if (isExatclyZero(exponent)) {
        return '1';
    }
    if (!exponent.includes('-') && isExatclyOne(exponent)) {
        return base;
    }
    if (isExatclyZero(base) && exponent.includes('-') && isExatclyOne(abs(exponent))) {
        throw Error('0^(-1) is undefined');
    }
    const finalize = (result) => {
        result = (negativeExponent) ? divide('1', result, precision + 1) : result;
        result = (precision) ? roundOff(result, precision) : result;
        return (negate$1) ? stripTrailingZero(negate(result)) : stripTrailingZero(result);
    };
    const negativeBase = base.includes('-');
    const negativeExponent = exponent.includes('-');
    const exponentParts = exponent.split('.');
    const exponentSignificand = exponentParts[1];
    let fractionalExponent = '1';
    let result = '1';
    if (equals(abs(base), '10')) {
        result = (negativeExponent) ? tolerance(add(exponentParts[0], '1')) : tolerance('-' + exponentParts[0]);
    }
    else {
        result = intPow(base, abs(exponentParts[0]));
    }
    if (exponentSignificand) {
        if (negativeBase) {
            negate$1 = !negate$1;
        }
        precision = Math.max(precision, 32);
        let minPrecision = base.length * Math.ceil(parseFloat(abs(exponent))) + precision;
        let tempBase = abs(base);
        for (let i = 0; i < exponentSignificand.length; i++) {
            if (isOdd(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '9':
                        fractionalExponent = multiply(fractionalExponent, multiply(intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '2'), nthRoot(tempBase, '2', minPrecision + i + 1))); // (2 * 2) + 5 = 9
                        break;
                    case '7':
                        fractionalExponent = multiply(fractionalExponent, multiply(nthRoot(tempBase, '5', minPrecision + i + 1), nthRoot(tempBase, '2', minPrecision + i + 1))); // 2 + 5 = 7
                        break;
                    case '5':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '2', minPrecision + i + 1)); // 5
                        break;
                    case '3':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '10', minPrecision + i + 1), '3')); // 1 * 3 = 3
                        break;
                    case '1':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '10', minPrecision + i + 1)); // 2 / 2 = 1
                        break;
                }
            }
            if (isEven(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '8':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '4')); // 2 * 4 = 8
                        break;
                    case '6':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '3')); // 2 * 3 = 6
                        break;
                    case '4':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '2')); // 2 * 2 = 4
                        break;
                    case '2':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '5', minPrecision + i + 1)); // 2
                        break;
                }
            }
            if (i < exponentSignificand.length - 1)
                tempBase = nthRoot(tempBase, '10', minPrecision + i + 2);
        }
        // console.log(fractionalExponent)
        return finalize(multiply(result, fractionalExponent));
    }
    else {
        return finalize(result);
    }
}
function intPow(base, exponent) {
    validateInteger(exponent, 'intPow exponent');
    exponent = abs(exponent);
    let negative = '';
    if (base[0] == '-') {
        base = base.substring(1);
        negative = (isEven(exponent)) ? '' : '-';
    }
    let decimalIndex = base.indexOf('.');
    let decimalLength = 0;
    if (decimalIndex >= 0) {
        base = base.replace('.', '');
        decimalLength = (base.length - decimalIndex) * parseInt(exponent);
    }
    let result = (BigInt(base) ** BigInt(exponent)).toString();
    if (decimalLength) {
        result = (result.substring(0, result.length - decimalLength) || '0') + '.' + result.substring(result.length - decimalLength).padStart(decimalLength, '0');
    }
    return negative + result;
}
function nthRoot(x, n, precision = 16) {
    x = x.toString();
    n = n.toString();
    validateInteger(n, 'nthRoot n');
    const initialGuess = () => {
        let _x = BigInt(roundOff(x));
        let _n = BigInt(n);
        let _guess = 1n;
        while (_x > _n) {
            _x = _x >> _n;
            _guess = _guess << 1n;
        }
        return _guess.toString();
    };
    let guess = initialGuess();
    let nMinusOne = subtract(n, '1');
    let difference = '0';
    let lastDifference = abs(x);
    let i = 4;
    while (true) {
        let newGuess = stripTrailingZero(divide(add(stripTrailingZero(divide(x, intPow(guess, nMinusOne), precision + i + 2)), multiply(guess, nMinusOne)), n, precision + i + 1));
        difference = stripTrailingZero(abs(subtract(guess, newGuess)));
        // console.log(newGuess)
        // console.log(difference)
        if (greaterThan(difference, lastDifference)) {
            return stripTrailingZero(roundOff(bisectionRoot(x, n, newGuess, precision + i), precision));
        }
        if (testTolerance(difference, precision + i)) {
            return stripTrailingZero(roundOff(newGuess, precision));
        }
        lastDifference = difference;
        guess = stripTrailingZero(newGuess);
        i++;
    }
}
function bisectionRoot(x, n, g, precision = 32) {
    const f0 = (v, n, x) => {
        return stripTrailingZero(subtract(intPow(v, n), x));
    };
    const f1 = (x, n) => {
        return stripTrailingZero(multiply(n, intPow(x, subtract(n, '1'))));
    };
    // const threshold = tolerance(precision)
    let left = negate(g);
    let right = g;
    let v = '0';
    let prevV0 = '0';
    let i = 4;
    while (true) {
        v = stripTrailingZero(divide(add(left, right), '2', precision + i));
        let v0 = f0(v, n, x);
        const v1 = f1(v, n);
        if (lessThan(multiply(v0, v1), '0', true)) {
            left = stripTrailingZero(v);
        }
        else {
            right = stripTrailingZero(v);
        }
        v0 = abs(v0);
        // console.log(v)
        if (testTolerance(v0, precision) || equals(v0, prevV0)) {
            return stripTrailingZero(v);
        }
        // console.log(v)
        prevV0 = v0;
        i++;
    }
}
function sqRoot(base, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(nthRoot(base, '2', precision));
}
function cbRoot(base, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(nthRoot(base, '3', precision));
}

const E = '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354021234078498193343210682';
const LN2 = '0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347648114941864238677677441';
const LOG2E = '1.4426950408889634073599246810018921374266459541529859341354494069311092191811850798855266228935063444969975183096525442555931016871683596427206621582234793362745373698847184936307013876635320155338943189166648376431286154240474784222894979047950915303513385880549688658930969963680361105110756308441454272158283449418919339085777157900441712802468483413745226951823690112390940344599685399061134217228862780291580106300619767624456526059950737532406256558154759381783052397255107248130771562675458075781713301935730061687619373729826758974156238179835671034434897506807055180884865613868329177321829349139684310593454022025186369345262692150955971910022196792243214334244941790714551184993859212216753653113007746327672064612337411082119137944333984805793109128776096702003757589981588518061267880997609562525078410248470569007687680584613278654747820278086594620609107490153248199697305790152723247872987409812541000334486875738223647164945447537067167595899428099818267834901316666335348036789869446887091166604973537292585';
const LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058';
const LOG10E = '0.4342944819032518276511289189166050822943970058036665661144537831658646492088707747292249493384317483187061067447663037336416792871589639065692210646628122658521270865686703295933708696588266883311636077384905142844348666768646586085135561482123487653435434357317253835622281395603048646652366095539377356176323431916710991411597894962993512457934926357655469077671082419150479910989674900103277537653570270087328550951731440674697951899513594088040423931518868108402544654089797029863286828762624144013457043546132920600712605104028367125954846287707861998992326748439902348171535934551079475492552482577820679220140931468164467381030560475635720408883383209488996522717494541331791417640247407505788767860971099257547730046048656049515610057985741340272675201439247917970859047931285212493341197329877226463885350226083881626316463883553685501768460295286399391633510647555704050513182342988874882120643595023818902643317711537382203362634416478397146001858396093006317333986134035135741787144971453076492968331392399810609';
const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788';
const PI2 = '6.2831853071795864769252867665590057683943387987502116419498891846156328125724179972560696506842341359642961730265646132941876892191011644634507188162569622349005682054038770422111192892458979098607639288576219513318668922569512964675735663305424038182912971338469206972209086532964267872145204982825474491740132126311763497630418419256585081834307287357851807200226610610976409330427682939038830232188661145407315191839061843722347638652235862102370961489247599254991347037715054497824558763660238982596673467248813132861720427898927904494743814043597218874055410784343525863535047693496369353388102640011362542905271216555715426855155792183472743574429368818024499068602930991707421015845593785178470840399122242580439217280688363196272595495426199210374144226999999967459560999021194634656321926371900489189106938166052850446165066893700705238623763420200062756775057731750664167628412343553382946071965069808575109374623191257277647075751875039155637155610643424536132260038557532223918184328403978761905144021309717265576';
const PI_DIV_2 = '1.5707963267948966192313216916397514420985846996875529104874722961539082031431044993140174126710585339910740432566411533235469223047752911158626797040642405587251420513509692605527798223114744774651909822144054878329667230642378241168933915826356009545728242834617301743052271633241066968036301245706368622935033031577940874407604604814146270458576821839462951800056652652744102332606920734759707558047165286351828797959765460930586909663058965525592740372311899813747836759428763624456139690915059745649168366812203283215430106974731976123685953510899304718513852696085881465883761923374092338347025660002840635726317804138928856713788948045868185893607342204506124767150732747926855253961398446294617710099780560645109804320172090799068148873856549802593536056749999991864890249755298658664080481592975122297276734541513212611541266723425176309655940855050015689193764432937666041907103085888345736517991267452143777343655797814319411768937968759788909288902660856134033065009639383055979546082100994690476286005327429316394';
const PI_DIV_4 = '0.7853981633974483096156608458198757210492923498437764552437361480769541015715522496570087063355292669955370216283205766617734611523876455579313398520321202793625710256754846302763899111557372387325954911072027439164833615321189120584466957913178004772864121417308650871526135816620533484018150622853184311467516515788970437203802302407073135229288410919731475900028326326372051166303460367379853779023582643175914398979882730465293454831529482762796370186155949906873918379714381812228069845457529872824584183406101641607715053487365988061842976755449652359256926348042940732941880961687046169173512830001420317863158902069464428356894474022934092946803671102253062383575366373963427626980699223147308855049890280322554902160086045399534074436928274901296768028374999995932445124877649329332040240796487561148638367270756606305770633361712588154827970427525007844596882216468833020953551542944172868258995633726071888671827898907159705884468984379894454644451330428067016532504819691527989773041050497345238143002663714658197';

function exp(exponent) {
    return pow(E, exponent, 64);
}
function expm1(exponent) {
    return subtract(exp(exponent), '1');
}
function ln(x = '2') {
    validateGTZero(x, 'ln');
    if (equals(x, '1')) {
        return '0'; // ln(1) = 0
    }
    const term = stripTrailingZero(divide(subtract(x, '1'), add(x, '1'), 68));
    const f = stripTrailingZero(intPow(term, '2'));
    let t = stripTrailingZero(intPow(term, '1'));
    let result = '0';
    let i = 0;
    while (true) {
        i++;
        let iteration = subtract(multiply('2', i.toString()), '1');
        let next = stripTrailingZero(roundOff(multiply(divide('1', iteration, 64 + 2), t), 1024 + 4));
        if (testTolerance(next, 64)) {
            return stripTrailingZero(roundOff(multiply('2', add(result, next)), 64));
        }
        t = stripTrailingZero(roundOff(multiply(t, f), 64 + 2));
        result = add(result, next);
    }
}
function ln2(x = '2') {
    validateGTZero(x, 'ln2');
    let result = '0';
    while (greaterThan(x, '2', true)) {
        x = stripTrailingZero(divide(x, '2', 68));
        result = add(result, '1');
    }
    return roundOff(add(result, divide(ln(x), LN2, 68)), 64);
}
function log(base) {
    return roundOff(multiply(ln2(base), LN2), 64);
}
function log10(base) {
    return roundOff(divide(ln(base), LN10, 64 + 2), 64);
}

// Hypotenuse 
function hypot(a, b) {
    return sqRoot(add(intPow(a, '2'), add(intPow(b, '2'))));
}
// Sine functions
function sin(x) {
    if (greaterThan(abs(x), PI)) {
        x = modulus(x, PI, 64);
    }
    let result = '0';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product
    let s = '-1'; // Alternating Sign
    while (true) {
        const N = subtract(multiply(n, '2'), '1'); // Next real term in series (even terms cancel)
        f = multiply(f, N);
        const next = multiply(s, divide(intPow(x, N), f, 68));
        if (testTolerance(abs(next), 64)) {
            result = add(result, next);
            return stripTrailingZero(isAproxZero(result) ? '0' : isAproxOne(result) ? multiply('1', sign(result).toString()) : result);
        }
        result = add(result, next);
        f = multiply(f, multiply(n, '2')); // Iterate once to synchronize Factorial
        n = add(n, '1');
        s = negate(s);
    }
}
function asin(x) {
    validateIsInRange(x, 'asin');
    if (isExatclyOne(abs(x)))
        return roundOff(((sign(x) == 1) ? PI_DIV_2 : negate(PI_DIV_2)), 64);
    if (isExatclyZero(abs(x)))
        return '0';
    let result = '0';
    let n = '1';
    let p = '1';
    let k = '1';
    while (true) {
        const N = multiply(n, '2');
        const R = add(N, '1');
        p = multiply(p, N);
        k = multiply(k, subtract(N, '1'));
        let next = divide(multiply(k, intPow(x, R)), multiply(p, R), 68);
        if (testTolerance(next, 64)) {
            result = add(result, next);
            return stripTrailingZero(roundOff(add(result, x), 64));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}
function sinh(x) {
    return stripTrailingZero(roundOff(subtract(divide(exp(x), '2', 68), divide(exp(negate(x)), '2', 68)), 64));
}
// Cosine functions
function cos(x) {
    if (greaterThan(abs(x), PI)) {
        x = modulus(add(x, PI_DIV_2), PI, 64);
    }
    return sin(x);
}
function acos(x) {
    validateIsInRange(x, 'acos');
    return stripTrailingZero(roundOff(subtract(PI_DIV_2, asin(x)), 64));
}
function cosh(x) {
    return stripTrailingZero(roundOff(divide(add(exp(x), exp(negate(x))), '2', 68), 64));
}
// Tangant functions
function tan(x) {
    return stripTrailingZero(roundOff(divide(sin(x), cos(x), 68), 64));
}
function atan(x) {
    if (greaterThan(abs(x), '1')) {
        return stripTrailingZero(subtract(PI_DIV_2, atan(divide('1', x, 68))));
    }
    let result = '0';
    let n = '0';
    while (true) {
        let N = multiply('2', n);
        let next = divide(multiply(intPow('-1', n), intPow(x, add(N, '1'))), add(N, '1'), 68);
        if (testTolerance(abs(next), 64)) {
            return stripTrailingZero(roundOff(add(result, next), 64));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}
function atan2(y, x) {
    let offset = '0';
    if (isExatclyZero(x) && isExatclyZero(y)) {
        return '0';
    }
    if (isExatclyZero(x) && greaterThan(y, '0')) {
        return stripTrailingZero(roundOff(PI_DIV_2, 64));
    }
    if (isExatclyZero(x) && lessThan(y, '0')) {
        return stripTrailingZero(roundOff(negate(PI_DIV_2), 64));
    }
    if (lessThan(x, '0')) {
        offset = (greaterThan(y, '0', true)) ? PI : negate(PI);
    }
    return stripTrailingZero(roundOff(add(atan(divide(y, x, 68)), offset), 64));
}
function tanh(x) {
    return stripTrailingZero(roundOff(divide(sinh(x), cosh(x), 68), 64));
}

function mean(numbers) {
    validateArray(numbers, 'mean');
    if (numbers.length === 1)
        return numbers[0];
    return divide(numbers.reduce((prev, curr) => {
        return add(prev, curr);
    }, '0'), numbers.length.toString());
}
function median(numbers) {
    validateArray(numbers, 'median');
    if (numbers.length === 1)
        return numbers[0];
    const n = numbers.length.toString();
    numbers = numbers.sort((a, b) => compareTo(a, b));
    if (isOdd(n))
        return numbers[parseInt(divide(add(n, '1'), '2'))];
    let n0 = numbers[parseInt(divide(n, '2'))];
    let n1 = numbers[parseInt(add(divide(n, '2'), '1'))];
    return divide(add(n0, n1), '2');
}
function mode(numbers, last = false) {
    validateArray(numbers, 'mode');
    if (numbers.length === 1)
        return numbers[0];
    numbers = numbers.sort((a, b) => compareTo(a, b));
    const values = [];
    const counts = [];
    numbers.forEach((value) => {
        let i = values.indexOf(value);
        if (i === -1) {
            values.push(value);
            i = values.indexOf(value);
            counts[i] = '0';
        }
        counts[i] = add(counts[i], '1');
    });
    let m = (last) ? counts.lastIndexOf(max(counts)) : counts.indexOf(max(counts));
    return values[m];
}
function variance(numbers) {
    validateArray(numbers, 'variance');
    if (numbers.length === 1)
        return '0';
    const m = mean(numbers);
    numbers = numbers.map((value) => {
        return intPow(subtract(value, m), '2');
    });
    return mean(numbers);
}
function stdDv(numbers) {
    validateArray(numbers, 'stdDv');
    if (numbers.length === 1)
        return '0';
    return sqRoot(variance(numbers));
}
function factorial(n) {
    validateInteger(n, 'factorial');
    validatePositive(n, 'factorial');
    if (isExatclyZero(n) || isExatclyOne(n)) {
        return '1';
    }
    let result = n;
    while (true) {
        if (isExatclyOne(n))
            return result;
        let next = subtract(n, '1');
        result = multiply(result, next);
        n = next;
    }
}
function subfactorial(n) {
    validateInteger(n, 'subfactorial');
    validatePositive(n, 'subfactorial');
    if (isExatclyZero(n) || isExatclyOne(n))
        return '1';
    return roundOff(divide(factorial(n), E));
}

class bigDecimal {
    value;
    static RoundingModes = RoundingModes;
    static validate(number) {
        if (number) {
            number = number.toString();
            if (isNaN(Number(number)))
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
            number = "-0" + number.substring(1);
        //handle exponentiation (scientific notation)
        if (/e/i.test(number)) {
            let [mantisa, exponent] = number.split(/[eE]/);
            let exponentIndex = Number(exponent);
            mantisa = trim(mantisa);
            let sign = "";
            if (mantisa[0] == "-") {
                sign = "-";
                mantisa = mantisa.substring(1);
            }
            if (mantisa.indexOf(".") >= 0) {
                exponentIndex = parseInt(exponent) + mantisa.indexOf(".");
                mantisa = mantisa.replace(".", "");
            }
            else {
                exponentIndex = parseInt(exponent) + mantisa.length;
            }
            if (mantisa.length < exponentIndex) {
                number =
                    sign + mantisa + new Array(exponentIndex - mantisa.length + 1).join("0");
            }
            else if (mantisa.length >= exponentIndex && exponentIndex > 0) {
                number =
                    sign +
                        trim(mantisa.substring(0, exponentIndex)) +
                        (mantisa.length > exponentIndex ? "." + mantisa.substring(exponentIndex) : "");
            }
            else {
                number = sign + "0." + new Array(-exponentIndex + 1).join("0") + mantisa;
            }
        }
        return number;
    }
    constructor(number = "0") {
        this.value = bigDecimal.validate(number);
    }
    getValue() {
        return this.value;
    }
    setValue(num) {
        this.value = bigDecimal.validate(num);
    }
    static getPrettyValue(number, digits = 3, separator = ",") {
        // if (!(digits || separator)) {
        //     digits = 3;
        //     separator = ',';
        // } else if (!(digits && separator)) {
        //     throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
        // }
        number = bigDecimal.validate(number);
        let neg = number.charAt(0) == "-";
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
    }
    getPrettyValue(digits = 3, separator = ",") {
        return bigDecimal.getPrettyValue(this.value, digits, separator);
    }
    static round(number, precision = 0, mode = RoundingModes.HALF_EVEN) {
        number = bigDecimal.validate(number);
        // console.log(number)
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return roundOff(number, precision, mode);
    }
    round(precision = 0, mode = RoundingModes.HALF_EVEN) {
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return new bigDecimal(roundOff(this.value, precision, mode));
    }
    static abs(number) {
        number = bigDecimal.validate(number);
        return abs(number);
    }
    abs() {
        return new bigDecimal(abs(this.value));
    }
    static floor(number) {
        number = bigDecimal.validate(number);
        if (number.indexOf(".") === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.FLOOR);
    }
    floor() {
        if (this.value.indexOf(".") === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.FLOOR);
    }
    static ceil(number) {
        number = bigDecimal.validate(number);
        if (number.indexOf(".") === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.CEILING);
    }
    ceil() {
        if (this.value.indexOf(".") === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.CEILING);
    }
    static add(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return add(number1, number2);
    }
    add(number) {
        return new bigDecimal(add(this.value, number.getValue()));
    }
    static subtract(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return subtract(number1, number2);
    }
    subtract(number) {
        return new bigDecimal(subtract(this.value, number.getValue()));
    }
    static multiply(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply(number1, number2);
    }
    multiply(number) {
        return new bigDecimal(multiply(this.value, number.getValue()));
    }
    static divide(number1, number2, precision) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return divide(number1, number2, precision);
    }
    divide(number, precision) {
        return new bigDecimal(divide(this.value, number.getValue(), precision));
    }
    static modulus(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return modulus(number1, number2);
    }
    modulus(number) {
        return new bigDecimal(modulus(this.value, number.getValue()));
    }
    static modulusE(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return modulusE(number1, number2);
    }
    modulusE(number) {
        return new bigDecimal(modulusE(this.value, number.getValue()));
    }
    static negate(number) {
        number = bigDecimal.validate(number);
        return negate(number);
    }
    negate() {
        return new bigDecimal(negate(this.value));
    }
    // Powers
    static pow(base, exponent, precision = 32) {
        base = bigDecimal.validate(base);
        exponent = bigDecimal.validate(exponent);
        return pow(base, exponent, precision);
    }
    pow(exponent) {
        return new bigDecimal(pow(this.value, exponent.getValue(), 32));
    }
    // Roots
    static get SQRT1_2() {
        return sqRoot('.5');
    }
    static get SQRT2() {
        return sqRoot('2');
    }
    static sqRoot(number) {
        number = bigDecimal.validate(number);
        return sqRoot(number);
    }
    sqRoot() {
        return new bigDecimal(sqRoot(this.value));
    }
    static cbRoot(number) {
        number = bigDecimal.validate(number);
        return cbRoot(number);
    }
    cbRoot() {
        return new bigDecimal(cbRoot(this.value));
    }
    // Logarithms
    static E = E;
    static LN2 = LN2;
    static LN10 = LN10;
    static LOG2E = LOG2E;
    static LOG10E = LOG10E;
    static log2(number) {
        number = bigDecimal.validate(number);
        return ln2(number);
    }
    static log10(number) {
        number = bigDecimal.validate(number);
        return log10(number);
    }
    static log1p(number) {
        number = bigDecimal.validate(number);
        return log(add('1', number));
    }
    static log(number) {
        number = bigDecimal.validate(number);
        return log(number);
    }
    static exp(number) {
        number = bigDecimal.validate(number);
        return exp(number);
    }
    static expm1(number) {
        number = bigDecimal.validate(number);
        return expm1(number);
    }
    // Trig
    static PI = PI;
    static PI2 = PI2;
    static PI_DIV_2 = PI_DIV_2;
    static PI_DIV_4 = PI_DIV_4;
    static hypot(a, b) {
        a = bigDecimal.validate(a);
        b = bigDecimal.validate(b);
        return hypot(a, b);
    }
    static sin(number) {
        number = bigDecimal.validate(number);
        return sin(number);
    }
    static sinh(number) {
        number = bigDecimal.validate(number);
        return sinh(number);
    }
    static asin(number) {
        number = bigDecimal.validate(number);
        return asin(number);
    }
    static cos(number) {
        number = bigDecimal.validate(number);
        return cos(number);
    }
    static cosh(number) {
        number = bigDecimal.validate(number);
        return cosh(number);
    }
    static acos(number) {
        number = bigDecimal.validate(number);
        return acos(number);
    }
    static tan(number) {
        number = bigDecimal.validate(number);
        return tan(number);
    }
    static tanh(number) {
        number = bigDecimal.validate(number);
        return tanh(number);
    }
    static atan(number) {
        number = bigDecimal.validate(number);
        return atan(number);
    }
    static atan2(y, x) {
        x = bigDecimal.validate(x);
        y = bigDecimal.validate(y);
        return atan2(y, x);
    }
    // Statistics
    static mean(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return mean(numbers);
    }
    static median(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return median(numbers);
    }
    static mode(numbers, last = false) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return mode(numbers, last);
    }
    static variance(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return variance(numbers);
    }
    static stdDv(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return stdDv(numbers);
    }
    static factorial(number) {
        number = bigDecimal.validate(number);
        return factorial(number);
    }
    static subfactorial(number) {
        number = bigDecimal.validate(number);
        return subfactorial(number);
    }
    // Comparisons
    static compareTo(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo(number1, number2);
    }
    compareTo(number) {
        return compareTo(this.value, number.getValue());
    }
    static equals(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return equals(number1, number2);
    }
    equals(number) {
        return equals(this.value, number.getValue());
    }
    static lt(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return lessThan(number1, number2);
    }
    lt(number) {
        return lessThan(this.value, number.getValue());
    }
    static leq(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return lessThan(number1, number2, true);
    }
    leq(number) {
        return lessThan(this.value, number.getValue(), true);
    }
    static gt(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return greaterThan(number1, number2);
    }
    gt(number) {
        return greaterThan(this.value, number.getValue());
    }
    static geq(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return greaterThan(number1, number2, true);
    }
    geq(number) {
        return greaterThan(this.value, number.getValue(), true);
    }
    static sign(number) {
        number = bigDecimal.validate(number);
        return sign(number);
    }
    sign() {
        return sign(this.value);
    }
    // Misc.
    static min(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return min(numbers);
    }
    static max(numbers) {
        numbers = numbers.map(number => bigDecimal.validate(number));
        return max(numbers);
    }
    static clamp(number, min = '0', max = '1') {
        number = bigDecimal.validate(number);
        min = bigDecimal.validate(min);
        max = bigDecimal.validate(max);
        return clamp(number, min, max);
    }
    clamp(min = new bigDecimal('0'), max = new bigDecimal('1')) {
        return new bigDecimal(clamp(this.value, min.value, max.value));
    }
    static step(number, s = number) {
        number = bigDecimal.validate(number);
        s = bigDecimal.validate(s);
        return step(number, s);
    }
    static lerp(x, y, a = '1') {
        x = bigDecimal.validate(x);
        y = bigDecimal.validate(y);
        a = bigDecimal.validate(a);
        return lerp(x, y, a);
    }
    static invlerp(x, y, a = x) {
        x = bigDecimal.validate(x);
        y = bigDecimal.validate(y);
        a = bigDecimal.validate(a);
        return invlerp(x, y, a);
    }
    static stripTrailingZero(number) {
        number = bigDecimal.validate(number);
        return stripTrailingZero(number);
    }
    static random(length = 32) {
        return random(length);
    }
    stripTrailingZero() {
        return new bigDecimal(stripTrailingZero(this.value));
    }
}

export { bigDecimal as default };
//# sourceMappingURL=big-decimal.js.map
