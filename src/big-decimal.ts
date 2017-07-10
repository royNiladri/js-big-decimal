import { add, trim } from './add';
import { roundOff } from './round';
import { multiply } from './multiply';
import { compareTo } from './compareTo'

export class bigDecimal {

    private value: string;

    private static validate(number) {
        if (number) {
            number = number.toString();
            if (isNaN(number))
                throw Error("Parameter is not a number: " + number);

            if (number[0] == '+')
                number = number.substring(1);
        } else
            number = '0';

        //handle exponentiation
        if (/e/i.test(number)) {
            let [mantisa, exponent] = number.split(/[eE]/);
            mantisa = trim(mantisa);
            exponent = parseInt(exponent) + mantisa.indexOf('.');
            mantisa = mantisa.replace('.', '');
            if (mantisa.length < exponent) {
                number = mantisa + (new Array(exponent - mantisa.length + 1)).join('0');
            } else if (mantisa.length >= exponent && exponent > 0) {
                number = trim(mantisa.substring(0, exponent)) +
                    ((mantisa.length > exponent) ? ('.' + mantisa.substring(exponent)) : '');
            } else {
                number = '0.' + (new Array(-exponent + 1)).join('0') + mantisa;
            }
        }

        return number;
    }

    constructor(number = '0') {
        this.value = bigDecimal.validate(number);
    }

    getValue() {
        return this.value;
    }

    getPrettyValue(digits, separator) {
        if (!(digits || separator)) {
            digits = 3;
            separator = ',';
        } else if (!(digits && separator)) {
            throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
        }

        var len = this.value.indexOf('.');
        len = len > 0 ? len : (this.value.length);
        var temp = '';
        for (var i = len; i > 0;) {
            if (i < digits) {
                digits = i;
                i = 0;
            } else
                i -= digits;

            temp = this.value.substring(i, i + digits) + ((i < (len - digits) && i >= 0) ? separator : '') + temp;
        }
        return temp + this.value.substring(len);
    }

    round(precision) {
        if (!precision)
            precision = 0;
        else if (isNaN(precision))
            throw Error("Precision is not a number: " + precision);

        return roundOff(this.value, precision);
    }

    static add(number1, number2) {
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return add(number1, number2);
    }

    static multiply(number1, number2){
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return multiply(number1, number2);
    }

    static compareTo(number1, number2){
        number1 = bigDecimal.validate(number1);
        number2 = bigDecimal.validate(number2);
        return compareTo(number1, number2);
    }
}
