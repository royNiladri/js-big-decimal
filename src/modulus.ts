import { divide } from './divide';
import { roundOff } from './round';
import { multiply } from './multiply';
import { negate, subtract } from './subtract';
import { RoundingModes } from './roundingModes';
import { abs } from './abs';


// export function modulus(dividend: number | string, divisor: number | string) {
//     if (divisor == 0) {
//         throw new Error('Cannot divide by 0');
//     }

//     dividend = dividend.toString();
//     divisor = divisor.toString();

//     validate(dividend);
//     validate(divisor);

//     let sign = '';
//     if (dividend[0] == '-') {
//         sign = '-';
//         dividend = dividend.substr(1);
//     }
//     if (divisor[0] == '-') {
//         divisor = divisor.substr(1);
//     }

//     let result = subtract(dividend, multiply(divisor, roundOff(divide(dividend, divisor), 0, RoundingModes.FLOOR)));
//     return sign + result;
// }

// function validate(oparand: string) {
//     if (oparand.indexOf('.') != -1) { // oparand.includes('.') could also work here
//         throw new Error('Modulus of non-integers not supported');
//     }
// }


// For technical purposes, this is actually Remainder, and not Modulus (Euclidean division).
// Could seperate the Modulus equation into its own function,
// then use it within the Remainder function after proper negation.
// Proper neation only depends on the sign of the dividend, where the result takes the sign
// of the divident, and ignores the sign of the divisor. For this effect, the absolute values of
// each oparand is used, then the original sign of the divident dictates 
// nagation of the result to negative or not.


// To ensure backwards compatibility, the new Modulus function could be named 'modulusE',
// where 'E' denotes 'Euclidean' in 'Euclidean division'.

// Sugested changes are bellow

export function modulusE(n: number | string, base: number | string = 1, percision: number | undefined = undefined) {
    if (base == 0) {
        throw new Error('Cannot divide by 0');
    }

    n = n.toString();
    base = base.toString();

    // validate(n);
    validate(base);

    return subtract(n, multiply(base, roundOff(divide(n, base, percision), 0, RoundingModes.FLOOR)));
}

export function modulus(dividend: number | string, divisor: number | string = 1, percision: number | undefined = undefined) {
    
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }

    dividend = dividend.toString();
    divisor = divisor.toString();

    validate(divisor);

    const result = modulusE(abs(dividend), abs(divisor), percision);
    return (dividend.includes('-')) ? negate(result) : result;
}

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw new Error('Modulus of non-integers not supported');
    }
}


