import { abs } from "./abs";
import { compareTo } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { RoundingModes } from "./roundingModes";
import { negate as negateFn, subtract } from "./subtract";

export type ExponentErrorOrException = {
    message: string,
    type: 'error' | 'exception',
}

export const NonIntegerExponentError: ExponentErrorOrException = {
    message: `Exponent must be an integer.`,
    type: 'error',
}

export const ComplexExponentException: ExponentErrorOrException = {
    message: `Result is a Complex number with only an Imaginary component.`,
    type: 'exception',
}




/**
 * Calculates the power of a given base raised to an integer exponent
 * 
 * @param base - Base number
 * @param exponent - Exponent integer
 * @param negate - If set to true, parameters will be evaluated as `-(x ^ n)`
 * 
 * @returns The resulting power as a string
 * 
 * @throws {NonIntegerExponentError} - If `exponent` is a non-integer number, this error is thrown.
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

export function intPow(base: number|string, exponent: number|string, negate: boolean = false) {


    let e = Number(exponent);

    exponent = exponent.toString();
    base = base.toString();

    try {
        if (exponent.includes('.')) {
            throw NonIntegerExponentError
        }

        // Special Handling of Complex numbers

        // const imaginary = exponent < 0 && Number(remainder) > 0 && Number(remainder) < 1;

        // if (imaginary) {
        //     throw ComplexExponentException
        // }

    } catch (errorOrException) {
        errorOrException = <ExponentErrorOrException>errorOrException
        switch (errorOrException.type) {
            case 'error':
                const error = Error(`${errorOrException.message}`)
                console.error(error)
                throw error
            // case 'exception': // For Complex nunmbers 
            //     console.error(`Exception(${errorOrException.severity}): ${errorOrException.message}`)
            //     return NaN // Todo: Break or continue
        }
    }

    const reciprical = compareTo(exponent, '0') == -1;
    const base10Percision = compareTo(base, '10') == 0 ? exponent.length : undefined;

    let result = '1';

    while (e > 0) {
        if (e & 1)
            result = multiply(result, base);
            base = multiply(base, base);
        e >>= 1;
    }

    result = (reciprical) ? divide(1, result, base10Percision) : result;
    return (negate) ? negateFn(result) : result;
};

// Todo: Core Powers function
// Needs Nth-Root implementation for fractional powers

// export function pow(x: number, n: number, negate: boolean = false) {

//     const reciprical = n < 0;
//     const percision = x == 10 && n >= 1 ? Math.abs(n) : undefined

//     const exp = abs(n);
//     const floor = roundOff(exp, 0, RoundingModes.FLOOR);
//     const remainder = subtract(exp, floor);
//     const imaginary = x < 0 && Number(remainder) > 0 && Number(remainder) < 1;

//     try {
//         if (imaginary) {
//             x = Math.abs(x);
//             negate = true;
//             throw `Complex Number Exception: Cannot calculate powers resulting in Imaginary Numbers. Base will be subsituted with it's absolute value, and result will be negated.`;
//         }
//     } catch (warning) {
//         console.warn(warning);
//     }

//     const base = x;

//     let result = x.toString();

//     if (Number(remainder) > 0 && Number(remainder) < 1) {
//         const factor = divide(1, remainder, 3);
//         const root = nthRoot(x, Number(factor));

//         if (Number(floor) > 0) {
//             for (let i = 0; i < Number(floor) - 1; i++) {
//                 result = multiply(result, base);
//             }
//         } else {
//             result = '1';
//         }

//         result = multiply(result, root);
//     } else if (n == 0) {
//         result = '1';
//     } else {
//         for (let i = 0; i < Number(exp) - 1; i++) {
//             result = multiply(result, base);
//         }
//     }
//     result = negate ? negateFn(result) : result;
//     result = reciprical ? divide(1, result, percision) : result;
//     return result;
// };