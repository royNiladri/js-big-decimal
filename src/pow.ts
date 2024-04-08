import { abs } from "./abs";
import { compareTo, greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { RoundingModes } from "./roundingModes";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate as negateFn, subtract } from "./subtract";
import { add } from "./add";
import { Euler, tolerance } from "./utils";


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

export function pow(base: number | string, exponent: number | string, percision: number | undefined = undefined, negate: boolean  | undefined = false):string {

    exponent = exponent.toString();
    base = base.toString();

    if(isExatclyZero(exponent)){
        return '1'
    }

    if(!exponent.includes('-') && isExatclyOne(exponent)){
        return base
    }

    if(isExatclyZero(base) && exponent.includes('-') && isExatclyOne(exponent)){
        throw Error('0^(-1) is undefined');
    }

    const remainder = abs(modulus(exponent));
    const reciprical = exponent.includes('-');
    const negativeBase = base.includes('-');
    const isBase10 = compareTo(abs(base), '10') == 0;
    const negativeBase10 = isBase10 && negativeBase;
    const orderOrPercision = reciprical && compareTo(abs(exponent), '1') == -1 ? percision : Number(abs(exponent));
    const recipricalPercision = isBase10 ? orderOrPercision : percision;

    let fractionalExponent = '1';
    let result = '1';

    if (negativeBase10) {
        base = abs(base);
        negate = !negate;
    }

    if (!isExatclyZero(remainder)) {

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

    while (greaterThan(exponent, '0')) {
        if (isExatclyOne(modulus(exponent, 2))) { result = multiply(result, base) }
        base = multiply(base, base);
        exponent = roundOff(divide(exponent, 2), 0, RoundingModes.FLOOR);
    }

    result = multiply(result, fractionalExponent);
    result = (percision) ? roundOff(result, percision) : result;
    result = (reciprical) ? divide(1, result, recipricalPercision) : result;
    return (negate) ? stripTrailingZero(negateFn(result)) : stripTrailingZero(result);
};

export function nthRoot(x: number | string, n: number | string, percision = 8) {

    x = x.toString();
    n = n.toString();

    validate(n);

    let guess = '1';
    let nMinusOne = subtract(n, 1);
    let percisionMax = Number(multiply(percision + 1, 2));

    let i = 0;
    while (i < percisionMax) {

        let newGuess = divide(add(stripTrailingZero(divide(x, pow(guess, nMinusOne), percisionMax)), multiply(guess, nMinusOne)), n, percisionMax);

        if (lessThan(newGuess, tolerance(percision))) {
            return stripTrailingZero(roundOff(newGuess, percision + 1))
        }

        guess = stripTrailingZero(newGuess);

        i++;
    }

    return stripTrailingZero(roundOff(guess, percision + 1))
}

export function sqRoot(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return nthRoot(base, 2, percision);
}

export function cbRoot(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return nthRoot(base, 3, percision);
}

export function root4(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return sqRoot(sqRoot(base, percision), percision);
}

export function root5(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return nthRoot(base, 5, percision);
}

export function root10(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return sqRoot(root5(base, percision), percision);
}

export function exp(exponent: number | string){
    return pow(Euler(32),exponent)
} 

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw Error('Root base of non-integers not supported');
    }
}
