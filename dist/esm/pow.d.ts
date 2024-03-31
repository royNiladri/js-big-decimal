export type ExponentErrorOrException = {
    message: string;
    type: 'error' | 'exception';
};
export declare const NonIntegerExponentError: ExponentErrorOrException;
export declare const ComplexExponentException: ExponentErrorOrException;
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
export declare function pow(base: number | string, exponent: number | string, negate?: boolean): string;
