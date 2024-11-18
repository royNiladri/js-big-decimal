import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { PI, PI_DIV_2 } from "./constants";
import { divide } from "./divide";
import { exp } from "./logarithm";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { intPow, pow, sqRoot } from "./pow";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate, subtract } from "./subtract";
import { isAproxOne, isAproxZero, sign, testTolerance } from "./utils";
import { validateIsInRange } from "./validators";

// Hypotenuse 
export function hypot(a: string, b: string) {
    return sqRoot(add(intPow(a, '2'), add(intPow(b, '2'))));
}

// Sine functions
export function sin(x: string) {
    if (greaterThan(abs(x), PI)) {
        x = modulus(x, PI, 64);
    }

    let result = '0';
    let n = '1'; // Series iteration
    let f = '1'; // Factorial product
    let s = '-1'; // Alternating Sign

    while (true) {
        const N = subtract(multiply(n, '2'), '1'); // Next real term in series (even terms cancel)

        f = multiply(f, N);

        const next = multiply(s, divide(intPow(x, N), f, 68));

        if (testTolerance(abs(next), 64)) {
            result = add(result, next);
            return stripTrailingZero(isAproxZero(result) ? '0' : isAproxOne(result) ? multiply('1', sign(result).toString()) : result);
        }

        result = add(result, next);
        f = multiply(f, multiply(n, '2')); // Iterate once to synchronize Factorial
        n = add(n, '1');
        s = negate(s);

    }
}

export function asin(x: string) {
    validateIsInRange(x, 'asin');
    if(isExatclyOne(abs(x))) return roundOff(((sign(x) == 1)? PI_DIV_2: negate(PI_DIV_2)), 64);
    if(isExatclyZero(abs(x))) return '0';
    let result = '0';
    let n = '1';
    let p = '1';
    let k = '1';
    while (true) {
        const N = multiply(n, '2');
        const R = add(N, '1');

        p = multiply(p, N);
        k = multiply(k, subtract(N, '1'));

        let next = divide(multiply(k, intPow(x, R)), multiply(p, R), 68);
        

        if (testTolerance(next, 64)) {
            result = add(result, next);
            return stripTrailingZero(roundOff(add(result, x), 64));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}

export function sinh(x: string) {
    return stripTrailingZero(roundOff(subtract(divide(exp(x), '2', 68), divide(exp(negate(x)), '2', 68)), 64));
}

// Cosine functions

export function cos(x: string) {
    if (greaterThan(abs(x), PI)) {
        x = modulus(add(x, PI_DIV_2), PI, 64);
    }

    return sin(x);
}

export function acos(x: string) {
    validateIsInRange(x, 'acos');
    return stripTrailingZero(roundOff(subtract(PI_DIV_2, asin(x)), 64));
}

export function cosh(x: string) {
    return stripTrailingZero(roundOff(divide(add(exp(x), exp(negate(x))), '2', 68), 64));
}

// Tangant functions

export function tan(x: string) {
    return stripTrailingZero(roundOff(divide(sin(x), cos(x), 68), 64));
}

export function atan(x: string) {
    if (greaterThan(abs(x), '1')) {
        return stripTrailingZero(subtract(PI_DIV_2, atan(divide('1', x, 68))));
    }
    let result = '0';
    let n = '0';
    while (true) {
        let N = multiply('2', n);
        let next = divide(multiply(intPow('-1', n), intPow(x, add(N, '1'))), add(N, '1'), 68)
        if (testTolerance(abs(next), 64)) {
            return stripTrailingZero(roundOff(add(result, next), 64));
        }
        result = add(result, next);
        n = add(n, '1');
    }
}

export function atan2(y: string, x: string) {
    let offset = '0';

    if (isExatclyZero(x) && isExatclyZero(y)) {
        return '0';
    }

    if (isExatclyZero(x) && greaterThan(y, '0')) {
        return stripTrailingZero(roundOff(PI_DIV_2, 64));
    }

    if (isExatclyZero(x) && lessThan(y, '0')) {
        return stripTrailingZero(roundOff(negate(PI_DIV_2), 64));
    }

    if (lessThan(x, '0')) {
        offset = (greaterThan(y, '0', true)) ? PI : negate(PI);
    }

    return stripTrailingZero(roundOff(add(atan(divide(y, x, 68)), offset), 64));

}

export function tanh(x: string) {
    return stripTrailingZero(roundOff(divide(sinh(x), cosh(x), 68), 64));
}