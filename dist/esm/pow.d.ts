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
export declare function pow(base: number | string, exponent: number | string, precision?: number | undefined, negate?: boolean | undefined): string;
export declare function intPow(base: string, exponent: string): string;
export declare function nthRoot(x: number | string, n: number | string, precision?: number, t?: number): string;
export declare function bisectionRoot(x: string, n: string, g: string, precision?: number): string;
export declare function inverseSqRoot(number: string): string;
export declare function sqRoot(base: string | number, precision?: number): string;
export declare function cbRoot(base: string | number, precision?: number): string;
export declare function root4(base: string | number, precision?: number): string;
export declare function root5(base: string | number, precision?: number): string;
export declare function root10(base: string | number, precision?: number): string;
