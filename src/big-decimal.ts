import { add, trim } from './add';
import { roundOff } from './round';
import { multiply } from './multiply';
import { divide } from './divide';
import { modulus } from './modulus';
import { compareTo } from './compareTo';
import { subtract, negate } from './subtract';
import { RoundingModes as Modes, RoundingModes } from './roundingModes';
import { off } from 'process';

class bigDecimal {

    private value: string;
    static RoundingModes = Modes;

    private static validate(number): string {
        if (number) {
            number = number.toString();
            if (isNaN(number))
                throw Error("Parameter is not a number: " + number);

            if (number[0] == '+')
                number = number.substring(1);
        } else
            number = '0';

        //handle missing leading zero
        if (number.startsWith('.'))
            number = '0' + number;
        else if (number.startsWith('-.'))
            number = '-0' + number.substr(1);

        //handle exponentiation
        if (/e/i.test(number)) {
            let [mantisa, exponent] = number.split(/[eE]/);
            mantisa = trim(mantisa);

            let sign = '';
            if (mantisa[0] == '-') {
                sign = '-';
                mantisa = mantisa.substring(1);
            }

            if (mantisa.indexOf('.') >= 0) {
                exponent = parseInt(exponent) + mantisa.indexOf('.');
                mantisa = mantisa.replace('.', '');
            } else {
                exponent = parseInt(exponent) + mantisa.length;
            }

            if (mantisa.length < exponent) {
                number = sign + mantisa + (new Array(exponent - mantisa.length + 1)).join('0');
            } else if (mantisa.length >= exponent && exponent > 0) {
                number = sign + trim(mantisa.substring(0, exponent)) +
                    ((mantisa.length > exponent) ? ('.' + mantisa.substring(exponent)) : '');
            } else {
                number = sign + '0.' + (new Array(-exponent + 1)).join('0') + mantisa;
            }
        }

        return number;
    }

    constructor(number: (number | string) = '0') {
        this.value = bigDecimal.validate(number);
    }

    getValue() {
        return this.value;
    }

    static getPrettyValue(number, digits, separator): string {
        if (!(digits || separator)) {
            digits = 3;
            separator = ',';
        } else if (!(digits && separator)) {
            throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
        }
        number = bigDecimal.validate(number);
        let neg = number.charAt(0) == '-';
        if (neg)
            number = number.substring(1);
        var len = number.indexOf('.');
        len = len > 0 ? len : (number.length);
        var temp = '';
        for (var i = len; i > 0;) {
            if (i < digits) {
                digits = i;
                i = 0;
            } else
                i -= digits;

            temp = number.substring(i, i + digits) + ((i < (len - digits) && i >= 0) ? separator : '') + temp;
        }
        return (neg ? '-' : '') + temp + number.substring(len);
    }
    getPrettyValue(digits, separator) {
        return bigDecimal.getPrettyValue(this.value, digits, separator);
    }

    static round(number, precision = 0, mode = Modes.HALF_EVEN) {
        number = bigDecimal.validate(number);
        // console.log(number)
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);
        return roundOff(number, precision, mode);
    }

    round(precision = 0, mode = Modes.HALF_EVEN) {
        if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);

        return new bigDecimal(roundOff(this.value, precision, mode));
    }

    static floor(number) {
        number = bigDecimal.validate(number);
        if (number.indexOf('.') === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.FLOOR);
    }

    floor() {
        if (this.value.indexOf('.') === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.FLOOR);
    }

    static ceil(number) {
        number = bigDecimal.validate(number);
        if (number.indexOf('.') === -1)
            return number;
        return bigDecimal.round(number, 0, RoundingModes.CEILING);
    }

    ceil() {
        if (this.value.indexOf('.') === -1)
            return new bigDecimal(this.value);
        return new bigDecimal(this.value).round(0, RoundingModes.CEILING);
    }


    static add(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return add(number1, number2);
    }

    add(number: bigDecimal) {
        return new bigDecimal(add(this.value, number.getValue()));
    }

    static subtract(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return subtract(number1, number2);
    }

    subtract(number: bigDecimal) {
        return new bigDecimal(subtract(this.value, number.getValue()));
    }

    static multiply(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply(number1, number2);
    }

    multiply(number: bigDecimal) {
        return new bigDecimal(multiply(this.value, number.getValue()));
    }

    static divide(number1, number2, precision) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return divide(number1, number2, precision);
    }

    divide(number: bigDecimal, precision) {
        return new bigDecimal(divide(this.value, number.getValue(), precision));
    }

    static modulus(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return modulus(number1, number2);
    }

    modulus(number: bigDecimal) {
        return new bigDecimal(modulus(this.value, number.getValue()));
    }

    static compareTo(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo(number1, number2);
    }

    compareTo(number: bigDecimal) {
        return compareTo(this.value, number.getValue());
    }

    static negate(number) {
        number = bigDecimal.validate(number);
        return negate(number);
    }

    negate() {
        return new bigDecimal(negate(this.value));
    }
}
export = bigDecimal;