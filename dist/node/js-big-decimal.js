(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bigDecimal"] = factory();
	else
		root["bigDecimal"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ big_decimal; }
});

;// CONCATENATED MODULE: ./lib/add.js
function add_add(number1, number2 = "0") {
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

;// CONCATENATED MODULE: ./lib/abs.js
function abs_abs(n) {
    if (typeof n == "number" || typeof n == "bigint")
        n = n.toString();
    if (n[0] == "-")
        return n.substring(1);
    return n;
}

;// CONCATENATED MODULE: ./lib/roundingModes.js
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

;// CONCATENATED MODULE: ./lib/stripTrailingZero.js
/*
* Removes zero from front and back*/
function stripTrailingZero_stripTrailingZero(number) {
    // number = number.replace(/(^[-]?)([0]*)/, `${1}`);
    // number = number.replace(/([0]*$){1}/, '');
    // return number;
    const trimStart = /^(?:[0]+)([^0.]*)/;
    const trimEnd = /((?:[.][0])?[0]*)$/;
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

;// CONCATENATED MODULE: ./lib/round.js


/**
 *
 * @param input the number to round
 * @param n precision
 * @param mode Rounding Mode
 */
function round_roundOff(input, n = 0, mode = RoundingModes.HALF_EVEN) {
    if (typeof (input) == 'number' || typeof (input) == 'bigint')
        input = input.toString();
    if (mode === RoundingModes.UNNECESSARY) {
        let [integers, mantissa] = stripTrailingZero_stripTrailingZero(input.replace('-', '')).split('.');
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
            prefix = round_roundOff(input, 0, mode);
            return (neg ? '-' : '') + prefix + (new Array(n + 1).join('0'));
        }
    }
    // handle case when integer output is desired
    if (n == 0) {
        let l = partInt.length;
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
    if (!part || part === ''.padEnd(part.length + 1, '0'))
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
    let five = '5'.padEnd(part.length + 1, '0');
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
    // return s.split('').reverse().join('');
}

;// CONCATENATED MODULE: ./lib/compareTo.js


function compareTo(number1, number2) {
    let negative = '';
    [number1, number2] = [number1, number2].map(n => stripTrailingZero_stripTrailingZero(n));
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
    ;
    ({ number1, number2 } = pad(number1, number2));
    if (number1.length > number2.length)
        return parseInt(negative + '1');
    if (number1.length < number2.length)
        return (negative) ? 1 : -1;
    [number1, number2] = [negative + number1, negative + number2];
    return number1.localeCompare(number2, undefined, { numeric: true });
}
// Wrapper functions
function compareTo_lessThan(left, right, orEquals = false) {
    return (orEquals) ? (compareTo(left, right) <= 0) : (compareTo(left, right) < 0);
}
function compareTo_greaterThan(left, right, orEquals = false) {
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

;// CONCATENATED MODULE: ./lib/multiply.js


function multiply_multiply(number1, number2) {
    number1 = number1.toString();
    number2 = number2.toString();
    let negativeNumber1 = '';
    let negativeNumber2 = '';
    let negativeResult = '';
    /*Filter numbers*/
    if (number1[0] == '-') {
        number1 = number1.substr(1);
        negativeNumber1 = '-';
    }
    if (number2[0] == '-') {
        number2 = number2.substr(1);
        negativeNumber2 = '-';
    }
    if (isExatclyZero(number1) || isExatclyZero(number2))
        return '0';
    number1 = stripTrailingZero_stripTrailingZero(number1);
    number2 = stripTrailingZero_stripTrailingZero(number2);
    let decimalLength1 = 0;
    let decimalLength2 = 0;
    if (number1.indexOf('.') + 1) {
        decimalLength1 = number1.length - number1.indexOf('.') - 1;
    }
    if (number2.indexOf('.') + 1) {
        decimalLength2 = number2.length - number2.indexOf('.') - 1;
    }
    let decimalLength = decimalLength1 + decimalLength2;
    number1 = negativeNumber1 + stripTrailingZero_stripTrailingZero(number1.replace('.', ''));
    number2 = negativeNumber2 + stripTrailingZero_stripTrailingZero(number2.replace('.', ''));
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
    return negativeResult + result;
}

;// CONCATENATED MODULE: ./lib/divide.js

function divide_divide(dividend, divisor, precission = 8) {
    // Convert to string
    if (typeof dividend == 'number' || typeof divisor == 'number') {
        dividend = dividend.toString();
        divisor = divisor.toString();
    }
    // Return 0 
    if (divisor == '0') {
        return '0' + (!precission) ? '' : 0;
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
    }
    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        negativeDivisor = '-';
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
            resultIndex++;
        }
        return round_roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
    }
    if (resultIndex < 0) {
        if (intDifference > 0) {
            if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && (dividendInt * paddingInt) > divisorInt)
                resultIndex++;
        }
        else {
            if ((dividendInt * paddingInt) > divisorInt)
                resultIndex++;
        }
        return round_roundOff(negativeResult + '0.'.padEnd(Math.abs(resultIndex) + 2, '0') + result, precission);
    }
    if (resultIndex == 0) {
        if (intDifference > 0 && dividendInt > (divisorInt * paddingInt)) {
            resultIndex++;
            return round_roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (intDifference < 0 && (dividendInt * paddingInt) > divisorInt) {
            resultIndex++;
            return round_roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (dividendInt > (divisorInt) || dividendInt == divisorInt) {
            resultIndex++;
            return round_roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        return round_roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
    }
}

;// CONCATENATED MODULE: ./lib/subtract.js

function subtract_subtract(number1, number2) {
    number1 = number1.toString();
    number2 = subtract_negate(number2.toString());
    return add_add(number1, number2);
}
function subtract_negate(number) {
    return (number[0] == '-') ? number.substring(1) : '-' + number;
}

;// CONCATENATED MODULE: ./lib/modulus.js






function modulusE(n, base = 1, precision = undefined) {
    if (base == 0) {
        throw new Error('Cannot divide by 0');
    }
    n = n.toString();
    base = base.toString();
    validate(base);
    return subtract_subtract(n, multiply_multiply(base, round_roundOff(divide_divide(n, base, precision), 0, RoundingModes.FLOOR)));
}
function modulus(dividend, divisor = 1, precision = undefined) {
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }
    dividend = dividend.toString();
    divisor = divisor.toString();
    validate(divisor);
    const result = modulusE(abs_abs(dividend), abs_abs(divisor), precision);
    return (dividend.includes('-')) ? subtract_negate(result) : result;
}
function validate(oparand) {
    if (oparand.includes('.')) {
        throw new Error('Modulus of non-integers not supported');
    }
}

;// CONCATENATED MODULE: ./lib/constants.js
const E = '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354021234078498193343210682';
const LN2 = '0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347648114941864238677677441';
const LOG2E = '1.4426950408889634073599246810018921374266459541529859341354494069311092191811850798855266228935063444969975183096525442555931016871683596427206621582234793362745373698847184936307013876635320155338943189166648376431286154240474784222894979047950915303513385880549688658930969963680361105110756308441454272158283449418919339085777157900441712802468483413745226951823690112390940344599685399061134217228862780291580106300619767624456526059950737532406256558154759381783052397255107248130771562675458075781713301935730061687619373729826758974156238179835671034434897506807055180884865613868329177321829349139684310593454022025186369345262692150955971910022196792243214334244941790714551184993859212216753653113007746327672064612337411082119137944333984805793109128776096702003757589981588518061267880997609562525078410248470569007687680584613278654747820278086594620609107490153248199697305790152723247872987409812541000334486875738223647164945447537067167595899428099818267834901316666335348036789869446887091166604973537292585';
const LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058';
const LOG10E = '0.4342944819032518276511289189166050822943970058036665661144537831658646492088707747292249493384317483187061067447663037336416792871589639065692210646628122658521270865686703295933708696588266883311636077384905142844348666768646586085135561482123487653435434357317253835622281395603048646652366095539377356176323431916710991411597894962993512457934926357655469077671082419150479910989674900103277537653570270087328550951731440674697951899513594088040423931518868108402544654089797029863286828762624144013457043546132920600712605104028367125954846287707861998992326748439902348171535934551079475492552482577820679220140931468164467381030560475635720408883383209488996522717494541331791417640247407505788767860971099257547730046048656049515610057985741340272675201439247917970859047931285212493341197329877226463885350226083881626316463883553685501768460295286399391633510647555704050513182342988874882120643595023818902643317711537382203362634416478397146001858396093006317333986134035135741787144971453076492968331392399810609';

;// CONCATENATED MODULE: ./lib/utils.js








function factorial(n) {
    n = n.toString();
    validateInteger(n);
    validatePositive(n);
    if (isExatclyZero(n) || isExatclyOne(n)) {
        return '1';
    }
    let result = n;
    while (true) {
        if (isExatclyOne(n))
            return result;
        let next = subtract_subtract(n, '1');
        result = multiply_multiply(result, next);
        n = next;
    }
}
function subfactorial(n) {
    n = n.toString();
    validateInteger(n);
    validatePositive(n);
    if (isExatclyZero(n) || isExatclyOne(n))
        return '1';
    return round_roundOff(divide_divide(factorial(n), E));
}
function sigma(n, limit, fn, ...args) {
    n = n.toString();
    limit = limit.toString();
    validateInteger(n);
    validateInteger(limit);
    validatePositive(n);
    validatePositive(limit);
    let result = '0';
    while (greaterThan(limit, subtract(n, '1'))) {
        result = add(result, fn(limit, ...args));
        limit = subtract(limit, '1');
    }
    return result;
}
function alternatingSeries(n, limit, fn, _sign = '1') {
    n = n.toString();
    limit = limit.toString();
    _sign = sign(_sign.toString()).toString();
    if (lessThan(n, '1')) {
        throw new Error('[alternatingSeries]: Argument n is less than 1');
    }
    validateInteger(n);
    validateInteger(limit);
    validatePositive(limit);
    let result = '0';
    while (true) {
        const next = multiply(_sign, fn(n));
        if (lessThan(abs(next), utils_tolerance(limit)))
            return result;
        result = add(result, next);
        _sign = negate(_sign);
        n = add(n, '1');
    }
}
function utils_tolerance(precision) {
    precision = precision.toString();
    validateInteger(precision);
    if (isExatclyZero(precision))
        return '0';
    if (precision[0] == '-')
        return '1'.padEnd(Number(abs_abs(precision)) + 1, '0');
    return '0.'.padEnd(Number(abs_abs(precision)) + 2, '0') + '1';
}
function isAproxZero(number, precision = 8) {
    precision = Math.max(1, precision);
    number = abs_abs(number.toString());
    if (isExatclyZero(number))
        return true;
    if (compareTo_lessThan(number, utils_tolerance(precision), true))
        return true;
    return false;
}
function isAproxOne(number, percision = 8) {
    percision = Math.max(1, percision);
    number = abs_abs(number.toString());
    if (isExatclyOne(number))
        return true;
    if (compareTo_lessThan(abs_abs(subtract_subtract('1', number)), utils_tolerance(percision), true))
        return true;
    return false;
}
function sign(number) {
    number = number.toString();
    if (isExatclyZero(number))
        return 0;
    return (number[0] == '-') ? -1 : 1;
}
function utils_testTolerance(target, precision) {
    return RegExp(`^([0]{1}\\.[0]{${precision + 2},}[\\d]{1})`).test(target);
}
function min(numbers) {
    if (numbers.length === 0)
        throw Error('[Min]: Empty array.');
    if (numbers.length === 1)
        return numbers[0];
    return numbers.reduce((prev, curr) => {
        if (compareTo_lessThan(prev, curr, true))
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
        if (compareTo_greaterThan(prev, curr, true))
            return prev;
        return curr;
    }, numbers[0]);
}
function clamp(n, x = '0', y = '1') {
    return min([y, max([x, n])]);
}
function step(number, step = number) {
    return multiply_multiply(round_roundOff(divide_divide(number, step)), step);
}
function lerp(x, y, a = '1') {
    return add_add(multiply_multiply(x, subtract_subtract('1', a)), multiply_multiply(y, a));
}
;
function invlerp(x, y, a) {
    return clamp(divide_divide(subtract_subtract(a, x), subtract_subtract(y, x)));
}
;
function random(length = 32) {
    length = Math.max(length, 32);
    const n = crypto.getRandomValues(new Uint32Array(length + 10));
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let r = '.';
    let c = 10;
    while (c != 0) {
        let i = Math.floor((n[length - c] / 4294967296) * c);
        c--;
        [digits[c], digits[i]] = [digits[i], digits[c]];
    }
    for (let i = 0; i < length; i++) {
        r += digits[Math.floor((n[i] / 4294967296) * 10)];
    }
    return r;
}
;
function validateInteger(number) {
    if (number.includes('.')) {
        throw new Error('Non-integers not supported');
    }
}
function validatePositive(number) {
    if (number[0] == '-') {
        throw new Error('Negatives not supported');
    }
}

;// CONCATENATED MODULE: ./lib/pow.js










// import { AddInstantiate } from "./assembly/math";
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
function pow(base, exponent, precision = 32, negate = false) {
    exponent = exponent.toString();
    base = base.toString();
    if (isExatclyZero(exponent)) {
        return '1';
    }
    if (!exponent.includes('-') && isExatclyOne(exponent)) {
        return base;
    }
    if (isExatclyZero(base) && exponent.includes('-') && isExatclyOne(exponent)) {
        throw Error('0^(-1) is undefined');
    }
    const finalize = (result) => {
        result = (negativeExponent) ? divide_divide(1, result, precision + 1) : result;
        result = (precision) ? round_roundOff(result, precision) : result;
        return (negate) ? stripTrailingZero_stripTrailingZero(subtract_negate(result)) : stripTrailingZero_stripTrailingZero(result);
    };
    const negativeBase = base.includes('-');
    const negativeExponent = exponent.includes('-');
    const exponentParts = exponent.split('.');
    const exponentSignificand = exponentParts[1];
    let fractionalExponent = '1';
    let result;
    if (equals(abs_abs(base), '10')) {
        result = (negativeExponent) ? utils_tolerance(abs_abs(exponentParts[0])) : utils_tolerance('-' + exponentParts[0]);
    }
    else {
        result = intPow(abs_abs(base), abs_abs(exponentParts[0]));
    }
    if (exponentSignificand) {
        if (negativeBase) {
            negate = !negate;
        }
        let minPrecision = Math.max(precision + parseInt(multiply_multiply(base.length.toString(), round_roundOff(exponent, 0, RoundingModes.CEILING))), precision + base.length);
        precision = Math.max(precision, 32);
        let tempBase = base;
        for (let i = 0; i < exponentSignificand.length; i++) {
            if (isOdd(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '9':
                        fractionalExponent = multiply_multiply(fractionalExponent, multiply_multiply(intPow(nthRoot(tempBase, 5, minPrecision + i, precision + i), '2'), nthRoot(tempBase, 2, minPrecision, precision))); // (2 * 2) + 5 = 9
                        break;
                    case '7':
                        fractionalExponent = multiply_multiply(fractionalExponent, multiply_multiply(nthRoot(tempBase, 5, minPrecision + i, precision + i), nthRoot(tempBase, 2, minPrecision, precision))); // 2 + 5 = 7
                        break;
                    case '5':
                        fractionalExponent = multiply_multiply(fractionalExponent, nthRoot(tempBase, 2, minPrecision, precision)); // 5
                        break;
                    case '3':
                        fractionalExponent = multiply_multiply(fractionalExponent, nthRoot(tempBase, 3, minPrecision, precision));
                        break;
                    case '1':
                        fractionalExponent = multiply_multiply(fractionalExponent, nthRoot(nthRoot(tempBase, 5, minPrecision + i, precision), 2, minPrecision, precision)); // 2 / 2 = 1
                        break;
                }
            }
            if (isEven(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '8':
                        fractionalExponent = multiply_multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i, precision), '4')); // 2 * 4 = 8
                        break;
                    case '6':
                        fractionalExponent = multiply_multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i, precision), '3')); // 2 * 3 = 6
                        break;
                    case '4':
                        fractionalExponent = multiply_multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i, precision), '2')); // 2 * 2 = 4
                        break;
                    case '2':
                        fractionalExponent = multiply_multiply(fractionalExponent, nthRoot(tempBase, 5, minPrecision + i, precision)); // 2
                        break;
                    case '0':
                        break;
                }
            }
            if (i < exponentSignificand.length - 1)
                tempBase = nthRoot(nthRoot(tempBase, 5, minPrecision + i, precision), 2, minPrecision, precision);
        }
        return finalize(multiply_multiply(result, fractionalExponent));
    }
    else {
        return finalize(result);
    }
}
;
function intPow(base, exponent) {
    let exp = parseInt(abs_abs(exponent));
    let result = '1';
    while (exp > 0) {
        if (exp % 2) {
            result = multiply_multiply(result, base);
        }
        base = multiply_multiply(base, base);
        exp = exp >> 1;
    }
    return result;
}
function nthRoot(x, n, precision = 16, t = 16) {
    x = x.toString();
    n = n.toString();
    pow_validate(n);
    const initialGuess = () => {
        let _x = BigInt(round_roundOff(x));
        let _n = BigInt(n);
        let _guess = BigInt('1');
        while (_x > _n) {
            _x = _x >> _n;
            _guess = _guess << BigInt('1');
        }
        return _guess.toString();
    };
    let guess = initialGuess();
    let nMinusOne = subtract_subtract(n, 1);
    let difference = '0';
    let lastDifference = x;
    let i = 4;
    while (true) {
        let newGuess = stripTrailingZero_stripTrailingZero(divide_divide(add_add(stripTrailingZero_stripTrailingZero(divide_divide(x, intPow(guess, nMinusOne), precision + i + 2)), multiply_multiply(guess, nMinusOne)), n, precision + i));
        difference = stripTrailingZero_stripTrailingZero(abs_abs(subtract_subtract(guess, newGuess)));
        if (pow_testTolerance(difference, t + i)) {
            return stripTrailingZero_stripTrailingZero(round_roundOff(newGuess, precision + 2));
        }
        if (compareTo_greaterThan(difference, lastDifference)) {
            return stripTrailingZero_stripTrailingZero(round_roundOff(bisectionRoot(x, n, newGuess, precision + 2), precision + 2));
        }
        lastDifference = difference;
        guess = stripTrailingZero_stripTrailingZero(newGuess);
        i++;
    }
}
function bisectionRoot(x, n, g, precision = 32) {
    const f0 = (v, n, x) => {
        return stripTrailingZero_stripTrailingZero(subtract_subtract(intPow(v, n), x));
    };
    const f1 = (x, n) => {
        return stripTrailingZero_stripTrailingZero(multiply_multiply(n, intPow(x, subtract_subtract(n, '1'))));
    };
    const threshold = utils_tolerance(precision);
    let left = subtract_negate(g);
    let right = g;
    let v = '0';
    let prevV0 = '0';
    while (true) {
        v = stripTrailingZero_stripTrailingZero(divide_divide(add_add(left, right), 2, precision + 4));
        let v0 = f0(v, n, x);
        const v1 = f1(v, n);
        if (compareTo_lessThan(multiply_multiply(v0, v1), '0', true)) {
            left = stripTrailingZero_stripTrailingZero(v);
        }
        else {
            right = stripTrailingZero_stripTrailingZero(v);
        }
        v0 = abs_abs(v0);
        if ((compareTo_lessThan(v0, threshold)) || equals(v0, prevV0)) {
            return stripTrailingZero_stripTrailingZero(round_roundOff(v, precision + 2));
        }
        prevV0 = v0;
    }
}
function inverseSqRoot(number) {
    number = number.toString();
    let n = abs(number);
    let guess = '1';
    let difference = '0';
    let previousDifference = n;
    let i = 0;
    while (i < 10) {
        let newGuess = roundOff(multiply(guess, subtract('1.5', roundOff(multiply(divide(number, 2, 33), pow(guess, 2, 33)), 33))), 33);
        difference = abs(subtract(guess, newGuess));
        if (greaterThan(difference, previousDifference)) {
            return stripTrailingZero(roundOff(guess, 32 + 1));
        }
        if (lessThan(difference, tolerance(32 - 1))) {
            return stripTrailingZero(roundOff(guess, 32 + 1));
        }
        previousDifference = difference;
        guess = newGuess;
        i++;
    }
}
function sqRoot(base, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 2, precision, precision + 1);
}
function cbRoot(base, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 3, precision, precision + 1);
}
function root4(base, precision = 32) {
    precision = Math.max(precision, 32);
    return sqRoot(sqRoot(base, precision + 4), precision);
}
function root5(base, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 5, precision, precision + 1);
}
function root10(base, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 10, precision, precision + 1);
    // return sqRoot(root5(base, precision + 4), precision + 2);
}
function pow_testTolerance(target, precision) {
    return RegExp(`^([0]{1}\\.[0]{${precision + 2},}[\\d]{1})`).test(target);
}
function pow_validate(oparand) {
    if (oparand.includes('.')) {
        throw Error('Root base of non-integers not supported');
    }
}

