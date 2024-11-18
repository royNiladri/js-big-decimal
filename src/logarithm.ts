import { abs } from "./abs";
import { add } from "./add";
import { lessThan, equals, greaterThan } from "./compareTo";
import { E, LN10, LN2 } from "./constants";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { intPow, pow } from "./pow";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { subtract } from "./subtract";
import { testTolerance } from "./utils";
import { validateGTZero } from "./validators";

export function Euler(precision: number = 64) {
    precision = Math.max(16, precision)
    let result = '1';
    let n = '1';
    let f = '1';
    while (true) {
        f = multiply(f, n);
        const next = divide('1', f, precision + 3)
        if (testTolerance(abs(next), precision)) {
            return stripTrailingZero(roundOff(result, precision));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}

export function exp(exponent: string) {
    return pow(E, exponent, 64);
}

export function expm1(exponent: string) {
    return subtract(exp(exponent), '1')
}

export function ln(x: string = '2') {
    validateGTZero(x, 'ln');

    if (equals(x, '1')) {
        return '0'; // ln(1) = 0
    }

    const term = stripTrailingZero(divide(subtract(x, '1'), add(x, '1'), 68));
    const f = stripTrailingZero(intPow(term, '2'));
    let t = stripTrailingZero(intPow(term, '1'));
    let result = '0';
    let i = 0;
    while (true) {
        i++;
        let iteration = subtract(multiply('2', i.toString()), '1');
        let next = stripTrailingZero(roundOff(multiply(divide('1', iteration, 64 + 2), t), 1024 + 4));
        if (testTolerance(next, 64)) {
            return stripTrailingZero(roundOff(multiply('2', add(result, next)), 64));
        }
        t = stripTrailingZero(roundOff(multiply(t, f), 64 + 2));
        result = add(result, next);
    }

}

export function ln2(x: string = '2') {
    validateGTZero(x, 'ln2');

    let result = '0';
    while (greaterThan(x, '2', true)) {
        x = stripTrailingZero(divide(x, '2', 68));
        result = add(result, '1');
    }
    return roundOff(add(result, divide(ln(x), LN2, 68)), 64);
}

export function log(base: string) {
    return roundOff(multiply(ln2(base), LN2), 64);
}

export function log10(base: string) {
    return roundOff(divide(ln(base), LN10, 64 + 2), 64);
}