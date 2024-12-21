import { abs } from "./abs";
import { equals, greaterThan, isEven, isExatclyOne, isExatclyZero, isOdd, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn, subtract } from "./subtract";
import { add } from "./add";
import { testTolerance, tolerance } from "./utils";
import { RoundingModes } from "./roundingModes";
import { validateInteger } from "./validators";

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

export function pow(base: string, exponent: string, precision: number = 32, negate: boolean = false): string {

    if (isExatclyZero(exponent)) {
        return '1'
    }

    if (!exponent.includes('-') && isExatclyOne(exponent)) {
        return base
    }

    if (isExatclyZero(base) && exponent.includes('-') && isExatclyOne(abs(exponent))) {
        throw Error('0^(-1) is undefined');
    }

    const finalize = (result: string) => {
        result = (negativeExponent) ? divide('1', result, precision + 1) : result;
        result = (precision) ? roundOff(result, precision) : result;
        return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
    };

    const negativeBase = base.includes('-');

    const negativeExponent = exponent.includes('-');
    const exponentParts = exponent.split('.');
    const exponentSignificand = exponentParts[1];

    let fractionalExponent = '1';
    let result: string = '1';

    if (equals(abs(base), '10') && !exponentSignificand) {
        result = tolerance(negateFn(exponentParts[0]));
        return (negativeBase) ? '-' + result : result;
    } else {
        result = intPow(base, abs(exponentParts[0]))
    }

    if (exponentSignificand) {

        if (negativeBase) {
            negate = !negate
        }

        precision = Math.max(precision, 32);
        let minPrecision = base.length * Math.ceil(parseFloat(abs(exponent))) + precision;

        let tempBase = abs(base);

        for (let i = 0; i < exponentSignificand.length; i++) {
            if (isOdd(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '9':
                        fractionalExponent = multiply(fractionalExponent, multiply(intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '2'), nthRoot(tempBase, '2', minPrecision + i + 1))) // (2 * 2) + 5 = 9
                        break;
                    case '7':
                        fractionalExponent = multiply(fractionalExponent, multiply(nthRoot(tempBase, '5', minPrecision + i + 1), nthRoot(tempBase, '2', minPrecision + i + 1))) // 2 + 5 = 7
                        break;
                    case '5':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '2', minPrecision + i + 1)) // 5
                        break;
                    case '3':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '10', minPrecision + i + 1), '3')) // 1 * 3 = 3
                        break;
                    case '1':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '10', minPrecision + i + 1)) // 2 / 2 = 1
                        break;
                }

            }

            if (isEven(exponentSignificand[i])) {
                switch (exponentSignificand[i]) {
                    case '8':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '4')) // 2 * 4 = 8
                        break;
                    case '6':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '3')) // 2 * 3 = 6
                        break;
                    case '4':
                        fractionalExponent = multiply(fractionalExponent, intPow(nthRoot(tempBase, '5', minPrecision + i + 1), '2')) // 2 * 2 = 4
                        break;
                    case '2':
                        fractionalExponent = multiply(fractionalExponent, nthRoot(tempBase, '5', minPrecision + i + 1)) // 2
                        break;
                    case '0':
                        break;
                }
            }

            if (i < exponentSignificand.length - 1) tempBase = nthRoot(tempBase, '10', minPrecision + i + 2);
        }

        // console.log(fractionalExponent)

        return finalize(multiply(result, fractionalExponent));

    } else {
        return finalize(result);
    }

};

export function intPow(base: string, exponent: string) {

    validateInteger(exponent, 'intPow exponent');

    exponent = abs(exponent);

    let negative = '';

    exponent = abs(exponent);

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
        result = (result.substring(0, result.length - decimalLength) || '0') + '.' + result.substring(result.length - decimalLength).padStart(decimalLength, '0')
    }

    return negative + result

}

export function nthRoot(x: string, n: string, precision = 16) {

    x = x.toString();
    n = n.toString();

    validateInteger(n, 'nthRoot n');

    const initialGuess = () => {
        let _x = BigInt(roundOff(x));
        let _n = BigInt(n);
        let _guess = 1n;

        while (_x > _n) {
            _x = _x >> _n
            _guess = _guess << 1n;
        }

        return _guess.toString();
    }


    let guess = initialGuess();
    let nMinusOne = subtract(n, '1');
    let difference = '0'
    let lastDifference = abs(x)
    let i = 4;

    while (true) {
        let newGuess = stripTrailingZero(divide(add(stripTrailingZero(divide(x, intPow(guess, nMinusOne), precision + i + 2)), multiply(guess, nMinusOne)), n, precision + i + 1));
        difference = stripTrailingZero(abs(subtract(guess, newGuess)))
        // console.log(newGuess)
        // console.log(difference)

        if (greaterThan(difference, lastDifference)) {
            return stripTrailingZero(roundOff(bisectionRoot(x, n, newGuess, precision + i), precision));
        }

        if (testTolerance(difference, precision + i)) {
            return stripTrailingZero(roundOff(newGuess, precision))
        }

        lastDifference = difference;
        guess = stripTrailingZero(newGuess);

        i++;
    }


}

export function bisectionRoot(x: string, n: string, g: string, precision = 32) {

    const f0 = (v: string, n: string, x: string) => {
        return stripTrailingZero(subtract(intPow(v, n), x));
    }

    const f1 = (x: string, n: string) => {
        return stripTrailingZero(multiply(n, intPow(x, subtract(n, '1'))));
    }

    // const threshold = tolerance(precision)
    let left = negateFn(g);
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
        } else {
            right = stripTrailingZero(v);
        }

        v0 = abs(v0);

        // console.log(v)

        if (testTolerance(v0, precision) || equals(v0, prevV0)) {
            return stripTrailingZero(v);
        }
        // console.log(v)

        prevV0 = v0
        i++;

    }

}

export function inverseSqRoot(x: string, precision = 32) {

    const initialGuess = () => {
        let _x = BigInt(roundOff(x));
        let _guess = 1n;

        while (_x > 1n) {
            _x = _x >> 1n
            _guess = _guess << 1n;
        }

        return _guess.toString();
    }

    x = abs(x);

    let guess = initialGuess();
    let difference = '0'
    let lastDifference = x
    let i = 0;

    while (true) {
        let newGuess = roundOff(multiply(guess, subtract('1.5', roundOff(multiply(multiply(x, '.5'), multiply(guess, guess)), precision + 8))), precision + 4)

        difference = abs(subtract(guess, newGuess))

        if (greaterThan(difference, lastDifference)) {
            return stripTrailingZero(roundOff(bisectionRoot(x, '2', newGuess, precision + i), precision));
        }

        if (testTolerance(difference, precision)) {
            return stripTrailingZero(roundOff(guess, precision))
        }

        lastDifference = difference;
        guess = newGuess;

        i++;
    }

}

export function sqRoot(x: string, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(roundOff(multiply(x, inverseSqRoot(x, precision + 4)), precision));
}

export function cbRoot(base: string, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(nthRoot(base, '3', precision));
}

export function root4(base: string, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(sqRoot(sqRoot(base, precision + 4), precision));
}

export function root5(base: string, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(nthRoot(base, '5', precision));
}

export function root10(base: string, precision = 32) {
    precision = Math.max(precision, 32);
    return stripTrailingZero(nthRoot(base, '10', precision));
}