;// CONCATENATED MODULE: ./lib/tables/e.js
const E_ROOTS_FOR_POW = [
    [
        "1",
        "1.1051709180756476248117078264902466682245471947375187187928632894409679667476543029891433189707486536329171204854012445361537347145315787020068902997574505197515004866018321613310249357028047934586850494525645057122112661163770326284627042965573236001851139",
        "1.22140275816016983392107199463967417030758094152050364127342509859920623308363781624228874401337247396902783756582071222657872335735698322420203091783847852468196963515090275879656423105784038067892980765878816657563573480602908117582872101992234299467757368987418370836563153389462747746988296269108061275281392456208243249268026539778924251026176313926132967183139404485664941616843691597024447586738912784063277359127768204092782706320234475212712014508481918262357879464226202483894518888192549035034715597321",
        "1.349858807576003103983744313328007330378299697359365803049917989939612587399539891293796485784096715182993915046496649823555281317904746176330174697914134611623510180348776728882134107658893142886237546315268956423659470780978312757181276728365015226253890933258389419871658954993580579042712940646224891469297274304073301451390889351970899528642926347862338071149211408737527216178389071834814268450261525986465964604240725313283687637440963107718301330951356415753972714631376348680064772218613611483339228569651085445294350178104320530288284696175866807479054565245092139097584381245312021271592764191527971036208743048564156633628960281631838046184539943675102487856097772374221297245505051183848015221680960625161769660863247928466143070056933155076029152109198619",
        "1.4918246976412703178248529528372222806432827739374252815956331500723650987080270940005743751395204332995146049712374327554149926253602141716230772600403407491873867150724945487212617660656620072704264395870570315311010113322105932230805422737018500206392527177438579578556189926416736085144638705057672356404429354629959069215296346423445412842930842338368651426888702440282339072078820428812172552291679864844405874392991397534151119907597315402375400805761858764070148579243901394571509123129260659970829149641445173093621736697471495715486927871427608521974813357303938049045027055274617248235377478635882464544179074744286716592660820629566276461885843196142347558399965088751380486680925242174092668548306167997919161040598441807559801618039547286283635268768983411911084036444003391406619758488846706626640355860622307506467065190571454306273600406778135267686009580686515055777572568306309595260360492639973537087137347050023394616393906703697628564832791198689610819908805991960205502002473532624419443167353822377041",
        "1.64872127070012814684865078781416357165377610071014801157507931164066102119421560863277652005636664300286663775630779700467116697521960915984097145249005979692942265909840391471994846465948924489686890533641846572084106665685980008892498121171228737521497221259813802364604394123302337702342564441115073997210339345543632427971478640993009214371685872851424554356204792843238295646431490989989559298639300873734528343887199639936097616043887791159196535233519726480396696337931220763089035352455056481345843941842020212763119317243234414790916753474172146106996570450921757574263944725690829548117247432018340633298482417480890385134505857727555061166714846142254643382172817464252944064119480610550411214216150015806428026218072435549458500264910615270634896131341405150953300907304199696610224898662704055364699222488547803416596626400854705247760207415313247478751208997988819063167774971424158059320000508837926711487592221411833120473118940174150839318956411265214927589489222002618989424703890008658172723963726628180320021102408885281948306909133579708714540083108622117282123853386065037903914832977915548985425218334949782721619507339453842540738918246146490048448660414624464961524536296212426067836554424656828424228138566437904693429740129065343555896062662077213299699",
        "1.822118800390508974875367668162864513382238808546435386320547476588819650298619237506071841611824533131511980084733212162604411051946388331577800804030556735220810982370501962391864313333554698490208265658190969819090734754749827177848273296632519555680103680326369352437791893895038152776723546377012529473207851151551688242638129468067423693457788686737322308859196635577406424535317253509122371220622994977976488678953227355968535226011981026891265759205286137730603315671631660105006528658431765125587595376593446335729037108814939435477611527959248377638771800033625299101758522787812658726842991493891554409933462204120505376533298706281045546514892620277647385214857618436655863924892218047400811116831042680487895029611648906250960278076271249277145102395991693860611831983025203596058754756019516099900266095850415178719614749200451630535061160489190411763823857450791548961055118169806794713874454939988586811643596429338746010525986899857961587944139308107436769695508633096338687346716373921410474524266689139689311366516947054631031160462923809187729982871513915427654871105844432037418907865839686988704917607346571370310822906994525483818469890762365701037332197459906166318134391275013867439967207601879970902034384688314406747097203766024003073884672273060729687254540281852107793074492986426871326231804793173823349508810551286252776477149073401952138042782050652434065326561952854233161279618029767330128021096195903742999575860846854523510091165177814675930213024375018164078691687009724255773069550816206514391507161",
        "2.0137527074704765216245493885830652700175423941458673115689893008797813008588679406324379355851788044338331898308254040110152144406355672122332987484386680282011586454587874291207920063096506060092121746339385003035706369942761654499650114370277576609074394476969349195415563411287148054594195014950075492700297283186501952215548266611861363515166840789209921665299236941497660514195676818497506715216174857824667584113677462277646521368145755169801610652069383900929636397476997976928986121402340613272005739386746343595131239407140625657434766755405604726559983098911197009867487590223559613492600292768297051485732713550448835403835352549463376130577581804732758041958835979535301727820054018405592264887175988369901092552028042689226587551744843184492524888491684438908350917254501814719615534981346941241332070048752850076613909872221227923256131385070038327284304187184081154788930005575892847954811706365631293695056764191098947623473863749480484940756222177807267238801516870654540558247853395741216289690556742625956213865161202746032011088919700768154544490761339022261482519814495299963404741430504214836798155729249493697925254743226038042230995868518047785789005613825713835594435128868667771495101069180401795064269233374799738867352453002639997668416935366386592304127698022250575283863420166408296272643322148060907484201210428960680526033446678578974007350742511058399463304152252983283111059782340661351915733128923447394041481646451630961371702270477501539244567625913375076027018672900253183869684213821854331885455218593203695168621845862590839866070698465191768354775162667919687787234057113703426381234125007404970096051044315268874858727339518165207062282508219103550897032474383182390962719939041810953987104324795493331907049865728024468068697764264074787176174506379",
        "2.22554092849246760457953753139507675705363413504848459611858395555662261021440632023826379767119915026374251878156387711619774619379855963687103747368472284226448865340655354317185985377030850245682664363225661079813536128785653726513719167842427129812110484311349165777902729389254511878094742813123387667848699059429446010657151043572826832010313208047732807930998614309870757227929101960381147954847517822334863279319666225559304046050087758825776791641245416220959090737379947978891910964567194089715072100803252233073248441719882854257031516049204581676853691460008296615228145430792751845579928748303335224298540140591302535466469498156065075049022167880244375473655622669689327650015305079415315439914200799195123789362957387187941117003174099693531506115168225416846731445216503066154563061060352226369700173570788781093516825383897874045751999350339808378867887307801498607904212244602606554161614131633524614531883236101562055698735197422864246157477439558784175923341664781731182017904677692890038751961431930364624097536076577459379586929940521167397559605869035407545793472238578147959537818114915637152419390460744941310780904484651026135598787393535566242027093950477170576851928767959213832520123359412209544604227356318776838329784976706937070674967308806522361845995066951391233792165311759338384098919371408326428769572713806130074267342996786117989877955011626521519806731160466960246214623368412017241669817519218938975787703688279670969520255459580782566824698766683025943011418413515424475714850262109066781102851851979626998205883326687030200455933362261083827188323248686155376982520491891859193912296678363031851095031585999296235557983401989894925443480452646143604665935035873612963289853124279447614565761048011466854209825044470072858946253771110646120878816878134534234062942337153869787247084363695742055676354219872791968697195149737804123025516854480966929100783654238470977617175020837913707478778991341149220208658404839283930641502839083068918900160104096532950404697685876434536064090817056280532188943563915681",
        "2.459603111156949663800126563602470695421772306440083020748545736657466552943365860870497185275930801502314734282469001211863377120754375262961184698244101923873118980752553546206085511483915775565746633877944570171310441342807039240011800950067877653276578939207957922264156281735850299153120666705464183289626292382107850626757086481112777076313695819244326645247215187769898739208923979309373990446742434297871759538487547808364593778694498844772835078016714351373598016467631087278899749286697713740248674901887803256296138548656549872572977525766104722565107146500648985987203867132117547677722793432947466268434715992314177189845879538433878518025300096774542323436522591754634721655783263629640839419113447179019145648844517390978320904868643199845305360956544494557422964230972024073035383722263932056673976596266688976321828928564444485955130282123956383440560652142134812702650195318853004793654327694163135311018560302434548157745596278924049359462262875684655024660621143270223276160205111113928674619513010825531773437719585670055905189480192487461443889421286148006246588358783823432756235263368472035520311691553695512537108796193920657766396287812148336508130560411995851432991098150316151710626822458450166702368954969918890855718477702866142861632457171714589428586925352111493288264877793764611187635117419219667724089358648691849349019774953975112073361668366390843101189643022503196449529273850914731962177302267814885008720265909052869903077134292211446012339728016145173776605298068332932215627064339536349963737505457519321720111235396885978665426051921476079008722809300128117266650623362110732864760301900017299660039379063962560499694800926090914390798018070659760804286858439659842007948172165140806138672059440570988428291170643822030057401246220069601172550649731972117725967828449725240661095291919679379580274098603455617464670785310583926637393873619156058283990235643046346147091976283156228115434842186613044398987912680078472025977495377880564317393705447963819914365733951865401782223781823067701249854212472507082498852675712141033436456921920235635932416059888043961227210308986402540506511344650923632565845792598802341393743342422242830490309556974956001755607771592980368429255689748738593726168543904401740920843388611933767910638184739366965114643113679309810659"
    ],
    [
        "1",
        "1.010050167084168057542165456902860033807362201524292515164404031254374190731323852253210417020805424644822048349018187461836882962867029471348122509994980620193343756983419263331678116890952977342412525238660052128564771661099141138373740030932375484797474253",
        "1.020201340026755810160143920483151435303508991193925577274241055989764698001799473651140929048897747567783800834245028828510331946890882290633380114769851598685744140375597170707424349379520528467454229732767262381708980414285750783230743973744291273147993499",
        "1.030454533953516855612439953831198132905025142988223325669945482984656275528143507413690159736153367833262717667969420762924665205128543186726815728146644027749899016551570459982549960946831724287476034271222234314936525314771353449031855228611755471551229794",
        "1.040810774192388226757044757916854744082977050312312035233957186052848044168317778353605489758071664887267683574643292017752950273390217859298583514134022896444615385627894619269308729639149680681368915289974692924712790670871941809116920080546004777009977082",
        "1.051271096376024039697517636335645220174821296055062528783938479166279869650561268909887381693097467956359959802287840109856898277991870910996931622269015847528217521038290049746389922767632968070266132836298958452051202283898407113137668129272719733709427182",
        "1.061836546545359622224684877168372328428260420330079059772946224885572614646084795028727107540254028462725979079478817859771763808885702260691363941508870196834078432934454312238181936983945541942068693355958230093508349025302765186495840221334120606071291923",
        "1.072508181254216479053103949889114605574958973093013631368581996384184663872870122142938195770222664418254764408892720110775221918308589471660420537322754050996390544947060412014702775390723097905171301841614973139324709852063472998538152057727154702871352078",
        "1.083287067674958554435987758674888500198713572836593968977149136159258009574303026493771584720423995154971654271223663348911143174715668624259808265653232762681246142307810608195731327006732520819601068839992977872631673981442100729100750479561971721703257072",
        "1.094174283705210357872897623544886011846519908747085113495537273829677943694135052107150933181696135377161199865920871107158317262615140642553465724478938198810156930341222455108468641066277461818416868403944990238207068911482417587752512679561090991848685506"
    ],
    [
        "1",
        "1.001000500166708341668055753993058311563076200580701460228514674460359748251448298412718226004153260943068218872095099342063678696119623840972330905531768311923556198498023652909377677730283868486287409870317224336827290668524342227007650646080335377683539402",
        "1.002002001334000266755580958731569947141262360355881650784254327401407826211342908735167751841578573842087720874539215063369808541481798858488186179510193185360846688470245765779287676702093047345577268794005585346872102348621068884894677639696274087962023832",
        "1.00300450450337702601293409134890020533187271956193064005816386977887704167032778817835718449794009129738172654330257629939497609228121058276487935834566645111932939622158438169617802320237286016173845852664382662772735225891910141326100743286140812329716465",
        "1.004008010677341872358807975325862256786679584568446515824520101445505613334720499643274149387061934130095719684438458233489149633082954545826902702369355374132139019359038155028498554482932087796695756199850948857306997101347029384618537438780565191707911304",
        "1.005012520859401063383566241124068580734875538593956360758053700178766756245814257769725878531005582561752872914964453059693371357350351629785031289228112479393000390737852735490064653453473263950263469180412515034868068037410009410423281936206661529650777831",
        "1.006018036054064864855584542073814807663397023131207238128209310729162232251624511692721095036373574483233356676638823820201979261982436682169260741126877359539784408851803860808991870535936635545440055073405777167775394256588337226812975070293010932647774324",
        "1.007024557266848555231600031941337387260626958324843573515364689887121935057426030048643842343378401601112246752543195873570584146404476681012065985847363008474306541126869561447531097035189821427350474715365757081347202689171315251277667530845240665265299241",
        "1.008032085504273431172073614608631847461248193629898477319670850659315558055203072544926387076982815517924276700035813263652577025921163294422287501988755195063376817413349886928919042162630307237198554733730866338155519701284057736281012337251398647856788345",
        "1.009040621773867814062570481311874274057745096807557533536793791893309190089211313774252518807101361017003109570357638320235688072443915664196164220142177807129999765515285503655079866550036049450757501377434724079219971788693007550857637620196056994725614551"
    ],
    [
        "1",
        "1.000100005000166670833416668055575397073415454172178381034635390972311235972781757573430475110294393277744056856189456093377349308639835234864147024859575654444223594337482525749599468629752896998058770389517981545014836069937171108315141768826558752790276236",
        "1.000200020001333400002666755558095301588712550265063340281249616462339933552635650404575689469783860722328853092919751879277515614513727994472210356634280535514759912694604145062526466543039555669877231954222323073542460530523928410171365347075351011821920295",
        "1.000300045004500337520251012543394484429242698705094453657909046405426810389812679452584785775653629322172025648290344728788948443651164069121340691369780280752072301321554544169816823932077142996969576906644974657939554818844412637302594762038150619715293429",
        "1.000400080010667733418672355880651175325602089234218127313638994866471733257393689147689037528495706906710548020054317971434500261679934483484883365324764324379786145945431964915418427301969396382574915094633029858419556374510345888380818423418110019646700504",
        "1.000500125020835937760438369605751648487716767772005667654052528513185499225469269404161288162290263445071720143880459750657027560342513592842257775359779789305459334406770729214405898908865552327309638003027229853587275580967668200112228756540688352311154381",
        "1.000600180036005400648064805554702313487380662321427742218779523265089444076340698564952604142576704373734829905992750918066261276845603358030914225286385902646373896497226913904457327994080504271798651358706636453059949377387742804353973513521969936501752549",
        "1.000700245057176672234080084397124317808729972049887082920697544556118662092675751649525697937257144190017868483717030126300200509168688033318071339742627167336587481821812960447646818515221045591253213703416322339042019757058294741478286115192071830262104121",
        "1.000800320085350402731030797169875671484970787023831957698136827590544488579455328399517237263085338370118947386598991767922241276098928474413390097019906957313039688997723589590992573554820372138559418413121238600026229549189496894374911921472634282466150763",
        "1.000900405121527342421488207410855909240960364438870706386170964512041266577901813243995078190574746902747080924348105047677314326983090277701922714443700530813227920787438119571392945308376198426393506918634436746759027328287815213664693795332524735463087053"
    ],
    [
        "1",
        "1.000010000050000166667083334166668055557539685019844025575947974286518040859924541627171360141414808527964710456114808568579194429073542519236311802480484946481318067459005203787629467197723492854996446403371670522585399835010157731202234906636252385776731651",
        "1.00002000020000133334000002666675555580952444444585538201058714126235905329240541941460463111260447087759745526170244469724542720133236462083910268982377765723546309959873516346614722768345641097465014525930010435730044916587618556635026327839524395833885967",
        "1.000030000450004500033750202501012504339301986661384091295086648836751748647469450015964451670052983888622000581616827713185780669338108129262463661100560276359891431254482497644594518311264674989317833539411130935378547235234149850030248683847558235949192424",
        "1.000040000800010666773334186672355588063654603897004653273294246986372534769339653940902480758988473452263946419318465732269864516290202354028672947499884769594544980789708021919265600923317888907545126143154207287758799568586448736519103967528945971526548865",
        "1.000050001250020833593752604188368210566445007862474552660354358193300410181171307606063524320643523978564544928969865946453669990898899456698349198366716859128164016860292475535424871378362068018619464946001908269309911380465115625730470139574546168248414669",
        "1.0000600018000360005400064800648005554327371706287380580517448041768184715082802102822710639972596644286364335407098336787101683082519331743726773721831155799714031419453036224798582793575860149124712362688085932620035829070681390851428693479523215791315023",
        "1.000070002450057167667097339330069689583742177176723647063988790354210467474771865973142735988449874178404296043885131632312715760670823804989006222060531708444185344331114273860623983993837941069162433957327267046454693493702350816632053640929378397569224776",
        "1.000080003200085335040027307030759716613039100029766726281645469033146244455371326825242410362812667390249632806855063393511294820363074995773170886211112043017322472818660214389638836378249754133527844678406244041534554373988144575477289266056935662827704568",
        "1.000090004050121502733799208238121990124620911386617650268545997115197477729772808193789097698902228616779638545143688002498080668191392250030819907953393555632250735284651864761358652086319522549247127067080851958286265291953836318860562133321982933710810154"
    ],
    [
        "1",
        "1.000001000000500000166666708333341666668055555753968278769844025573467813076198494952835391203458229748677004015804035149881283353005876638466337275595012771755160063386490687362457247978228580884154230359796042066216890640463145470846706955844825203502338433",
        "1.000002000002000001333334000000266666755555580952387301588712522328042379349054566833660167181437047765093225411054231512232000686252213399825626439733598663743759193375087814488620462276244525976983466408498021993849036041894526504322094571719953352997296398",
        "1.000003000004500004500003375002025001012500433928734151839955373415183009335525061132656460958137667580015165164788249607585867396819057285326555960166937649697973379255965258502453132749605555659281253337641722497540635905649955343904464110817430087236277383",
        "1.000004000008000010666677333341866672355558806350831746754144909770828180249872278427090395131851159823632422197402740977847069569299698172678405177176752031063667161866596069388686444135669904957535469560754938297276129090532495319450469310001482708633857767",
        "1.000005000012500020833359375026041688368071056557307173041021760810581713597910150822615040172518383155879039901575224781594686498583161076660122024484253078169629131959213103609416701449976071941387410235464597750689312106461726726423745914525437286467921547",
        "1.000006000018000036000054000064800064800055542898800027771445234294803121427534564955943850794837297671518974352450646804505269707458299371394556170457704109967851854196460183929711397642333451409044458139769431977686515948803676537433882198942436033685726107",
        "1.000007000024500057166766708473391830068218957087420770926023058705014627836931346376561248648943914301771998667561988061508464250718883634451632563486535656537167272887888081122818446250297457337741167996349750029452642438203264827808024523752573238419578446",
        "1.000008000032000085333504000273067030755971657558959100027103654818370719061312164579253428366464456865704272537228885187015821963109960213301575481664899700318156977468627339004606537398549611534419591779145085995021987503286692083161615280400738437478228082",
        "1.000009000040500121500273375492075738113449002853342362270826936522769439053506312434733891423696475231451840105639022034099547530631069357197734900223780917121362697414411169834162425824448828187739490931751957990245737110414834239697625619798509198502096658"
    ],
    [
        "1",
        "1.000000100000005000000166666670833333416666668055555575396825644841272597001791225749809603978358318652155457825720723310835749477655921114381043370965778946803600487177628675696518849337844070626989834763657881129895761844201299169626521857477088528076787941",
        "1.0000002000000200000013333334000000026666667555555580952381587301601410935026455031585698337876116969450321577305954872095570508305771300267271499578847512370499623533827733553612983384410604230310443624550120630972400618605844172547533274118825780193176817",
        "1.000000300000045000004500000337500020250001012500043392858770089339955358770089330093345265320642486420378812047150951932585414871265710565736755891829214719352313336596892188244686930029886632072476330684236070498981285061952559758496574715013905892895701089",
        "1.000000400000080000010666667733333418666672355555880634936888889611287506850089234183135875154730635650316057486370988380148651512646061821375107132862137685917854711244758264394403486935467487834601381881074388794755133200215304180036071713259670219661843655",
        "1.00000050000012500002083333593750026041668836805710565485878596768387648163650363459170938183586448223517322491984417230264503853560225899248618260891812286125687715790717851056332021067227280094027013605976616483231712313908590884158078628449553297320265405",
        "1.000000600000180000036000005400000648000064800005554286130857170628573094857233745459089870339612396601341875185399525960230416993842863520266038257286707886476669929341390017488971653286696873950479551896971679958715383478746119711068288028062391371149489013",
        "1.000000700000245000057166676670834733916830068071895695874206708425953000310487646018304089060036787599147676275105859400474689895123100075425333066539374860872723840060463730171521439940751466901429495510481112965046593615553202195597459116945123426063272682",
        "1.000000800000320000085333350400002730667030755597165718446730528598265921018024975740706254352576521064770040651166185959246668919556974378390605929012147885350292967351465271446885744407117136286055594702758682175847035062242848897900206718995002247133857028",
        "1.000000900000405000121500027337504920750738112594900189247699728341390729295808046226796645426268557424285412997921532857831252559494834249449859109227293811330322601387155767798258269722975398926936389317746988260923777387227501391642065587929462420948649232"
    ],
    [
        "1",
        "1.000000010000000050000000166666667083333334166666668055555557539682542162698415454144623567019402857944526698866978250658807361436330455014317926127615562200160084332078829335070241590368747866364909946478207830319530929114193223423472427136476351070384633625",
        "1.000000020000000200000001333333340000000026666666755555555809523810158730160141093477248677253807920483138260929194262546389530541572869646520440208084154592575244829846475616092104703889032125897195071483101405504938379453255735383526992590359391748128287405",
        "1.000000030000000450000004500000033750000202500001012500004339285730558035768526785877008929015219156953632307755135494996911581545128998738775212024344872737597647678017165824376945452724547758781666745678104162427281549813045542731484072320901013699751540848",
        "1.000000040000000800000010666666773333334186666672355555588063492226031746754144623700881844722783424475442360990450187254251567422193813585987728199005661346037368045665532810641944716974411635496550894053342760394407334227944985761375822664063299977760202737",
        "1.000000050000001250000020833333593750002604166688368055710565477159288199826733382290633389520515681243290082960907019379206809977191789257370469042321233232800461660402341054369158081918084989239338793682313776586227863512850221202421400273283373014626367211",
        "1.000000060000001800000036000000540000006480000064800000555428575594285742057143023771429480311692856103917078121968011417513832454609367779840918760983285672034325842279012880873143319189323358452529556891585903632812397146307138829975274828994563695371179662",
        "1.000000070000002450000057166667667083347339166830068057189569458742066083425945994475448626459922975804831403503407994163590626814758811340046507352358986760731455499065728116768159458733073621810040408316793287135185674491416007904172650363644834002683382753",
        "1.00000008000000320000008533333504000002730666703075555971657147018158767145538214765716437674024287074857138074282562507322952457285899884827258634480202409132370650245847484059340021912733791131203856792980510306420862566617226572338856338435031664716693301",
        "1.000000090000004050000121500002733750049207500738112509490017963905559103341304251500301830456961374530766246749440063115416691606198573254987480954117363856553419891520480849271064924566428807047867009390728824337185742582403824875085506729653219774600501303"
    ],
    [
        "1",
        "1.000000001000000000500000000166666666708333333341666666668055555555753968253993055555558311287478229717813076198492867247207525145893201460227749911054309202505145378825438957130678837687266560105088389907332936208344126353435648007509079302366904838332737965",
        "1.000000002000000002000000001333333334000000000266666666755555555580952380958730158731569664903280423280474587141262359040138133471466992736834031733502636105810709353815485197855429903174537090912633982404546033943476658527442915537642542256751648098540938329",
        "1.000000003000000004500000004500000003375000002025000001012500000433928571591294642911383928587700892861580762988122463474282007055499419665167245143251664943594715148543087862808485217520052561838182926761331655514641487182847805900109952106216843867588068853",
        "1.000000004000000008000000010666666677333333341866666672355555558806349207974603175325573192528818342256751643453335471124025932917900958536700278753394083087253080794330245466119358391768262310261548181640401381566398544617645066573738726605241457683162358406",
        "1.000000005000000012500000020833333359375000026041666688368055571056547628735739092683876215213190312069808326828429435504808836584577556241828530001848857197197448211202934610464624745817298908884851334334032243517528230506352913584728945540127503247334304454",
        "1.000000006000000018000000036000000054000000064800000064800000055542857184514285742057142873805714294803116887661298703396123877022771514559643784921476238095255198598792535200905864592462478874938320339031361777709608682003676296114904000848969978666037676208",
        "1.000000007000000024500000057166666766708333473391666830068055718956944587420659833425945293891988861264598969692976408540181920613546886836709421546188906759485969317880330268377230197365586777939297035267858198945289644124491347823705980150597478089811238908",
        "1.000000008000000032000000085333333504000000273066667030755555971657143273244444814312522341749841485037242407372912278975495665944488178378343886315424095469213776993555687392616104926576737106225715914016443147964116812712649070583759250245851205008677469484",
        "1.00000000900000004050000012150000027337500049207500073811250094900178678191272428191272417515002310759027859286803358595908816669708328358557549585827919550781509555184392013474906695251704896486905504823982001490494955628430631018008515640009464192836762086"
    ],
    [
        "1",
        "1.000000000100000000005000000000166666666670833333333416666666668055555555575396825397073412698415454144620838844797178381032547701302041579835416640972311235208061369602374898159661717890890636377876292167626807167118097418250089799613232822429561584839732436",
        "1.00000000020000000002000000000133333333340000000000266666666675555555555809523809530158730158871252204588359788359839666506334028111805902739236072757342598614945704892826162667432877205675217861820898140236791877216104086843490250510449150481689310382491997",
        "1.000000000300000000045000000004500000000337500000020250000001012500000043392857144484375000054241071430198660714330093344156953632305220408497752796394453771498033216988957610473517976082538957931840649372284007980778387079364588612237999322952503353246629272",
        "1.000000000400000000080000000010666666667733333333418666666672355555555880634920651174603175325573192268754850089234183100884792902571758052646972327378677406133744778611081257066906765018961252872327129135458024179406515595154985765757709114409879325763582657",
        "1.000000000500000000125000000020833333335937500000260416666688368055557105654762001643105164112447641362588872366729829295443148050046993630164903199619632307099045282865341315842970320393225917211453732599727661119186787432356941799959234635398296083997006139",
        "1.000000000600000000180000000036000000005400000000648000000064800000005554285714702285714313485714287380571428662316883121427532467742209790218779163693808965891265088968175158346191639365407702043087739343368804570472330777845741875602316524836720744596838442",
        "1.000000000700000000245000000057166666676670833334733916666830068055571895694445874206597333425945223833643326112645989436864693566253849841192829330529553945887353131797463326009328289333089933370063364144225191646223300847249495173234424373673541944624979205",
        "1.00000000080000000032000000008533333335040000000273066666703075555559716571428987530158767145537921830196825612021369262382312864973497139947588769798444529279829947588643443285558056813237014675084862707667638417307510222862170506049780991734222020598622395",
        "1.000000000900000000405000000121500000027337500004920750000738112500094900178582104841518924769866167515002240004474209193517383867930324377468044757492746949756095835764624498574071199440142689339384466863378791519731786238325701991449155383573875144382022735"
    ],
    [
        "1",
        "1.000000000010000000000050000000000166666666667083333333334166666666668055555555557539682539685019841269844025573192242614638447974286515953184707524985304368984924541627170595425328394905114959781791792654948681248246092509415204617290487417116640524671775301",
        "1.000000000020000000000200000000001333333333340000000000026666666666755555555555809523809524444444444445855379188715343915343920474587141262359040136831070164403516530500657509842695027911535848043821402053583856122155392523906401192251402380938316915480143814",
        "1.000000000030000000000450000000004500000000033750000000202500000001012500000004339285714301986607142911383928571591294642857586647727273836749188314248641983022469439043110730229591857308776602897731494805150380123093913492034937508031925936525164255550480239",
        "1.00000000004000000000080000000001066666666677333333333418666666667235555555558806349206365460317460389700176367131992945327329421196091365293143081697890586810267216616505076424653349506852152837802535905072055073786420151577785100640838396137277112251514735",
        "1.00000000005000000000125000000002083333333359375000000260416666668836805555571056547619144500248016411244764112038587136255618718183873319134007264068095774525059241470925396170577487944738923374878447003205386484881914018245946707333822256547575648332174683",
        "1.000000000060000000001800000000036000000000540000000006480000000064800000000555428571432737142857170628571428738057142858051740259744804155844176818381618471507920651137351791067425123447985349695682484654572318487957897918242801974673257648070007868679130426",
        "1.000000000070000000002450000000057166666667667083333347339166666830068055557189569444458742065972333425945216827808777011126459894108581865282025216633943931012807982367336200600492753258650819501465012407695965228823807927322155096641118825460150386445518263",
        "1.000000000080000000003200000000085333333335040000000027306666667030755555559716571428613038730159100026807763100038095259614835337645468150286810918977324022206242931561668484892962175461856164162854060279811767399853148829723227492951123779037914467762124188",
        "1.000000000090000000004050000000121500000002733750000049207500000738112500009490017857249619843751067627008938180071651864330456372342868033181841733736211930697323760184868971758523921789168189768615744476250539036111741578555829725167955219694647353096622696"
    ],
    [
        "1",
        "1.000000000001000000000000500000000000166666666666708333333333341666666666668055555555555753968253968278769841269844025573192240134479717813076198492865161619501897279835647891203458229747912288359543650548989349005883400229246206526163527289595008850667173127",
        "1.000000000002000000000002000000000001333333333334000000000000266666666666755555555555580952380952387301587301588712522045855661375661375712682379349054566832344611437944771278292548133818000146042474087934405394723223543640599392717523920626753962817433470826",
        "1.000000000003000000000004500000000004500000000003375000000002025000000001012500000000433928571428734151785714339955357142873415178571433009334415585525060876623632656406093960958126694744810435100615729450516002218359617667057380685556574837983621173494200824",
        "1.000000000004000000000008000000000010666666666677333333333341866666666672355555555558806349206350831746031746754144620811576437389770828180214846916538934316722871531760423728464363385819413586609559082109346707911677721834735995817714714655658155017123966004",
        "1.00000000000500000000001250000000002083333333335937500000002604166666668836805555557105654761905730716765873554101906966759414269180016504642155734790995478949110032280612198459362555198266157726625772874678331610798998177006297680609976524115439541173420259",
        "1.000000000006000000000018000000000036000000000054000000000064800000000064800000000055542857142898800000000027771428571445234285714294803116883121427532467534564955044955943850435279366265734265869100042814376117193730654971650198545964167632457503232017871985",
        "1.000000000007000000000024500000000057166666666766708333333473391666666830068055555718956944444587420659722333425945216127225322145111264598940825753582453602353313225972915411685074603803437053433977043894247041815994636316149529701778786472611784462703889138",
        "1.000000000008000000000032000000000085333333333504000000000273066666667030755555555971657142857558958730159100026807760436987936508151703908930719061223879089942306582357031179238190271212908602022996939574698978718233321541425959528060975659005527346418528599",
        "1.000000000009000000000040500000000121500000000273375000000492075000000738112500000949001785715353341294643924769866072389435736607929018849432407803098113232874672320130046233975445553072196307524291707537220510858488196407197643148826305620029216908081970869"
    ],
    [
        "1",
        "1.000000000000100000000000005000000000000166666666666670833333333333416666666666668055555555555575396825396825644841269841272597001763668457892416225749809603976270645024985302763096599902155457825720722546120136232570095008736915152259095717555490353654637693",
        "1.000000000000200000000000020000000000001333333333333400000000000002666666666666755555555555558095238095238158730158730160141093474426835978835978836491903158569833787611565389474722808056143268841681540119296733053347123188393029666555965964618355391948779923",
        "1.000000000000300000000000045000000000004500000000000337500000000020250000000001012500000000043392857142858770089285714339955357142858770089285714330093344155845265320616883142486419830170378812036178118579523155416218299696954834514122792910931153971094557661",
        "1.00000000000040000000000008000000000001066666666666773333333333341866666666667235555555555588063492063493688888888888961128747795417351675485008923418310084980254182031959917508006396898364938999859716891065039215240131218967246103644485220410726154752182813",
        "1.000000000000500000000000125000000000020833333333335937500000000260416666666688368055555557105654761904858785962301592683876212522314969824735461967924533029209381816261176142259312832929617646027019562700585870131297332583548849712255111360166306405086567142",
        "1.000000000000600000000000180000000000036000000000005400000000000648000000000064800000000005554285714286130857142857170628571428573094857142857233745454545459089870129870339612387612396601341515627589471100328256668816897388801845549408590481518481518982450895",
        "1.000000000000700000000000245000000000057166666666676670833333334733916666666830068055555571895694444445874206597222333425945216057166976658951112645989407997470754170760066981154246423015810712407224886058134625535319860314645696585222499332309114404479010322",
        "1.000000000000800000000000320000000000085333333333350400000000002730666666667030755555555597165714285718446730158730528598236331599254349206351358308930575740706245524032130353794354298842520912389088268868503018037747790192050898910086286503634618149465704747",
        "1.000000000000900000000000405000000000121500000000027337500000004920750000000738112500000094900178571439247698660715353341294642953229287946436433045637175914296604606371988765933288088674127964826707631922216113496674674148986363044496860143671243577643241797"
    ],
    [
        "1",
        "1.00000000000001000000000000005000000000000016666666666666708333333333333416666666666666805555555555555753968253968254216269841269841545414462081129023368606701940285794452461119336553364331142269510325065880736143632969029870898257141643432824401739745683204",
        "1.000000000000020000000000000200000000000001333333333333340000000000000026666666666666755555555555555809523809523810158730158730160141093474426810582010582010587141253807920483138260916038706972040305373657500641627625779668107710435784086577737371425015371482",
        "1.000000000000030000000000000450000000000004500000000000033750000000000202500000000001012500000000004339285714285730558035714285768526785714285877008928571429015219155844156953632305194807755135489510494996911570572295830843263878998738775175717176310059097941",
        "1.000000000000040000000000000800000000000010666666666666773333333333334186666666666672355555555555588063492063492226031746031746754144620811290367548500881844722783389450091142108919886805434894323783520587584079648392819017157643549035718347892490103756832682",
        "1.000000000000050000000000001250000000000020833333333333593750000000002604166666666688368055555555710565476190477159288194444449826733355379215623966600529222853848504890681243288122630360738677795976463823627917153238548547431722212537579252513491528497895141",
        "1.000000000000060000000000001800000000000036000000000000540000000000006480000000000064800000000000555428571428575594285714285742057142857143023771428571429480311688311692856103896103917078121878121968011417154274656689596118168895082060796351269490173691870225",
        "1.000000000000070000000000002450000000000057166666666667667083333333347339166666666830068055555557189569444444458742065972222333425945216050161142110339511126459894079714642471342475838347947074466949660826626759076737909986334434737200569423813868209125061118",
        "1.000000000000080000000000003200000000000085333333333335040000000000027306666666667030755555555559716571428571470181587301587671455379188715480990476190497710073432740242870747688526349158515558520603402824101263705714914519281853707209898319172054430569538082",
        "1.000000000000090000000000004050000000000121500000000002733750000000049207500000000738112500000009490017857142963905558035715353341294642866751500223214364330456371753836374526684257328746723198702565062957968528363119291981226734282851988084786564653406103472"
    ],
    [
        "1",
        "1.000000000000001000000000000000500000000000000166666666666666708333333333333341666666666666668055555555555555753968253968253993055555555555558311287477954144896384479717813076198492865159533913874191651969590337645893201460227749910289593593991742139890335833",
        "1.000000000000002000000000000002000000000000001333333333333334000000000000000266666666666666755555555555555580952380952380958730158730158731569664902998236613756613756613807920474587141262359040136817915911249244582578103847945117786412685883585354487957662562",
        "1.000000000000003000000000000004500000000000004500000000000003375000000000002025000000000001012500000000000433928571428571591294642857142911383928571428587700892857142861580762987012988122463474025974282007055444555499419665156272310102286106750394522086451494",
        "1.000000000000004000000000000008000000000000010666666666666677333333333333341866666666666672355555555555558806349206349207974603174603175325573192239859195485008818342256751643418310120002137779915568470377359266251234291869212504954247007157060272389965511657",
        "1.000000000000005000000000000012500000000000020833333333333359375000000000026041666666666688368055555555571056547619047628735739087301592683876212522048546523644179895403141659652076828429435308775782586614292343529022000662935706114244280270246557851904047187",
        "1.00000000000000600000000000001800000000000003600000000000005400000000000006480000000000006480000000000005554285714285718451428571428574205714285714287380571428571429480311688311688766129870129870339612387612387702277151420008598821521335807063576195233338095",
        "1.000000000000007000000000000024500000000000057166666666666766708333333333473391666666666830068055555555718956944444444587420659722222333425945216049460558655478395111264598940796886359643059647415484626357278274780213549872841697820531068941222114832031381804",
        "1.000000000000008000000000000032000000000000085333333333333504000000000000273066666666667030755555555555971657142857143273244444444444814312522045855675083174603174818370575597242407372912190690056753273393273443722265929250083140248634767166738704512418804466",
        "1.000000000000009000000000000040500000000000121500000000000273375000000000492075000000000738112500000000949001785714286781912723214286781912723214286675150022321429357590278003247342868033177760148459087904283479197083126137413049861121579402108279148620678486"
    ],
    [
        "1",
        "1.000000000000000100000000000000005000000000000000166666666666666670833333333333333416666666666666668055555555555555575396825396825397073412698412698415454144620811287505511463844797178381032547699214367968708246486024279861085416640972311235208060604886766427",
        "1.00000000000000020000000000000002000000000000000133333333333333340000000000000000266666666666666675555555555555555809523809523809530158730158730158871252204585537921693121693121693172999839666506334028111805889583680517013850347183868453709723550995898085845",
        "1.000000000000000300000000000000045000000000000004500000000000000337500000000000020250000000000001012500000000000043392857142857144484375000000000054241071428571430198660714285714330093344155844156953632305194805220408497752247752796394453760525200069461788209",
        "1.000000000000000400000000000000080000000000000010666666666666667733333333333333418666666666666672355555555555555880634920634920651174603174603175325573192239858935421516754850089234183100849767551459569237347016202497091385980305660712009918359945816284440624",
        "1.000000000000000500000000000000125000000000000020833333333333335937500000000000260416666666666688368055555555557105654761904762001643105158730164112447641093474695922205687830700063162628266795443148050027390324771407941980859347644064053414275164241901696431",
        "1.000000000000000600000000000000180000000000000036000000000000005400000000000000648000000000000064800000000000005554285714285714702285714285714313485714285714287380571428571428662316883116883121427532467532467742209790209790218779163693449408094680176965891264",
        "1.000000000000000700000000000000245000000000000057166666666666676670833333333334733916666666666830068055555555571895694444444445874206597222222333425945216049390500309992283951112645989407968603531360231364573198294285559476609495997192590078165056998305407027",
        "1.000000000000000800000000000000320000000000000085333333333333350400000000000002730666666666667030755555555555597165714285714289875301587301587671455379188712551635301587301589453547025813692623823128640906427512749176749177253665475735317032064340416001793007",
        "1.000000000000000900000000000000405000000000000121500000000000027337500000000004920750000000000738112500000000094900178571428582104841517857143924769866071428667515002232142865004474208603896693517383827110430430324374843908718044757335298787389806890096519491"
    ],
    [
        "1",
        "1.000000000000000010000000000000000050000000000000000166666666666666667083333333333333334166666666666666668055555555555555557539682539682539685019841269841269844025573192239858909281305114638447974286515953182619851374191651969429748813429368984924541627170598",
        "1.000000000000000020000000000000000200000000000000001333333333333333340000000000000000026666666666666666755555555555555555809523809523809524444444444444444445855379188712522048677248677248677253807920474587141262359040136817914608847942181275514627641611768596",
        "1.000000000000000030000000000000000450000000000000004500000000000000033750000000000000202500000000000001012500000000000004339285714285714301986607142857142911383928571428571591294642857142857586647727272727273836749188311688314248641983016983022469439043099755",
        "1.000000000000000040000000000000000800000000000000010666666666666666773333333333333334186666666666666672355555555555555588063492063492063654603174603174603897001763668430337986596119929453273294211960878627580319598097375875261423350312239201436005499497562994",
        "1.000000000000000050000000000000001250000000000000020833333333333333593750000000000002604166666666666688368055555555555710565476190476191445002480158730164112447641093474453719204695767195889520515171556838733191340070680350418458735516027189695036859130361164",
        "1.000000000000000060000000000000001800000000000000036000000000000000540000000000000006480000000000000064800000000000000555428571428571432737142857142857170628571428571428738057142857142858051740259740259744804155844155844176818381618381618471507920650777793995",
        "1.000000000000000070000000000000002450000000000000057166666666666667667083333333333347339166666666666830068055555555557189569444444444458742065972222222333425945216049383494475443672839511126459894079685775248531948536288969661078387597485597679474645403468476",
        "1.00000000000000008000000000000000320000000000000008533333333333333504000000000000002730666666666666703075555555555555971657142857142861303873015873015910002680776014109643337142857142859294816867083533764546815028592806458869675509675510179998402068243340775",
        "1.000000000000000090000000000000004050000000000000121500000000000002733750000000000049207500000000000738112500000000009490017857142857249619843750000001067627008928571438180071651785714364330456371753247342868033177759744341733736185689336930697323602736706615"
    ],
    [
        "1",
        "1.000000000000000001000000000000000000500000000000000000166666666666666666708333333333333333341666666666666666668055555555555555555753968253968253968278769841269841269844025573192239858906801146384479717813076198492865159531828286168563946341724280092335647892",
        "1.000000000000000002000000000000000002000000000000000001333333333333333334000000000000000000266666666666666666755555555555555555580952380952380952387301587301587301588712522045855379188994708994708994709046015712682379349054566832344610122389215722549055882388",
        "1.000000000000000003000000000000000004500000000000000004500000000000000003375000000000000002025000000000000001012500000000000000433928571428571428734151785714285714339955357142857142873415178571428571433009334415584415585525060876623376623632656406093906093961",
        "1.000000000000000004000000000000000008000000000000000010666666666666666677333333333333333341866666666666666672355555555555555558806349206349206350831746031746031746754144620811287478243104056437389770828180214846881513583205600983378761167315976204865093757063",
        "1.000000000000000005000000000000000012500000000000000020833333333333333359375000000000000026041666666666666688368055555555555571056547619047619057307167658730158735541019069664903000927476025132275133498379754890171557347909954789295067268878100583829750566431",
        "1.000000000000000006000000000000000018000000000000000036000000000000000054000000000000000064800000000000000064800000000000000055542857142857142898800000000000000027771428571428571445234285714285714294803116883116883121427532467532467534564955044955044955943848",
        "1.000000000000000007000000000000000024500000000000000057166666666666666766708333333333333473391666666666666830068055555555555718956944444444444587420659722222222333425945216049382793891988811728395111264598940796857492420249120253460546797757670409580139582076",
        "1.000000000000000008000000000000000032000000000000000085333333333333333504000000000000000273066666666666667030755555555555555971657142857142857558958730158730159100026807760141093770321269841269841485037242263908930719061223879001656867720084360084360134808958",
        "1.000000000000000009000000000000000040500000000000000121500000000000000273375000000000000492075000000000000738112500000000000949001785714285715353341294642857143924769866071428572389435736607142857929018849431818182407803098112824675732874672319867632630046236"
    ],
    [
        "1",
        "1.000000000000000000100000000000000000005000000000000000000166666666666666666670833333333333333333416666666666666666668055555555555555555575396825396825396825644841269841269841272597001763668430335124559082892416225749809603976270642937311691651969429747207541",
        "1.000000000000000000200000000000000000020000000000000000001333333333333333333400000000000000000002666666666666666666755555555555555555558095238095238095238158730158730158730160141093474426807760169312169312169312169825236491903158569833787611565389343167252501",
        "1.000000000000000000300000000000000000045000000000000000004500000000000000000337500000000000000020250000000000000001012500000000000000043392857142857142858770089285714285714339955357142857142858770089285714285714330093344155844155845265320616883116883142486419",
        "1.000000000000000000400000000000000000080000000000000000010666666666666666667733333333333333333418666666666666666672355555555555555555880634920634920634936888888888888888889611287477954144620840183421516754850089234183100849767516469208486986264764043619524508",
        "1.00000000000000000050000000000000000012500000000000000002083333333333333333593750000000000000026041666666666666668836805555555555555710565476190476190485878596230158730159268387621252204585564830315806878306879530125786636203302920938181626115653895392003709",
        "1.00000000000000000060000000000000000018000000000000000003600000000000000000540000000000000000064800000000000000006480000000000000000555428571428571428613085714285714285717062857142857142857309485714285714285723374545454545454545908987012987012987033961238761",
        "1.000000000000000000700000000000000000245000000000000000057166666666666666676670833333333333334733916666666666666830068055555555555571895694444444444445874206597222222222333425945216049382723833643325617283951112645989407968574664137420837425177704511425598692",
        "1.000000000000000000800000000000000000320000000000000000085333333333333333350400000000000000002730666666666666667030755555555555555597165714285714285718446730158730158730528598236331569664932587682539682539684691642263908930575740706245524023301809908131572135",
        "1.000000000000000000900000000000000000405000000000000000121500000000000000027337500000000000004920750000000000000738112500000000000094900178571428571439247698660714285715353341294642857142953229287946428571436433045637175324675914296604606331168871988765933284"
    ],
    [
        "1",
        "1.000000000000000000010000000000000000000050000000000000000000166666666666666666667083333333333333333334166666666666666666668055555555555555555557539682539682539682542162698412698412698415454144620811287477956900352733686067019402857944524611191277860032200311",
        "1.000000000000000000020000000000000000000200000000000000000001333333333333333333340000000000000000000026666666666666666666755555555555555555555809523809523809523810158730158730158730160141093474426807760143915343915343915343920474587141253807920483138260916037",
        "1.000000000000000000030000000000000000000450000000000000000004500000000000000000033750000000000000000202500000000000000001012500000000000000004339285714285714285730558035714285714285768526785714285714285877008928571428571429015219155844155844156953632305194803",
        "1.000000000000000000040000000000000000000800000000000000000010666666666666666666773333333333333333334186666666666666666672355555555555555555588063492063492063492226031746031746031746754144620811287477957034215167548500881844722783389450056116757808775586553367",
        "1.0000000000000000000500000000000000000012500000000000000000208333333333333333335937500000000000000026041666666666666666883680555555555555557105654761904761904771592881944444444444498267333553791887125489572999338624338625561871818382235048906812432881226284",
        "1.000000000000000000060000000000000000001800000000000000000036000000000000000000540000000000000000006480000000000000000064800000000000000000555428571428571428575594285714285714285742057142857142857143023771428571428571429480311688311688311692856103896103896105",
        "1.000000000000000000070000000000000000002450000000000000000057166666666666666667667083333333333333347339166666666666666830068055555555555557189569444444444444458742065972222222222333425945216049382716827808777006172839511126459894079685746381309138009142349419",
        "1.000000000000000000080000000000000000003200000000000000000085333333333333333335040000000000000000027306666666666666667030755555555555555559716571428571428571470181587301587301587671455379188712522048814323809523809523831043406766073432740242870747688525466307",
        "1.000000000000000000090000000000000000004050000000000000000121500000000000000002733750000000000000049207500000000000000738112500000000000009490017857142857142963905558035714285715353341294642857142866751500223214285714364330456371753246753836374526684253246756"
    ],
    [
        "1",
        "1.000000000000000000001000000000000000000000500000000000000000000166666666666666666666708333333333333333333341666666666666666666668055555555555555555555753968253968253968253993055555555555555555558311287477954144620811563051146384479717813076198492865159531825",
        "1.000000000000000000002000000000000000000002000000000000000000001333333333333333333334000000000000000000000266666666666666666666755555555555555555555580952380952380952380958730158730158730158731569664902998236331569947089947089947089947141253807920474587141263",
        "1.000000000000000000003000000000000000000004500000000000000000004500000000000000000003375000000000000000002025000000000000000001012500000000000000000433928571428571428571591294642857142857142911383928571428571428587700892857142857142861580762987012987012988123",
        "1.000000000000000000004000000000000000000008000000000000000000010666666666666666666677333333333333333333341866666666666666666672355555555555555555558806349206349206349207974603174603174603175325573192239858906525862151675485008818342256751643418310084976786668",
        "1.000000000000000000005000000000000000000012500000000000000000020833333333333333333359375000000000000000026041666666666666666688368055555555555555571056547619047619047628735739087301587301592683876212522045855381879856977513227513228736474992985409652076828429",
        "1.000000000000000000006000000000000000000018000000000000000000036000000000000000000054000000000000000000064800000000000000000064800000000000000000055542857142857142857184514285714285714285742057142857142857142873805714285714285714294803116883116883116887661297",
        "1.000000000000000000007000000000000000000024500000000000000000057166666666666666666766708333333333333333473391666666666666666830068055555555555555718956944444444444444587420659722222222222333425945216049382716127225322145061728395111264598940796857463553026308",
        "1.000000000000000000008000000000000000000032000000000000000000085333333333333333333504000000000000000000273066666666666666667030755555555555555555971657142857142857143273244444444444444444814312522045855379189008416507936507936508151703908930575597242407372915",
        "1.000000000000000000009000000000000000000040500000000000000000121500000000000000000273375000000000000000492075000000000000000738112500000000000000949001785714285714286781912723214285714286781912723214285714286675150022321428571429357590278003246753247342868031"
    ],
    [
        "1",
        "1.000000000000000000000100000000000000000000005000000000000000000000166666666666666666666670833333333333333333333416666666666666666666668055555555555555555555575396825396825396825397073412698412698412698415454144620811287477954172178130511463844797178381032548",
        "1.00000000000000000000020000000000000000000002000000000000000000000133333333333333333333340000000000000000000000266666666666666666666675555555555555555555555809523809523809523809530158730158730158730158871252204585537918871255026455026455026455026506333173",
        "1.000000000000000000000300000000000000000000045000000000000000000004500000000000000000000337500000000000000000020250000000000000000001012500000000000000000043392857142857142857144484375000000000000000054241071428571428571430198660714285714285714330093344155846",
        "1.000000000000000000000400000000000000000000080000000000000000000010666666666666666666667733333333333333333333418666666666666666666672355555555555555555555880634920634920634920651174603174603174603175325573192239858906525602088183421516754850089234183100849766",
        "1.00000000000000000000050000000000000000000012500000000000000000002083333333333333333333593750000000000000000026041666666666666666668836805555555555555555710565476190476190476200164310515873015873016411244764109347442680802925553902116402116403339649596160013",
        "1.000000000000000000000600000000000000000000180000000000000000000036000000000000000000005400000000000000000000648000000000000000000064800000000000000000005554285714285714285714702285714285714285714313485714285714285714287380571428571428571428662316883116883115",
        "1.000000000000000000000700000000000000000000245000000000000000000057166666666666666666676670833333333333333334733916666666666666666830068055555555555555571895694444444444444445874206597222222222222333425945216049382716057166976658950617283951112645989407968576",
        "1.000000000000000000000800000000000000000000320000000000000000000085333333333333333333350400000000000000000002730666666666666666667030755555555555555555597165714285714285714289875301587301587301587671455379188712522045884968634920634920634922786880359147025816",
        "1.000000000000000000000900000000000000000000405000000000000000000121500000000000000000027337500000000000000004920750000000000000000738112500000000000000094900178571428571428582104841517857142857143924769866071428571428667515002232142857142865004474208603896105"
    ],
    [
        "1",
        "1.000000000000000000000010000000000000000000000050000000000000000000000166666666666666666666667083333333333333333333334166666666666666666666668055555555555555555555557539682539682539682539685019841269841269841269844025573192239858906525575947971781305114638449",
        "1.000000000000000000000020000000000000000000000200000000000000000000001333333333333333333333340000000000000000000000026666666666666666666666755555555555555555555555809523809523809523809524444444444444444444444445855379188712522045855382010582010582010582010585",
        "1.000000000000000000000030000000000000000000000450000000000000000000004500000000000000000000033750000000000000000000202500000000000000000001012500000000000000000004339285714285714285714301986607142857142857142911383928571428571428571591294642857142857142857586",
        "1.000000000000000000000040000000000000000000000800000000000000000000010666666666666666666666773333333333333333333334186666666666666666666672355555555555555555555588063492063492063492063654603174603174603174603897001763668430335097004653262786596119929453273303",
        "1.000000000000000000000050000000000000000000001250000000000000000000020833333333333333333333593750000000000000000002604166666666666666666688368055555555555555555710565476190476190476191445002480158730158730164112447641093474426807787052538029100529100529222855",
        "1.000000000000000000000060000000000000000000001800000000000000000000036000000000000000000000540000000000000000000006480000000000000000000064800000000000000000000555428571428571428571432737142857142857142857170628571428571428571428738057142857142857142858051741",
        "1.000000000000000000000070000000000000000000002450000000000000000000057166666666666666666667667083333333333333333347339166666666666666666830068055555555555555557189569444444444444444458742065972222222222222333425945216049382716050161142110339506172839511126458",
        "1.000000000000000000000080000000000000000000003200000000000000000000085333333333333333333335040000000000000000000027306666666666666666667030755555555555555555559716571428571428571428613038730158730158730159100026807760141093474429766704761904761904761926281501",
        "1.000000000000000000000090000000000000000000004050000000000000000000121500000000000000000002733750000000000000000049207500000000000000000738112500000000000000009490017857142857142857249619843750000000000001067627008928571428571438180071651785714285714364330459"
    ],
    [
        "1",
        "1.000000000000000000000001000000000000000000000000500000000000000000000000166666666666666666666666708333333333333333333333341666666666666666666666668055555555555555555555555753968253968253968253968278769841269841269841269844025573192239858906525573467813051147",
        "1.000000000000000000000002000000000000000000000002000000000000000000000001333333333333333333333334000000000000000000000000266666666666666666666666755555555555555555555555580952380952380952380952387301587301587301587301588712522045855379188712522328042328042329",
        "1.000000000000000000000003000000000000000000000004500000000000000000000004500000000000000000000003375000000000000000000002025000000000000000000001012500000000000000000000433928571428571428571428734151785714285714285714339955357142857142857142873415178571428569",
        "1.000000000000000000000004000000000000000000000008000000000000000000000010666666666666666666666677333333333333333333333341866666666666666666666672355555555555555555555558806349206349206349206350831746031746031746031746754144620811287477954144909770723104056436",
        "1.000000000000000000000005000000000000000000000012500000000000000000000020833333333333333333333359375000000000000000000026041666666666666666666688368055555555555555555571056547619047619047619057307167658730158730158735541019069664902998236334260809358465608467",
        "1.000000000000000000000006000000000000000000000018000000000000000000000036000000000000000000000054000000000000000000000064800000000000000000000064800000000000000000000055542857142857142857142898800000000000000000000027771428571428571428571445234285714285714286",
        "1.000000000000000000000007000000000000000000000024500000000000000000000057166666666666666666666766708333333333333333333473391666666666666666666830068055555555555555555718956944444444444444444587420659722222222222222333425945216049382716049460558655478395061727",
        "1.000000000000000000000008000000000000000000000032000000000000000000000085333333333333333333333504000000000000000000000273066666666666666666667030755555555555555555555971657142857142857142857558958730158730158730159100026807760141093474427103654603174603174605",
        "1.000000000000000000000009000000000000000000000040500000000000000000000121500000000000000000000273375000000000000000000492075000000000000000000738112500000000000000000949001785714285714285715353341294642857142857143924769866071428571428572389435736607142857144"
    ],
    [
        "1",
        "1.000000000000000000000000100000000000000000000000005000000000000000000000000166666666666666666666666670833333333333333333333333416666666666666666666666668055555555555555555555555575396825396825396825396825644841269841269841269841272597001763668430335097001788",
        "1.000000000000000000000000200000000000000000000000020000000000000000000000001333333333333333333333333400000000000000000000000002666666666666666666666666755555555555555555555555558095238095238095238095238158730158730158730158730160141093474426807760141093502646",
        "1.000000000000000000000000300000000000000000000000045000000000000000000000004500000000000000000000000337500000000000000000000020250000000000000000000001012500000000000000000000043392857142857142857142858770089285714285714285714339955357142857142857142858770088",
        "1.000000000000000000000000400000000000000000000000080000000000000000000000010666666666666666666666667733333333333333333333333418666666666666666666666672355555555555555555555555880634920634920634920634936888888888888888888888889611287477954144620811287506850092",
        "1.000000000000000000000000500000000000000000000000125000000000000000000000020833333333333333333333335937500000000000000000000260416666666666666666666688368055555555555555555557105654761904761904761904858785962301587301587301592683876212522045855379188981636508",
        "1.000000000000000000000000600000000000000000000000180000000000000000000000036000000000000000000000005400000000000000000000000648000000000000000000000064800000000000000000000005554285714285714285714286130857142857142857142857170628571428571428571428573094857144",
        "1.00000000000000000000000070000000000000000000000024500000000000000000000005716666666666666666666667667083333333333333333333473391666666666666666666683006805555555555555555557189569444444444444444444587420659722222222222222233342594521604938271604939050030999",
        "1.000000000000000000000000800000000000000000000000320000000000000000000000085333333333333333333333350400000000000000000000002730666666666666666666667030755555555555555555555597165714285714285714285718446730158730158730158730528598236331569664902998265921015871",
        "1.000000000000000000000000900000000000000000000000405000000000000000000000121500000000000000000000027337500000000000000000004920750000000000000000000738112500000000000000000094900178571428571428571439247698660714285714285715353341294642857142857142953229287949"
    ],
    [
        "1",
        "1.000000000000000000000000010000000000000000000000000050000000000000000000000000166666666666666666666666667083333333333333333333333334166666666666666666666666668055555555555555555555555557539682539682539682539682542162698412698412698412698415454144620811287477",
        "1.000000000000000000000000020000000000000000000000000200000000000000000000000001333333333333333333333333340000000000000000000000000026666666666666666666666666755555555555555555555555555809523809523809523809523810158730158730158730158730160141093474426807760139",
        "1.000000000000000000000000030000000000000000000000000450000000000000000000000004500000000000000000000000033750000000000000000000000202500000000000000000000001012500000000000000000000004339285714285714285714285730558035714285714285714285768526785714285714285713",
        "1.000000000000000000000000040000000000000000000000000800000000000000000000000010666666666666666666666666773333333333333333333333334186666666666666666666666672355555555555555555555555588063492063492063492063492226031746031746031746031746754144620811287477954144",
        "1.000000000000000000000000050000000000000000000000001250000000000000000000000020833333333333333333333333593750000000000000000000002604166666666666666666666688368055555555555555555555710565476190476190476190477159288194444444444444444449826733355379188712522045",
        "1.000000000000000000000000060000000000000000000000001800000000000000000000000036000000000000000000000000540000000000000000000000006480000000000000000000000064800000000000000000000000555428571428571428571428575594285714285714285714285742057142857142857142857143",
        "1.000000000000000000000000070000000000000000000000002450000000000000000000000057166666666666666666666667667083333333333333333333347339166666666666666666666830068055555555555555555557189569444444444444444444458742065972222222222222222333425945216049382716049381",
        "1.000000000000000000000000080000000000000000000000003200000000000000000000000085333333333333333333333335040000000000000000000000027306666666666666666666667030755555555555555555555559716571428571428571428571470181587301587301587301587671455379188712522045855382",
        "1.000000000000000000000000090000000000000000000000004050000000000000000000000121500000000000000000000002733750000000000000000000049207500000000000000000000738112500000000000000000009490017857142857142857142963905558035714285714285715353341294642857142857142868"
    ],
    [
        "1",
        "1.000000000000000000000000001000000000000000000000000000500000000000000000000000000166666666666666666666666666708333333333333333333333333341666666666666666666666666668055555555555555555555555555753968253968253968253968253993055555555555555555555555558311287479",
        "1.000000000000000000000000002000000000000000000000000002000000000000000000000000001333333333333333333333333334000000000000000000000000000266666666666666666666666666755555555555555555555555555580952380952380952380952380958730158730158730158730158731569664902999",
        "1.00000000000000000000000000300000000000000000000000000450000000000000000000000000450000000000000000000000000337500000000000000000000000202500000000000000000000000101250000000000000000000000043392857142857142857142857159129464285714285714285714291138392857143",
        "1.000000000000000000000000004000000000000000000000000008000000000000000000000000010666666666666666666666666677333333333333333333333333341866666666666666666666666672355555555555555555555555558806349206349206349206349207974603174603174603174603175325573192239859",
        "1.000000000000000000000000005000000000000000000000000012500000000000000000000000020833333333333333333333333359375000000000000000000000026041666666666666666666666688368055555555555555555555571056547619047619047619047628735739087301587301587301592683876212522047",
        "1.000000000000000000000000006000000000000000000000000018000000000000000000000000036000000000000000000000000054000000000000000000000000064800000000000000000000000064800000000000000000000000055542857142857142857142857184514285714285714285714285742057142857142858",
        "1.000000000000000000000000007000000000000000000000000024500000000000000000000000057166666666666666666666666766708333333333333333333333473391666666666666666666666830068055555555555555555555718956944444444444444444444587420659722222222222222222333425945216049384",
        "1.000000000000000000000000008000000000000000000000000032000000000000000000000000085333333333333333333333333504000000000000000000000000273066666666666666666666667030755555555555555555555555971657142857142857142857143273244444444444444444444444814312522045855381",
        "1.000000000000000000000000009000000000000000000000000040500000000000000000000000121500000000000000000000000273375000000000000000000000492075000000000000000000000738112500000000000000000000949001785714285714285714286781912723214285714285714286781912723214285713"
    ],
    [
        "1",
        "1.000000000000000000000000000100000000000000000000000000005000000000000000000000000000166666666666666666666666666670833333333333333333333333333416666666666666666666666666668055555555555555555555555555575396825396825396825396825397073412698412698412698412698414",
        "1.000000000000000000000000000200000000000000000000000000020000000000000000000000000001333333333333333333333333333400000000000000000000000000002666666666666666666666666666755555555555555555555555555558095238095238095238095238095301587301587301587301587301588711",
        "1.000000000000000000000000000300000000000000000000000000045000000000000000000000000004500000000000000000000000000337500000000000000000000000020250000000000000000000000001012500000000000000000000000043392857142857142857142857144484375000000000000000000000054239",
        "1.000000000000000000000000000400000000000000000000000000080000000000000000000000000010666666666666666666666666667733333333333333333333333333418666666666666666666666666672355555555555555555555555555880634920634920634920634920651174603174603174603174603175325574",
        "1.000000000000000000000000000500000000000000000000000000125000000000000000000000000020833333333333333333333333335937500000000000000000000000260416666666666666666666666688368055555555555555555555557105654761904761904761904762001643105158730158730158730164112449",
        "1.000000000000000000000000000600000000000000000000000000180000000000000000000000000036000000000000000000000000005400000000000000000000000000648000000000000000000000000064800000000000000000000000005554285714285714285714285714702285714285714285714285714313485713",
        "1.000000000000000000000000000700000000000000000000000000245000000000000000000000000057166666666666666666666666676670833333333333333333333334733916666666666666666666666830068055555555555555555555571895694444444444444444444445874206597222222222222222222333425947",
        "1.000000000000000000000000000800000000000000000000000000320000000000000000000000000085333333333333333333333333350400000000000000000000000002730666666666666666666666667030755555555555555555555555597165714285714285714285714289875301587301587301587301587671455379",
        "1.000000000000000000000000000900000000000000000000000000405000000000000000000000000121500000000000000000000000027337500000000000000000000004920750000000000000000000000738112500000000000000000000094900178571428571428571428582104841517857142857142857143924769868"
    ],
    [
        "1",
        "1.000000000000000000000000000010000000000000000000000000000050000000000000000000000000000166666666666666666666666666667083333333333333333333333333334166666666666666666666666666668055555555555555555555555555557539682539682539682539682539685019841269841269841268",
        "1.000000000000000000000000000020000000000000000000000000000200000000000000000000000000001333333333333333333333333333340000000000000000000000000000026666666666666666666666666666755555555555555555555555555555809523809523809523809523809524444444444444444444444447",
        "1.000000000000000000000000000030000000000000000000000000000450000000000000000000000000004500000000000000000000000000033750000000000000000000000000202500000000000000000000000001012500000000000000000000000004339285714285714285714285714301986607142857142857142859",
        "1.000000000000000000000000000040000000000000000000000000000800000000000000000000000000010666666666666666666666666666773333333333333333333333333334186666666666666666666666666672355555555555555555555555555588063492063492063492063492063654603174603174603174603175",
        "1.000000000000000000000000000050000000000000000000000000001250000000000000000000000000020833333333333333333333333333593750000000000000000000000002604166666666666666666666666688368055555555555555555555555710565476190476190476190476191445002480158730158730158732",
        "1.000000000000000000000000000060000000000000000000000000001800000000000000000000000000036000000000000000000000000000540000000000000000000000000006480000000000000000000000000064800000000000000000000000000555428571428571428571428571432737142857142857142857142857",
        "1.000000000000000000000000000070000000000000000000000000002450000000000000000000000000057166666666666666666666666667667083333333333333333333333347339166666666666666666666666830068055555555555555555555557189569444444444444444444444458742065972222222222222222222",
        "1.000000000000000000000000000080000000000000000000000000003200000000000000000000000000085333333333333333333333333335040000000000000000000000000027306666666666666666666666667030755555555555555555555555559716571428571428571428571428613038730158730158730158730158",
        "1.00000000000000000000000000009000000000000000000000000000405000000000000000000000000012150000000000000000000000000273375000000000000000000000004920750000000000000000000000073811250000000000000000000000949001785714285714285714285724961984375"
    ],
    [
        "1",
        "1.00000000000000000000000000000100000000000000000000000000000050000000000000000000000000000016666666666666666666666666666670833333333333333333333333333334166666666666666666666666666666805555555555555555555555555555575396825396825396825396825396827876984126984",
        "1.000000000000000000000000000002000000000000000000000000000002000000000000000000000000000001333333333333333333333333333334000000000000000000000000000000266666666666666666666666666666755555555555555555555555555555580952380952380952380952380952387301587301587304",
        "1.000000000000000000000000000003000000000000000000000000000004500000000000000000000000000004500000000000000000000000000003375000000000000000000000000002025000000000000000000000000001012500000000000000000000000000433928571428571428571428571428734151785714285719",
        "1.000000000000000000000000000004000000000000000000000000000008000000000000000000000000000010666666666666666666666666666677333333333333333333333333333341866666666666666666666666666672355555555555555555555555555558806349206349206349206349206350831746031746031746",
        "1.00000000000000000000000000000500000000000000000000000000001250000000000000000000000000002083333333333333333333333333335937500000000000000000000000002604166666666666666666666666668836805555555555555555555555557105654761904761904761904761905730716765873015873",
        "1.000000000000000000000000000006000000000000000000000000000018000000000000000000000000000036000000000000000000000000000054000000000000000000000000000064800000000000000000000000000064800000000000000000000000000055542857142857142857142857142898799999999999999999",
        "1.00000000000000000000000000000700000000000000000000000000002450000000000000000000000000005716666666666666666666666666676670833333333333333333333333347339166666666666666666666666683006805555555555555555555555571895694444444444444444444444458742065972222222222",
        "1.00000000000000000000000000000800000000000000000000000000003200000000000000000000000000008533333333333333333333333333350400000000000000000000000000027306666666666666666666666666703075555555555555555555555555597165714285714285714285714285755895873015873015873",
        "1.000000000000000000000000000009000000000000000000000000000040500000000000000000000000000121500000000000000000000000000273375000000000000000000000000492075000000000000000000000000738112500000000000000000000000949001785714285714285714285715353341294642857142859"
    ],
    [
        "1",
        "1.000000000000000000000000000000100000000000000000000000000000005000000000000000000000000000000166666666666666666666666666666670833333333333333333333333333333416666666666666666666666666666668055555555555555555555555555555575396825396825396825396825396825644842",
        "1.000000000000000000000000000000200000000000000000000000000000020000000000000000000000000000001333333333333333333333333333333400000000000000000000000000000002666666666666666666666666666666755555555555555555555555555555558095238095238095238095238095238158730159",
        "1.000000000000000000000000000000300000000000000000000000000000045000000000000000000000000000004500000000000000000000000000000337500000000000000000000000000020250000000000000000000000000001012500000000000000000000000000043392857142857142857142857142858770089287",
        "1.000000000000000000000000000000400000000000000000000000000000080000000000000000000000000000010666666666666666666666666666667733333333333333333333333333333418666666666666666666666666666672355555555555555555555555555555880634920634920634920634920634936888888889",
        "1.000000000000000000000000000000500000000000000000000000000000125000000000000000000000000000020833333333333333333333333333335937500000000000000000000000000260416666666666666666666666666688368055555555555555555555555557105654761904761904761904761904858785962301",
        "1.000000000000000000000000000000600000000000000000000000000000180000000000000000000000000000036000000000000000000000000000005400000000000000000000000000000648000000000000000000000000000064800000000000000000000000000005554285714285714285714285714286130857142859",
        "1.00000000000000000000000000000070000000000000000000000000000024500000000000000000000000000005716666666666666666666666666667667083333333333333333333333333473391666666666666666666666666683006805555555555555555555555557189569444444444444444444444444587420659722",
        "1.000000000000000000000000000000800000000000000000000000000000320000000000000000000000000000085333333333333333333333333333350400000000000000000000000000002730666666666666666666666666667030755555555555555555555555555597165714285714285714285714285718446730158732",
        "1.000000000000000000000000000000900000000000000000000000000000405000000000000000000000000000121500000000000000000000000000027337500000000000000000000000004920750000000000000000000000000738112500000000000000000000000094900178571428571428571428571439247698660714"
    ],
    [
        "1",
        "1.000000000000000000000000000000010000000000000000000000000000000050000000000000000000000000000000166666666666666666666666666666667083333333333333333333333333333334166666666666666666666666666666668055555555555555555555555555555557539682539682539682539682539682",
        "1.000000000000000000000000000000020000000000000000000000000000000200000000000000000000000000000001333333333333333333333333333333340000000000000000000000000000000026666666666666666666666666666666755555555555555555555555555555555809523809523809523809523809523812",
        "1.000000000000000000000000000000030000000000000000000000000000000450000000000000000000000000000004500000000000000000000000000000033750000000000000000000000000000202500000000000000000000000000001012500000000000000000000000000004339285714285714285714285714285728",
        "1.000000000000000000000000000000040000000000000000000000000000000800000000000000000000000000000010666666666666666666666666666666773333333333333333333333333333334186666666666666666666666666666672355555555555555555555555555555588063492063492063492063492063492225",
        "1.000000000000000000000000000000050000000000000000000000000000001250000000000000000000000000000020833333333333333333333333333333593750000000000000000000000000002604166666666666666666666666666688368055555555555555555555555555710565476190476190476190476190477159",
        "1.000000000000000000000000000000060000000000000000000000000000001800000000000000000000000000000036000000000000000000000000000000540000000000000000000000000000006480000000000000000000000000000064800000000000000000000000000000555428571428571428571428571428575594",
        "1.00000000000000000000000000000007000000000000000000000000000000245000000000000000000000000000005716666666666666666666666666666766708333333333333333333333333334733916666666666666666666666666683006805555555555555555555555555718956944444444444444444444444445874",
        "1.000000000000000000000000000000080000000000000000000000000000003200000000000000000000000000000085333333333333333333333333333335040000000000000000000000000000027306666666666666666666666666667030755555555555555555555555555559716571428571428571428571428571470183",
        "1.000000000000000000000000000000090000000000000000000000000000004050000000000000000000000000000121500000000000000000000000000002733750000000000000000000000000049207500000000000000000000000000738112500000000000000000000000009490017857142857142857142857142963907"
    ],
    [
        "1",
        "1.000000000000000000000000000000001000000000000000000000000000000000500000000000000000000000000000000166666666666666666666666666666666708333333333333333333333333333333341666666666666666666666666666666668055555555555555555555555555555555753968253968253968253988",
        "1.000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000001333333333333333333333333333333334000000000000000000000000000000000266666666666666666666666666666666755555555555555555555555555555555580952380952380952380952383",
        "1.00000000000000000000000000000000300000000000000000000000000000000450000000000000000000000000000000450000000000000000000000000000000337500000000000000000000000000000202500000000000000000000000000000101250000000000000000000000000000043392857142857142857142857",
        "1.000000000000000000000000000000004000000000000000000000000000000008000000000000000000000000000000010666666666666666666666666666666677333333333333333333333333333333341866666666666666666666666666666672355555555555555555555555555555558806349206349206349206349208",
        "1.000000000000000000000000000000005000000000000000000000000000000012500000000000000000000000000000020833333333333333333333333333333359375000000000000000000000000000026041666666666666666666666666666688368055555555555555555555555555571056547619047619047619047618",
        "1.00000000000000000000000000000000600000000000000000000000000000001800000000000000000000000000000003600000000000000000000000000000005400000000000000000000000000000006480000000000000000000000000000006480000000000000000000000000000005554285714285714285714285714",
        "1.000000000000000000000000000000007000000000000000000000000000000024500000000000000000000000000000057166666666666666666666666666666766708333333333333333333333333333473391666666666666666666666666666830068055555555555555555555555555718956944444444444444444444443",
        "1.000000000000000000000000000000008000000000000000000000000000000032000000000000000000000000000000085333333333333333333333333333333504000000000000000000000000000000273066666666666666666666666666667030755555555555555555555555555555971657142857142857142857142858",
        "1.000000000000000000000000000000009000000000000000000000000000000040500000000000000000000000000000121500000000000000000000000000000273375000000000000000000000000000492075000000000000000000000000000738112500000000000000000000000000949001785714285714285714285715"
    ],
    [
        "1",
        "1.000000000000000000000000000000000100000000000000000000000000000000005000000000000000000000000000000000166666666666666666666666666666666670833333333333333333333333333333333416666666666666666666666666666666668055555555555555555555555555555555575396825396825398",
        "1.000000000000000000000000000000000200000000000000000000000000000000020000000000000000000000000000000001333333333333333333333333333333333400000000000000000000000000000000002666666666666666666666666666666666755555555555555555555555555555555558095238095238095238",
        "1.000000000000000000000000000000000300000000000000000000000000000000045000000000000000000000000000000004500000000000000000000000000000000337500000000000000000000000000000020250000000000000000000000000000001012500000000000000000000000000000043392857142857142855",
        "1.000000000000000000000000000000000400000000000000000000000000000000080000000000000000000000000000000010666666666666666666666666666666667733333333333333333333333333333333418666666666666666666666666666666672355555555555555555555555555555555880634920634920634923",
        "1.000000000000000000000000000000000500000000000000000000000000000000125000000000000000000000000000000020833333333333333333333333333333335937500000000000000000000000000000260416666666666666666666666666666688368055555555555555555555555555557105654761904761904763",
        "1.000000000000000000000000000000000600000000000000000000000000000000180000000000000000000000000000000036000000000000000000000000000000005400000000000000000000000000000000648000000000000000000000000000000064800000000000000000000000000000005554285714285714285715",
        "1.000000000000000000000000000000000700000000000000000000000000000000245000000000000000000000000000000057166666666666666666666666666666676670833333333333333333333333333334733916666666666666666666666666666830068055555555555555555555555555571895694444444444444448",
        "1.000000000000000000000000000000000800000000000000000000000000000000320000000000000000000000000000000085333333333333333333333333333333350400000000000000000000000000000002730666666666666666666666666666667030755555555555555555555555555555597165714285714285714288",
        "1.00000000000000000000000000000000090000000000000000000000000000000040500000000000000000000000000000012150000000000000000000000000000002733750000000000000000000000000000492075000000000000000000000000000073811250000000000000000000000000009490017857142857142858"
    ]
];

