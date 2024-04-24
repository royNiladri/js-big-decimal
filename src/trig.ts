import { abs } from "./abs";
import { add } from "./add";
import { equals, greaterThan, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { exp } from "./logarithm";
import { multiply } from "./multiply";
import { pow, sqRoot } from "./pow";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate, subtract } from "./subtract";
import { alternatingSeries, factorial, isAproxOne, isAproxZero, sign, tolerance } from "./utils";

// PI up to the first 64 decimal places
export const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229'

// Hypotenuse 
export function hypot(a: number | string, b: number | string){
    return sqRoot(add(pow(a, '2'), add(pow(b, '2'))));
}

// Sine functions
export function sin(x: number | string) {
    x = x.toString();
    let s = roundOff(alternatingSeries(1, 32, (n: number) => {
        const N = (n * 2) - 1;
        return divide(pow(x, N, 32), factorial(N), 33);
    }), 32);
    return stripTrailingZero(isAproxZero(s) ? '0' : isAproxOne(s) ? multiply('1', sign(s)) : s);
}

export function asin(x: number | string) {
    x = x.toString();
    if (greaterThan(abs(x), '1')) {
        throw Error('[Arcsine]: argument x is out of range.')
    }
    let result = '0';
    let i = 0;
    while (true) {
        let n = multiply('2', i);
        let next = multiply(divide(factorial(n), multiply(pow('2', n), pow(factorial(i), 2)), 32), divide(pow(x, add(n, '1')), add(n, '1'), 32));
        if (lessThan(next, tolerance(33))) {
            return stripTrailingZero(roundOff(add(result, next), 32));
        }
        result = add(result, next);
        i++
    }
}

export function sinh(x: number | string) {
    x = x.toString();
    return stripTrailingZero(multiply('0.5', subtract(exp(x), exp(negate(x)))));
}

// Cosine functions

export function cos(x: number | string) {
    x = x.toString();
    let s = subtract('1', roundOff(alternatingSeries(1, 32, (n: number) => {
        const N = (n * 2);
        return divide(pow(x, N), factorial(N), 33);
    }), 32));
    return stripTrailingZero(isAproxOne(s) ? multiply('1', sign(s)) : isAproxZero(s) ? '0' : s);
}

export function acos(x: number | string) {
    x = x.toString();
    if (greaterThan(abs(x), '1')) {
        throw Error('[Arccosine]: argument x is out of range.')
    }
    return stripTrailingZero(subtract(divide(PI, 2, 32), asin(x)));
}

export function cosh(x: number | string) {
    x = x.toString();
    return stripTrailingZero(multiply('0.5', add(exp(x), exp(negate(x)))));
}

// Tangant functions

export function tan(x: number | string) {
    x = x.toString();
    return stripTrailingZero(divide(sin(x), cos(x), 32));
}

export function atan(x: number | string) {
    x = x.toString();

    if (greaterThan(abs(x), '1')) {
        return stripTrailingZero(subtract(divide(PI, 2, 33), atan(divide(1, x, 33))));
    }

    let result = '0';
    let i = 0;
    while (true) {
        let n = multiply('2', i);
        let next = divide(multiply(pow('-1', i), pow(x, add(n, '1'))), add(n, '1'), 32)
        if (lessThan(abs(next), tolerance(33))) {
            return stripTrailingZero(roundOff(add(result, next), 32));
        }
        result = add(result, next);
        i++
    }
}

export function atan2(y: number | string, x: number | string) {
    x = x.toString();
    y = y.toString();

    let offset = '0';

    if (isExatclyZero(x) && isExatclyZero(y)) {
        return '0';
    }

    if (isExatclyZero(x) && greaterThan(y, '0')) {
        return stripTrailingZero(roundOff(divide(PI, 2, 33), 32));
    }

    if (isExatclyZero(x) && lessThan(y, '0')) {
        return stripTrailingZero(roundOff(negate(divide(PI, 2, 33)), 32));
    }

    if (lessThan(x, '0')) {
        offset = (greaterThan(y, '0', true)) ? PI : negate(PI);
    }

    return stripTrailingZero(roundOff(add(atan(divide(y, x, 33)), offset), 32));

}

export function tanh(x: number | string) {
    x = x.toString();
    return stripTrailingZero(divide(sinh(x), cosh(x), 32));
}