import { abs } from "./abs";
import { equals, greaterThan, isExatclyOne, isExatclyZero, isOdd, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn, subtract } from "./subtract";
import { add } from "./add";
import { isAproxOne, isAproxZero, sign, tolerance } from "./utils";
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

export function pow(base: number | string, exponent: number | string, precision: number | undefined = undefined, negate: boolean | undefined = false): string {


    // AddInstantiate.then((res)=>{
    //     console.log('custom wasm loader',res.__add('00001', '1'))
    // })

    // const v = await (async url => await AddInstantiate)();

    // console.log('custom wasm loader', AddWebAssembly('1', '1'))

    exponent = exponent.toString();
    base = base.toString();

    if (isExatclyZero(exponent)) {
        return '1'
    }

    if (!exponent.includes('-') && isExatclyOne(exponent)) {
        return base
    }

    if (isExatclyZero(base) && exponent.includes('-') && isExatclyOne(exponent)) {
        throw Error('0^(-1) is undefined');
    }

    const finalize = (result: string) => {
        result = (negativeExponent) ? divide(1, result, precision + 1) : result;
        result = (precision) ? roundOff(result, precision) : result;
        return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
    };

    const negativeBase = base.includes('-');

    const negativeExponent = exponent.includes('-');
    const exponentParts = exponent.split('.');
    const exponentSignificand = exponentParts[1];

    const isBase10 = equals(abs(base), '10');

    if (isBase10) {
        base = abs(base);
        negate = !negate;
    }

    let fractionalExponent = '1';
    let result;

    if (equals(abs(base), '10')) {
        result = (negativeExponent) ? `0.${new Array(Number(abs(exponentParts[0])) - 1).join('0')}1` : `1${new Array(exponentParts[0]).join('0')}`
    } else {
        result = intPow(abs(base), abs(exponentParts[0]))
    }

    if (exponentSignificand) {

        if (negativeBase) {
            negate = !negate
        }


        precision = Math.max(precision, 32);
        // const testworker = new Worker(new URL("./workers/pow.worker.js", import.meta.url));
        // testworker.postMessage({ base: abs(base), significand: exponentSignificand });

        // testworker.onmessage = (event) => {
        //     console.log('webresult', result)
        //     // console.log('web', multiply(result, event.data))
        //     // testworker.terminate();

        //     // fractionalExponent = event.data
        //     return finalize(multiply(result, event.data))
        //     // testworker.terminate();
        // }

        let tempBase = root10(abs(base));

        for (let i = 0; i < exponentSignificand.length; i++) {
            fractionalExponent = multiply(fractionalExponent, pow(tempBase, exponentSignificand[i]))
            tempBase = root10(tempBase)
        }
        return finalize(multiply(result, fractionalExponent))

    } else {
        return finalize(result)
    }

    // let exponentIntegers = abs(exponentParts[0]);

    // if (equals(abs(base), '10')) {
    //     result = (negativeExponent) ? `0.${new Array(Number(exponentIntegers) - 1).join('0')}1` : `1${new Array(exponentIntegers).join('0')}`
    //     return multiply(multiply(result, fractionalExponent), pow(sign(base), exponentIntegers))
    // }

    // while (greaterThan(exponentIntegers, '0')) {
    //     if (isOdd(exponentIntegers)) { result = multiply(result, base) }
    //     base = multiply(base, base);
    //     exponentIntegers = divide(exponentIntegers, 2).split('.')[0];
    // }

    // result = multiply(result, fractionalExponent);
    // result = (negativeExponent) ? divide(1, result, precision + 1) : result;
    // result = (precision) ? roundOff(result, precision) : result;
    // return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
};

function intPow(base: string, exponent: string, precision: number | undefined = 32) {
    exponent = abs(exponent);
    let result = '1';

    while (greaterThan(exponent, '0')) {
        if (isOdd(exponent)) { result = multiply(result, base) }
        base = multiply(base, base);
        exponent = divide(exponent, 2).split('.')[0];
    }

    return result
}