;// CONCATENATED MODULE: ./lib/logarithm.js












function Euler(precision = 32) {
    precision = Math.max(16, precision);
    let result = '1';
    let n = '1';
    let f = '1';
    while (true) {
        f = multiply(f, n);
        const next = divide('1', f, precision + 3);
        if (testTolerance(abs(next), precision)) {
            return stripTrailingZero(roundOff(result, 1024));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}
function exp(exponent) {
    exponent = exponent.toString();
    const remainder = exponent.split('.')[1];
    let result = pow(E, abs_abs(exponent).split('.')[0], 33);
    let fractionalExponent = '1';
    if (remainder) {
        for (let i = 0; i < Math.min(33, remainder.length); i++) {
            fractionalExponent = multiply_multiply(fractionalExponent, E_ROOTS_FOR_POW[i][remainder[i]]);
        }
        result = multiply_multiply(result, fractionalExponent);
    }
    return pow(E, exponent, 33);
}
function expm1(exponent) {
    exponent = exponent.toString();
    return subtract_subtract(exp(exponent), '1');
}
function ln(x = 2) {
    x = x.toString();
    if (compareTo_lessThan(x, '0', true)) {
        throw "[ln]: x must be greater than 0";
    }
    if (equals(x, '1')) {
        return '0'; // ln(1) = 0
    }
    let result = '0';
    let term = stripTrailingZero_stripTrailingZero(divide_divide(subtract_subtract(x, '1'), add_add(x, '1'), 64 + 2));
    let i = 0;
    if (compareTo_lessThan(x, '2')) {
        while (true) {
            i++;
            let iteration = subtract_subtract(multiply_multiply('2', i), '1');
            let next = divide_divide(round_roundOff(intPow(term, iteration), 64 + 2), iteration, 64 + 2);
            if (utils_testTolerance(next, 64)) {
                return round_roundOff(multiply_multiply('2', add_add(result, next)), 64);
            }
            result = add_add(result, next);
        }
    }
    let f = stripTrailingZero_stripTrailingZero(pow(term, 2, 64 + 2));
    let t = stripTrailingZero_stripTrailingZero(pow(term, 1, 64 + 2));
    while (true) {
        i++;
        let iteration = subtract_subtract(multiply_multiply('2', i), '1');
        let next = round_roundOff(multiply_multiply(divide_divide('1', iteration, 64 + 2), t), 1024 + 4);
        if (utils_testTolerance(next, 64)) {
            return round_roundOff(multiply_multiply('2', add_add(result, next)), 64);
        }
        t = stripTrailingZero_stripTrailingZero(round_roundOff(multiply_multiply(t, f), 64 + 2));
        result = add_add(result, next);
    }
}
function ln2(x = 2) {
    x = x.toString();
    if (compareTo_lessThan(x, '0', true)) {
        throw "[ln2]: x must be greater than 0";
    }
    let result = '0';
    while (compareTo_greaterThan(x, '2', true)) {
        x = divide_divide(x, 2, 64 + 2);
        result = add_add(result, '1');
    }
    return round_roundOff(add_add(result, divide_divide(ln(x), LN2, 64 + 2)), 64);
}
function log(base) {
    base = base.toString();
    return round_roundOff(multiply_multiply(ln2(base), LN2), 64);
}
function log10(base) {
    base = base.toString();
    return round_roundOff(divide_divide(ln(base), LN10, 64 + 2), 64);
}

;// CONCATENATED MODULE: ./lib/trig.js











// PI up to the first 64 decimal places
const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229';
// Hypotenuse 
function hypot(a, b) {
    a = a.toString();
    b = b.toString();
    return sqRoot(add_add(pow(a, '2'), add_add(pow(b, '2'))));
}
// Sine functions
function sin(x) {
    x = x.toString();
    if (compareTo_greaterThan(abs_abs(x), PI)) {
        let r = divide_divide(x, PI, 33).split('.');
        x = stripTrailingZero_stripTrailingZero(round_roundOff(multiply_multiply(pow(subtract_negate(sign(x).toString()), r[0]), multiply_multiply(PI, (r[1]) ? '0.' + r[1] : '0')), 32));
    }
    const threshold = utils_tolerance(33);
    let result = '0';
    let _sign = '1';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product
    while (true) {
        const N = subtract_subtract(multiply_multiply(n, '2'), '1'); // Next real term in series (even terms cancel)
        f = multiply_multiply(f, N);
        const next = multiply_multiply(_sign, divide_divide(pow(x, N, 33), f, 34));
        if (compareTo_lessThan(abs_abs(next), threshold)) {
            result = add_add(result, next);
            return stripTrailingZero_stripTrailingZero(isAproxZero(result) ? '0' : isAproxOne(result) ? multiply_multiply('1', sign(result).toString()) : result);
        }
        result = add_add(result, next);
        _sign = subtract_negate(_sign);
        f = multiply_multiply(f, multiply_multiply(n, '2')); // Iterate once to synchronize Factorial
        n = add_add(n, '1');
    }
}
function asin(x) {
    x = x.toString();
    if (compareTo_greaterThan(abs_abs(x), '1')) {
        throw Error('[Arcsine]: argument x is out of range.');
    }
    const threshold = utils_tolerance(33);
    let result = '0';
    let n = '1';
    let even = '1';
    let odd = '1';
    while (true) {
        const N = multiply_multiply(n, '2');
        const R = add_add(N, '1');
        even = multiply_multiply(even, N);
        odd = multiply_multiply(odd, subtract_subtract(N, '1'));
        let next = divide_divide(multiply_multiply(odd, pow(x, R)), multiply_multiply(even, R), 34);
        if (compareTo_lessThan(next, threshold)) {
            result = add_add(result, next);
            return stripTrailingZero_stripTrailingZero(round_roundOff(add_add(result, x), 32));
        }
        result = add_add(result, next);
        n = add_add(n, '1');
    }
}
function sinh(x) {
    x = x.toString();
    return stripTrailingZero_stripTrailingZero(subtract_subtract(divide_divide(exp(x), '2', 33), divide_divide(exp(subtract_negate(x)), '2', 33)));
}
// Cosine functions
function cos(x) {
    x = x.toString();
    if (compareTo_greaterThan(abs_abs(x), PI)) {
        let r = divide_divide(x, PI, 33).split('.');
        x = stripTrailingZero_stripTrailingZero(round_roundOff(multiply_multiply(pow(subtract_negate(sign(x).toString()), r[0]), multiply_multiply(PI, (r[1]) ? '0.' + r[1] : '0')), 32));
    }
    const threshold = utils_tolerance(33);
    let result = '0';
    let _sign = '1';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product
    while (true) {
        const N = multiply_multiply(n, '2'); // Next real term in series (odd terms cancel)
        f = multiply_multiply(f, subtract_subtract(N, '1')); // Iterate once to synchronize Factorial
        f = multiply_multiply(f, N);
        const next = multiply_multiply(_sign, divide_divide(pow(x, N, 33), f, 34));
        if (compareTo_lessThan(abs_abs(next), threshold)) {
            result = subtract_subtract('1', add_add(result, next));
            return stripTrailingZero_stripTrailingZero(isAproxOne(result) ? multiply_multiply('1', sign(result).toString()) : isAproxZero(result) ? '0' : result);
        }
        result = add_add(result, next);
        _sign = subtract_negate(_sign);
        n = add_add(n, '1');
    }
}
function acos(x) {
    x = x.toString();
    if (compareTo_greaterThan(abs_abs(x), '1')) {
        throw Error('[Arccosine]: argument x is out of range.');
    }
    return stripTrailingZero_stripTrailingZero(subtract_subtract(divide_divide(PI, 2, 32), asin(x)));
}
function cosh(x) {
    x = x.toString();
    return stripTrailingZero_stripTrailingZero(divide_divide(add_add(exp(x), exp(subtract_negate(x))), '2', 32));
}
// Tangant functions
function tan(x) {
    x = x.toString();
    return stripTrailingZero_stripTrailingZero(divide_divide(sin(x), cos(x), 32));
}
function atan(x) {
    x = x.toString();
    if (compareTo_greaterThan(abs_abs(x), '1')) {
        return stripTrailingZero_stripTrailingZero(subtract_subtract(divide_divide(PI, 2, 33), atan(divide_divide(1, x, 33))));
    }
    const threshold = utils_tolerance(33);
    let result = '0';
    let n = '0';
    while (true) {
        let N = multiply_multiply('2', n);
        let next = divide_divide(multiply_multiply(pow('-1', n), pow(x, add_add(N, '1'))), add_add(N, '1'), 32);
        if (compareTo_lessThan(abs_abs(next), threshold)) {
            return stripTrailingZero_stripTrailingZero(round_roundOff(add_add(result, next), 32));
        }
        result = add_add(result, next);
        n = add_add(n, '1');
    }
}
function atan2(y, x) {
    x = x.toString();
    y = y.toString();
    let offset = '0';
    if (isExatclyZero(x) && isExatclyZero(y)) {
        return '0';
    }
    if (isExatclyZero(x) && compareTo_greaterThan(y, '0')) {
        return stripTrailingZero_stripTrailingZero(round_roundOff(divide_divide(PI, 2, 33), 32));
    }
    if (isExatclyZero(x) && compareTo_lessThan(y, '0')) {
        return stripTrailingZero_stripTrailingZero(round_roundOff(subtract_negate(divide_divide(PI, 2, 33)), 32));
    }
    if (compareTo_lessThan(x, '0')) {
        offset = (compareTo_greaterThan(y, '0', true)) ? PI : subtract_negate(PI);
    }
    return stripTrailingZero_stripTrailingZero(round_roundOff(add_add(atan(divide_divide(y, x, 33)), offset), 32));
}
function tanh(x) {
    x = x.toString();
    return stripTrailingZero_stripTrailingZero(divide_divide(sinh(x), cosh(x), 32));
}

;// CONCATENATED MODULE: ./lib/statistics.js






function mean(numbers) {
    if (numbers.length === 0)
        throw Error('[Mean]: Empty array.');
    if (numbers.length === 1)
        return numbers[0];
    return divide_divide(numbers.reduce((prev, curr) => {
        return add_add(prev, curr);
    }, '0'), numbers.length.toString());
}
;
function median(numbers) {
    if (numbers.length === 0)
        throw Error('[Median]: Empty array.');
    if (numbers.length === 1)
        return numbers[0];
    const n = numbers.length.toString();
    numbers = numbers.sort((a, b) => compareTo(a, b));
    if (isOdd(n))
        return numbers[parseInt(divide_divide(add_add(n, '1'), 2))];
    let n0 = numbers[parseInt(divide_divide(n, 2))];
    let n1 = numbers[parseInt(add_add(divide_divide(n, 2), '1'))];
    return divide_divide(add_add(n0, n1), 2);
}
;
function mode(numbers, last = false) {
    if (numbers.length === 0)
        throw Error('[Mode]: Empty array.');
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
        ;
        counts[i] = add_add(counts[i], '1');
    });
    let m = (last) ? counts.lastIndexOf(max(counts)) : counts.indexOf(max(counts));
    return values[m];
}
;
function variance(numbers) {
    if (numbers.length === 0)
        throw Error('[Variance]: Empty array.');
    if (numbers.length === 1)
        return '0';
    const m = mean(numbers);
    numbers = numbers.map((value) => {
        return intPow(subtract_subtract(value, m), '2');
    });
    return mean(numbers);
}
;
function stdDv(numbers) {
    if (numbers.length === 0)
        throw Error('[Standard Deviation]: Empty array.');
    if (numbers.length === 1)
        return '0';
    return sqRoot(variance(numbers));
}
;

