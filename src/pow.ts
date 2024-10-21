import { abs } from "./abs";
import { equals, greaterThan, isEven, isExatclyOne, isExatclyZero, isOdd, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn, subtract } from "./subtract";
import { add } from "./add";
import { isAproxOne, isAproxZero, sign, tolerance } from "./utils";
import { RoundingModes } from "./roundingModes";
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

export function pow(base: number | string, exponent: number | string, precision: number | undefined = 32, negate: boolean | undefined = false): string {


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
    let result: string;

    if (equals(abs(base), '10')) {
        result = (negativeExponent) ? `0.${new Array(Number(abs(exponentParts[0])) - 1).join('0')}1` : `1${new Array(exponentParts[0]).join('0')}`
    } else {
        result = intPow(abs(base), abs(exponentParts[0]))
    }

    if (exponentSignificand) {

        if (negativeBase) {
            negate = !negate
        }

        let minPrecision = Math.max(parseInt(multiply(base.length.toString(), roundOff(exponent, 0, RoundingModes.CEILING))),base.length)
        precision = Math.max(precision, 32);

        let tempBase = base;

        for (let i = 0; i < exponentSignificand.length; i++) {
            const significandDigit = exponentSignificand[i];

            if (isOdd(significandDigit)) {
                switch (significandDigit) {
                    case '9':
                        fractionalExponent = multiply(fractionalExponent, multiply(intPow(nthRoot(tempBase, 5, minPrecision + i), '2'), nthRoot(tempBase, 2, minPrecision))) // (2 * 2) + 5 = 9
                        break;
                    case '7':
                        fractionalExponent = multiply(fractionalExponent, multiply(nthRoot(tempBase, 5, minPrecision + i), nthRoot(tempBase, 2, minPrecision))) // 2 + 5 = 7
                        break;
                    case '5':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, 2, minPrecision)) // 5
                        break;
                    case '3':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, 3, minPrecision))
                        break;
                    case '1':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(nthRoot(tempBase, 5, minPrecision + i), 2, minPrecision)) // 2 / 2 = 1
                        break;
                }

            }

            if (isEven(significandDigit)) {
                switch (significandDigit) {
                    case '8':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i), '4')) // 2 * 4 = 8
                        break;
                    case '6':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i), '3')) // 2 * 3 = 6
                        break;
                    case '4':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, 5, minPrecision + i), '2')) // 2 * 2 = 4
                        break;
                    case '2':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, 5, minPrecision + i)) // 2
                        break;
                    case '0':
                        break;
                }
            }

            if(i < exponentSignificand.length - 1 ) tempBase = nthRoot(nthRoot(tempBase, 5, minPrecision + i), 2, minPrecision);
        }

        return finalize(multiply(result, fractionalExponent));

    } else {
        return finalize(result);
    }

};

export function intPow(base: string, exponent: string) {
    let exp = parseInt(abs(exponent))
    let result = '1';

    while (exp > 0) {
        if (exp % 2) { result = multiply(result, base) }
        base = multiply(base, base);
        exp = exp >> 1;
    }

    return result
}

export function nthRoot(x: number | string, n: number | string, precision = 8) {

    x = x.toString();
    n = n.toString();

    validate(n);

    const initialGuess = () => {
        let _x = BigInt(roundOff(x));
        let _n = BigInt(n);
        let _guess = BigInt('1');

        while (_x > _n) {
            _x = _x >> _n
            _guess = _guess << BigInt('1');
        }

        return _guess.toString();
    }

    if (lessThan(n, '5', true)) {
        let guess = initialGuess();
        let nMinusOne = subtract(n, 1);
        let difference = '0'
        let lastDifference = x
        let i = 4;
        while (true) {

            let newGuess = divide(add(stripTrailingZero(divide(x, intPow(guess, nMinusOne), precision + i + 2)), multiply(guess, nMinusOne)), n, precision + i);

            difference = abs(subtract(guess, newGuess))

            if (lessThan(difference, '1') && greaterThan(difference, lastDifference)) {
                return roundOff(bisectionRoot(x, n, newGuess, precision + 2), precision + 2);
            }

            if (lessThan(difference, tolerance(precision + 2))) {
                return stripTrailingZero(roundOff(newGuess, precision + 2))
            }

            lastDifference = difference;
            guess = stripTrailingZero(newGuess);

            i++;
        }
    } else {
        return bisectionRoot(x, n, x, precision + 2);
    }

}

export function bisectionRoot(x: string, n: string, g: string, precision = 32) {

    const f0 = (v: string, n: string, x: string) => {
        return stripTrailingZero(subtract(intPow(v, n), x));
    }

    const f1 = (x: string, n: string) => {
        return stripTrailingZero(multiply(n, intPow(x, subtract(n, '1'))));
    }

    let left = negateFn(g);
    let right = g;
    let v: string;
    let prevV0 = '0';
    while (true) {
        v = stripTrailingZero(divide(add(left, right), 2, precision + 4));
        const v0 = f0(v, n, x);
        const v1 = f1(v, n);
        if (lessThan(multiply(v0, v1), '0', true)) {
            left = stripTrailingZero(v);
        } else {
            right = stripTrailingZero(v);
        }

        if ((lessThan(abs(v0), tolerance(precision)) && greaterThan(abs(v0), '0', true)) || equals(abs(v0), prevV0)) {
            return stripTrailingZero(roundOff(v, precision + 2));
        }

        prevV0 = abs(v0)

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
    return sqRoot(sqRoot(base, precision + 4), precision);
}

export function root5(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 5, precision);
}

export function root10(base: string | number, precision = 32) {
    precision = Math.max(precision, 32);
    return nthRoot(base, 10, precision);
    // return sqRoot(root5(base, precision + 4), precision + 2);
}

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw Error('Root base of non-integers not supported');
    }
}