export function nthRoot(x: number | string, n: number | string, precision = 8) {

    x = x.toString();
    n = n.toString();

    validate(n);

    if (lessThan(n, '4', true)) {
        let guess = '1';
        let nMinusOne = subtract(n, 1);
        let difference = '0'
        let lastDifference = x
        let i = 0;
        while (true) {

            let newGuess = divide(add(stripTrailingZero(divide(x, pow(guess, nMinusOne, precision + 2), precision + 2)), multiply(guess, nMinusOne)), n, precision + 2);

            difference = abs(subtract(guess, newGuess))

            if (greaterThan(difference, lastDifference)) {
                // console.log('root exit under p')
                return stripTrailingZero(roundOff(guess, precision + 1))
            }

            if (lessThan(difference, tolerance(precision - 1))) {
                // console.log('newGuess exit under p')
                return stripTrailingZero(roundOff(newGuess, precision + 1))
            }

            lastDifference = difference;
            guess = stripTrailingZero(newGuess);

            i++;
        }
        // console.log('guess exit over itt')

        // return stripTrailingZero(roundOff(guess, precision + 1))
    } else {
        let x0 = '1';
        let x1 = '2';
        let x2 = '1.5';
        let i = 0;

        while (true) {
            let f0 = subtract(pow(x0, n, precision + 2), x);
            let f1 = subtract(pow(x1, n, precision + 2), x);
            let next = multiply(f1, divide(subtract(x1, x0), subtract(f1, f0), precision + 2));
            x2 = subtract(roundOff(x1, precision + 2), roundOff(next, precision + 2));

            if (lessThan(abs(subtract(x2, x1)), tolerance(precision + 1))) {
                return stripTrailingZero(roundOff(x2, precision + 1));
            }

            if (sign(f0) !== sign(f1)) {
                x1 = divide(add(x0 + x1), 2, precision + 2); // Switch to bisection method
            }

            x0 = x1;
            x1 = stripTrailingZero(roundOff(x2, precision + 2));
            i++;
        }

        // return stripTrailingZero(roundOff(x2, precision + 1))
    }

}

