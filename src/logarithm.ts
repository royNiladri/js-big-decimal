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
import { E_ROOTS_FOR_POW } from "./tables/e";
import { testTolerance } from "./utils";

export function Euler(precision: number = 32) {
    precision = Math.max(16, precision)
    let result = '1';
    let n = '1';
    let f = '1';
    while (true) {
        f = multiply(f, n);
        const next = divide('1', f, precision + 3)
        if (testTolerance(abs(next), precision)) {
            return stripTrailingZero(roundOff(result, 1024));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}

export function exp(exponent: number | string) {
    exponent = exponent.toString();
    const remainder = exponent.split('.')[1];
    let result = pow(E, abs(exponent).split('.')[0], 33);
    let fractionalExponent = '1';

    if (remainder) {
        for (let i = 0; i < Math.min(33, remainder.length); i++) {
            fractionalExponent = multiply(fractionalExponent, E_ROOTS_FOR_POW[i][remainder[i]])
        }
        result = multiply(result, fractionalExponent)
    }

    return pow(E, exponent, 33);
}

export function expm1(exponent: number | string) {
    exponent = exponent.toString();
    return subtract(exp(exponent), '1')
}

export function ln(x: string | number = 2) {
    x = x.toString();
    if (lessThan(x, '0', true)) {
        throw "[ln]: x must be greater than 0";
    }

    if (equals(x, '1')) {
        return '0'; // ln(1) = 0
    }

    let result = '0';
    let term = stripTrailingZero(divide(subtract(x, '1'), add(x, '1'), 64 + 2));
    let i = 0;

    if (lessThan(x, '2')) {
        while (true) {
            i++
            let iteration = subtract(multiply('2', i), '1');
            let next = divide(roundOff(intPow(term, iteration), 64 + 2), iteration, 64 + 2)
            if (testTolerance(next, 64)) {
                return roundOff(multiply('2', add(result, next)), 64);
            }
            result = add(result, next);
        }
    }

    let f = stripTrailingZero(pow(term, 2, 64 + 2));
    let t = stripTrailingZero(pow(term, 1, 64 + 2));
    while (true) {
        i++
        let iteration = subtract(multiply('2', i), '1');
        let next = roundOff(multiply(divide('1', iteration, 64 + 2), t), 1024 + 4);
        if (testTolerance(next, 64)) {
            return roundOff(multiply('2', add(result, next)), 64);
        }
        t = stripTrailingZero(roundOff(multiply(t, f), 64 + 2))
        result = add(result, next);
    }

}

export function ln2(x: string | number = 2) {
    x = x.toString();
    if (lessThan(x, '0', true)) {
        throw "[ln2]: x must be greater than 0";
    }
    let result = '0';
    while (greaterThan(x, '2', true)) {
        x = divide(x, 2, 64 + 2);
        result = add(result, '1');
    }
    return roundOff(add(result, divide(ln(x), LN2, 64 + 2)), 64);
}

export function log(base: string | number) {
    base = base.toString();
    return roundOff(multiply(ln2(base), LN2), 64);
}

export function log10(base: string | number) {
    base = base.toString();
    return roundOff(divide(ln(base), LN10, 64 + 2), 64);
}