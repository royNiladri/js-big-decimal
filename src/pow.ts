import { abs } from "./abs";
import { compareTo } from "./compareTo";
import { divide } from "./divide";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { root10 } from "./roots";
import { roundOff } from "./round";
import { RoundingModes } from "./roundingModes";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn } from "./subtract";


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

// Integer Exponent Only Implementation

export function pow(base: number | string, exponent: number | string, negate: boolean = false, percision: number | undefined = undefined) {

    exponent = exponent.toString();
    base = base.toString();

    const remainder = abs(modulus(exponent));
    const reciprical = exponent.includes('-');
    const isBase10 = compareTo(abs(base), '10') == 0;
    const negativeBase = base.includes('-');
    const negativeBase10 = isBase10 && negativeBase;
    const orderOrPercision = reciprical && compareTo(abs(exponent), '1') == -1 ? percision : Number(abs(exponent));
    const recipricalPercision = isBase10 ? orderOrPercision : percision;

    let fractionalExponent = '1';
    let result = '1';

    if (negativeBase10) {
        base = abs(base);
        negate = !negate;
    }

    if (compareTo(remainder, '0') == 1) {

        if(negativeBase && !negativeBase10){
            negate = !negate
        }

        const mantissa = remainder.split('.').pop();
        const spread: string[] = [];

        for (let i = 0; i < mantissa.length; i++) {
            if (!spread[0]) {
                spread.push(root10(abs(base)))
            } else {
                spread.push(root10(spread[i - 1]))
            }
        }

        fractionalExponent = spread.reduce((p: string | number, c: string | number, i: number) => {
            return multiply(p, pow(c, mantissa[i]));
        }, fractionalExponent)
    }

    exponent = abs(exponent)

    while (compareTo(exponent, '0') == 1) {
        if (modulus(exponent, 2) == '1') { result = multiply(result, base) }
        base = multiply(base, base);
        exponent = roundOff(divide(exponent, 2), 0, RoundingModes.FLOOR);
    }

    result = multiply(result, fractionalExponent);
    result = (percision) ? roundOff(result, percision) : result;
    result = (reciprical) ? divide(1, result, recipricalPercision) : result;
    return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
};