;// CONCATENATED MODULE: ./lib/big-decimal.js
















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
        return round_roundOff(number, precision, mode);
    }
    round(precision = 0, mode = RoundingModes.HALF_EVEN) {
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return new bigDecimal(round_roundOff(this.value, precision, mode));
    }
    static abs(number) {
        number = bigDecimal.validate(number);
        return abs_abs(number);
    }
    abs() {
        return new bigDecimal(abs_abs(this.value));
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
        return add_add(number1, number2);
    }
    add(number) {
        return new bigDecimal(add_add(this.value, number.getValue()));
    }
    static subtract(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return subtract_subtract(number1, number2);
    }
    subtract(number) {
        return new bigDecimal(subtract_subtract(this.value, number.getValue()));
    }
    static multiply(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply_multiply(number1, number2);
    }
    multiply(number) {
        return new bigDecimal(multiply_multiply(this.value, number.getValue()));
    }
    static divide(number1, number2, precision) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return divide_divide(number1, number2, precision);
    }
    divide(number, precision) {
        return new bigDecimal(divide_divide(this.value, number.getValue(), precision));
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
        return subtract_negate(number);
    }
    negate() {
        return new bigDecimal(subtract_negate(this.value));
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
    static get E() {
        return E;
    }
    static get LN2() {
        return LN2;
    }
    static get LN10() {
        return LN10;
    }
    static get LOG2E() {
        return LOG2E;
    }
    static get LOG10E() {
        return LOG10E;
    }
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
        return log(add_add('1', number));
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
        return compareTo_lessThan(number1, number2);
    }
    lt(number) {
        return compareTo_lessThan(this.value, number.getValue());
    }
    static leq(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo_lessThan(number1, number2, true);
    }
    leq(number) {
        return compareTo_lessThan(this.value, number.getValue(), true);
    }
    static gt(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo_greaterThan(number1, number2);
    }
    gt(number) {
        return compareTo_greaterThan(this.value, number.getValue());
    }
    static geq(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo_greaterThan(number1, number2, true);
    }
    geq(number) {
        return compareTo_greaterThan(this.value, number.getValue(), true);
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
    static factorial(number) {
        number = bigDecimal.validate(number);
        return factorial(number);
    }
    static subfactorial(number) {
        number = bigDecimal.validate(number);
        return subfactorial(number);
    }
    static stripTrailingZero(number) {
        number = bigDecimal.validate(number);
        return stripTrailingZero_stripTrailingZero(number);
    }
    static random(length = 32) {
        return random(length);
    }
    stripTrailingZero() {
        return new bigDecimal(stripTrailingZero_stripTrailingZero(this.value));
    }
}
/* harmony default export */ var big_decimal = (bigDecimal);

/******/ 	return __webpack_exports__;
/******/ })()
;
});