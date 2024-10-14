import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { exp } from "./logarithm";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { pow, sqRoot } from "./pow";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate, subtract } from "./subtract";
import { alternatingSeries, factorial, isAproxOne, isAproxZero, sign, tolerance } from "./utils";

// PI up to the first 64 decimal places
export const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229'

// Hypotenuse 
export function hypot(a: number | string, b: number | string) {
    a = a.toString();
    b = b.toString();
    return sqRoot(add(pow(a, '2'), add(pow(b, '2'))));
}

// Sine functions
export function sin(x: number | string) {
    x = x.toString();

    if (greaterThan(abs(x), PI)) {
        let r = divide(x, PI, 33).split('.')
        x = stripTrailingZero(roundOff(multiply(pow(negate(sign(x).toString()), r[0]), multiply(PI, (r[1]) ? '0.' + r[1] : '0')), 32));
    }

    let result = '0';
    let _sign = '1';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product

    while (true) {
        const N = subtract(multiply(n, '2'), '1'); // Next real term in series (even terms cancel)
        f = multiply(f, N);

        const next = multiply(_sign, divide(pow(x, N, 33), f, 34));

        if (lessThan(abs(next), tolerance(33))) {
            result = add(result, next);
            return stripTrailingZero(isAproxZero(result) ? '0' : isAproxOne(result) ? multiply('1', sign(result).toString()) : result);
        }
        result = add(result, next);
        _sign = negate(_sign)
        f = multiply(f, multiply(n, '2')); // Iterate once to synchronize Factorial
        n = add(n, '1');
    }
}

export function asin(x: number | string) {
    x = x.toString();
    if (greaterThan(abs(x), '1')) {
        throw Error('[Arcsine]: argument x is out of range.')
    }
    let result = '0';
    let n = '1';
    let even = '1';
    let odd = '1';
    while (true) {
        const N = multiply(n, '2');
        const R = add(N, '1');

        even = multiply(even, N);
        odd = multiply(odd, subtract(N, '1'));
        let next = divide(multiply(odd, pow(x, R)), multiply(even, R), 34);

        if (lessThan(next, tolerance(33))) {
            result = add(result, next);
            return stripTrailingZero(roundOff(add(result, x), 32));
        }

        result = add(result, next);
        n = add(n, '1');
    }
}

export function sinh(x: number | string) {
    x = x.toString();
    return stripTrailingZero(subtract(divide(exp(x), '2', 33), divide(exp(negate(x)), '2', 33)));
}

// Cosine functions

export function cos(x: number | string) {
    x = x.toString();

    if (greaterThan(abs(x), PI)) {
        let r = divide(x, PI, 33).split('.')
        x = stripTrailingZero(roundOff(multiply(pow(negate(sign(x).toString()), r[0]), multiply(PI, (r[1]) ? '0.' + r[1] : '0')), 32));
    }

    let result = '0';
    let _sign = '1';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product

    while (true) {
        const N = multiply(n, '2'); // Next real term in series (odd terms cancel)
        f = multiply(f, subtract(N, '1')); // Iterate once to synchronize Factorial
        f = multiply(f, N);

        const next = multiply(_sign, divide(pow(x, N, 33), f, 34));

        if (lessThan(abs(next), tolerance(33))) {
            result = subtract('1',add(result, next));
            return stripTrailingZero(isAproxOne(result) ? multiply('1', sign(result).toString()) : isAproxZero(result) ? '0' : result);
        }
        result = add(result, next);
        _sign = negate(_sign)
        n = add(n, '1');
    }
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
    return stripTrailingZero(divide(add(exp(x), exp(negate(x))), '2', 32));
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
    let n = '0';
    while (true) {
        let N = multiply('2', n);
        let next = divide(multiply(pow('-1', n), pow(x, add(N, '1'))), add(N, '1'), 32)
        if (lessThan(abs(next), tolerance(33))) {
            return stripTrailingZero(roundOff(add(result, next), 32));
        }
        result = add(result, next);
        n = add(n, '1');
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