import { add } from "./add";
import { lessThan, equals, greaterThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { pow } from "./pow";
import { roundOff } from "./round";
import { subtract } from "./subtract";
import { factorial, sigma, tolerance } from "./utils";

export const LN2 = ln('2');
export const LN2E = ln2(Euler(32));
export const LN10 = ln('10');
export const LN10E = log10(Euler(32));

export function Euler(precision: number = 32) {
    precision = Math.max(16, precision)
    return roundOff(sigma(0, precision, (n: string | number)=>{
        return divide('1', factorial(n), precision + 1)
    }), precision);
}

export function exp(exponent: number | string) {
    return pow(Euler(32), exponent)
}

export function expm1(exponent: number | string) {
    return subtract('1', pow(Euler(32), exponent))
}

export function ln(x: string | number = 2) {
    x = x.toString();
    if (lessThan(x, '0', true)) {
        throw "Error: x must be greater than 0";
    }

    if (equals(x, '1')) {
        return '0'; // ln(1) = 0
    }

    let result = '0';
    let term = divide(subtract(x, '1'), add(x, '1'), 33);
    let i = 0;
    while (true) {
        i++
        let iteration = subtract(multiply('2', i), '1');
        let next = multiply(divide('1', iteration, 33), pow(term, iteration))
        if (lessThan(next, tolerance(32)) || i == 100) {
            return roundOff(multiply('2', add(result, next)), 32)
        }
        result = add(result, next);
    }

    // return multiply('2', result)
}

export function ln2(x: string | number = 2) {
    x = x.toString();
    if (lessThan(x, '0', true)) {
        throw "Error: x must be greater than 0";
    }
    let result = '0';
    while (greaterThan(x, '2', true)) {
        x = divide(x, 2, 33);
        result = add(result, '1');
    }
    var fractionalPart = ln(x);
    return roundOff(add(result, divide(fractionalPart, LN2,33)), 32);
}

export function log(base: string | number) {
    return roundOff(multiply(ln2(base), LN10), 32)
}

export function log10(base: string | number) {
    return divide(log(base), LN10, 32)
}