import { abs } from "./abs";
import { compareTo, equals, greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { RoundingModes } from "./roundingModes";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn, subtract } from "./subtract";
import { add } from "./add";
import { tolerance } from "./utils";

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

    const remainder = exponent.split('.')[1];
    const reciprical = exponent.includes('-');
    const negativeBase = base.includes('-');
    const isBase10 = equals(abs(base), '10');
    const negativeBase10 = isBase10 && negativeBase;
    const orderOrprecision = reciprical && lessThan(abs(exponent), '1') ? precision : Number(abs(exponent));
    const recipricalprecision = isBase10 ? orderOrprecision : precision;

    let fractionalExponent = '1';
    let result = '1';

    if (negativeBase10) {
        base = abs(base);
        negate = !negate;
    }

    if (remainder) {

        if (negativeBase && !negativeBase10) {
            negate = !negate
        }

        precision = 32;
        let tempBase = root10(abs(base));

        for (let i = 0; i < remainder.length; i++) {
            fractionalExponent = multiply(fractionalExponent, pow(tempBase, remainder[i]))
            tempBase = root10(tempBase)
        }

    }

    exponent = abs(exponent.split('.')[0])

    while (greaterThan(exponent, '0')) {
        if (equals(modulus(exponent, 2), '1')) { result = multiply(result, base) }
        base = multiply(base, base);
        exponent = roundOff(divide(exponent, 2), 0, RoundingModes.FLOOR);
    }

    result = multiply(result, fractionalExponent);
    result = (precision) ? roundOff(result, precision) : result;
    result = (reciprical) ? divide(1, result, recipricalprecision) : result;
    return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
};

export function nthRoot(x: number | string, n: number | string, precision = 8) {

    x = x.toString();
    n = n.toString();

    validate(n);

    let guess = '1';
    let nMinusOne = subtract(n, 1);
    let precisionMax = Number(multiply(precision + 1, 2));

    let i = 0;
    while (i < precisionMax) {

        let newGuess = divide(add(stripTrailingZero(divide(x, pow(guess, nMinusOne), precision + 2)), multiply(guess, nMinusOne)), n, precision + 2);

        if (lessThan(newGuess, tolerance(precision - 1))) {
            return stripTrailingZero(roundOff(newGuess, precision + 1))
        }

        guess = stripTrailingZero(newGuess);

        i++;
    }

    return stripTrailingZero(roundOff(guess, precision + 1))
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
    return sqRoot(root5(base, precision), precision);
}

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw Error('Root base of non-integers not supported');
    }
}