export function inverseSqRoot(number: string) {
    number = number.toString();

    let n = abs(number);

    let guess = '1';
    let difference = '0'
    let previousDifference = n
    let i = 0;

    while (i < 10) {
        // console.log('guess', guess)

        let newGuess = roundOff(multiply(guess, subtract('1.5', roundOff(multiply(divide(number, 2, 33), pow(guess, 2, 33)), 33))), 33)
        // console.log('newGuess', guess)

        difference = abs(subtract(guess, newGuess))

        if (greaterThan(difference, previousDifference)) {
            // console.log('root exit under p')
            return stripTrailingZero(roundOff(guess, 32 + 1))
        }

        if (lessThan(difference, tolerance(32 - 1))) {
            // console.log('newGuess exit under p')
            return stripTrailingZero(roundOff(guess, 32 + 1))
        }

        previousDifference = difference;
        guess = newGuess;

        i++;
    }



    // let [integer, fraction] = n.split('.');
    // let exponent = '0';

    // let integerBits = '';
    // let fractionBits = '';
    // let exponentBits = '';
    // let mantissaBits = '';

    // let mantissa = divide(integer + fraction, '1');


    // while (greaterThan(integer, '1', true)) {
    //     integerBits = isOdd(integer) ? '1' + integerBits : '0' + integerBits;
    //     integer = divide(integer, 2, 0);
    // }


    // if (fraction) {

    //     let precision = '32';
    //     fraction = '0.' + fraction;

    //     while (greaterThan(precision, '0')) {
    //         fraction = multiply(fraction, 2);
    //         fractionBits += fraction.split('.')[0];
    //         fraction = '0.' + fraction.split('.')[1];
    //         if (isAproxZero(fraction, 2)) break
    //         precision = subtract(precision, 1);
    //     }
    // }


    // if (integer == '0') {
    //     let lastDigit = '0';
    //     let i = 1;

    //     while (true) {
    //         if (lastDigit !== fractionBits[i - 1]) {
    //             i++
    //             break
    //         }
    //         i++
    //     }

    //     exponent = negateFn(i.toString())
    // } else {
    //     exponent = (integerBits.length - 1).toString()
    // }

    // mantissaBits = integerBits + fractionBits;
    // mantissa = add('1', divide(divide(mantissa, pow('2', mantissaBits.length), mantissaBits.length), '2', mantissaBits.length));
    // console.log('log a', subtract(multiply(divide('1', pow('2', mantissaBits.length), mantissaBits.length), add(mantissa, multiply(pow('2', mantissaBits.length), add(exponent, (mantissaBits.length - 1).toString())))), (mantissaBits.length - 1).toString()))

    // let E = roundOff(multiply(add(exponent, (mantissaBits.length - 1).toString()), '0.5'), 0, RoundingModes.FLOOR);

    // exponent = add(exponent, (mantissaBits.length - 1).toString())

    // while (greaterThan(exponent, '1', true)) {
    //     exponentBits += isOdd(exponent) ? '1' : '0';
    //     exponent = roundOff(divide(exponent, 2), 0, RoundingModes.FLOOR);
    // }

    // exponent = roundOff(multiply(add(exponent, (mantissaBits.length - 1).toString()), '0.5'), 0, RoundingModes.FLOOR)


    // console.log('integer', integer)
    // console.log('integerBits', integerBits)
    // console.log('fractionBits', fractionBits)
    // console.log('exponent', exponent)
    // console.log('exponentBits', exponentBits)

    // // const mantissaBits = integerBits + fractionBits;
    // const logBits = exponentBits + mantissaBits;
    // const binaryBits = '0' + logBits.substring(0, logBits.length - 1); //right bitshift

    // exponentBits = binaryBits.substring(0, exponentBits.length)
    // mantissaBits = binaryBits.substring(exponentBits.length)
    // const exponentRange = pow('2', exponentBits.length);
    // const mantissaRange = multiply('1.5', pow('2', mantissaBits.length - 1));
    // const correction = multiply(exponentRange, mantissaRange);

    // const log = '1.' + binaryBits.split('').reduce((p, c, i) => {
    //     return add(p, (c == '0') ? '0' : pow('2', binaryBits.length - i))
    // }, '0');


    // // console.log('mantissa', mantissa)
    // // console.log('mantissaBits', mantissaBits)
    // // console.log('logBits', logBits)
    // // console.log('binaryBits', binaryBits)
    // // console.log('mantissaRange', mantissaRange)
    // // console.log('exponentRange', exponentRange)
    // // console.log('correction', correction)
    // // console.log('log', log)

    // const initial = multiply(log, '.5');
    // const initialSq = multiply(initial, initial);
    // // let x = multiply(multiply(multiply(number, '0.5'), multiply(initial, initial)), '.5');
    // // x = multiply(multiply(multiply(number, '0.5'), multiply(x, x)), '.5');
    // // const y = multiply(initial, subtract('1.5', x));


    // let guess = initial;
    // let difference = '0'
    // let lastDifference = number
    // let i = 0;

    // while (i < 10) {
    //     console.log('guess', guess)

    //     guess = roundOff(multiply(guess, subtract('1.5', roundOff(multiply(divide(number, 2, 33), pow(guess, 2, 33)), 33))), 33)
    //     console.log('newGuess', guess)

    //     // difference = abs(subtract(guess, newGuess))

    //     // if (greaterThan(difference, lastDifference)) {
    //     //     // console.log('root exit under p')
    //     //     return stripTrailingZero(roundOff(guess, 32 + 1))
    //     // }

    //     // if (lessThan(difference, tolerance(32 - 1))) {
    //     //     // console.log('newGuess exit under p')
    //     //     return stripTrailingZero(roundOff(guess, 32 + 1))
    //     // }

    //     // lastDifference = difference;
    //     // guess = newGuess;

    //     i++;
    // }

    // console.log('initial', initial)
    // console.log('initialSq', initialSq)
    // // console.log('x', x)
    // // console.log('y', y)

    // return guess

}

export function sqRoot(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 2, precision);
}

export function cbRoot(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 3, precision);
}

export function root4(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return sqRoot(sqRoot(base, precision), precision);
}

export function root5(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 5, precision);
}

export function root10(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return sqRoot(root5(base, precision), precision + 1);
}

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw Error('Root base of non-integers not supported');
    }
}


