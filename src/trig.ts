import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { PI, PI2, PI3_DIV_2_L, PI_DIV_2_H, PI_DIV_2_L, PI_DIV_4 } from "./constants";
import { divide } from "./divide";
import { exp } from "./logarithm";
import { modulus } from "./modulus";
import { multiply } from "./multiply";
import { intPow, sqRoot } from "./pow";
import { roundOff } from "./round";
import { factorial } from "./statistics";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate, subtract } from "./subtract";
import { sign, testTolerance, tolerance } from "./utils";
import { validateIsInRange } from "./validators";

// Hypotenuse 
export function hypot(a: string, b: string) {
    return sqRoot(add(intPow(a, '2'), add(intPow(b, '2'))));
}

// Sine functions
export function sin(x: string, precision = 64) {
    // const p = roundOff(multiply(PI, '2'), 132);
    if (greaterThan(abs(x), PI2)) {
        x = modulus(x, PI2, precision + 64);
    }

    let result = x;
    let n = '1'; // Series iteration
    let s = '-1';
    let r = x;

    while (true) {
        r = roundOff(multiply(multiply(r, x), x),  precision + 16)
        const N = add(multiply(n, '2'), '1'); // Next real term in series (even terms cancel)
        const next = roundOff(multiply(s, divide(r, factorial(N), precision + 12)), precision + 8);

        if (testTolerance(abs(next), precision + 4)) {
            result = add(result, next);
            return stripTrailingZero(roundOff(result, precision));
        }

        result = add(result, next);
        n = add(n, '1');
        s = negate(s);
    }
}

export function asin(x: string) {
    x = stripTrailingZero(x);
    validateIsInRange(x, 'asin');
    if (isExatclyOne(abs(x))) return roundOff(((sign(x) == 1) ? PI_DIV_2_H : negate(PI_DIV_2_H)), 64);
    if (isExatclyZero(abs(x))) return '0';
    return atan(divide(x, sqRoot(subtract('1', roundOff(multiply(x,x), 76)), 72), 68));
    // let result = '0';
    // let n = '1';
    // let u = '1';
    // let v = '1';
    // while (true) {

    //     const N = multiply(n, '2');
    //     const R = add(N, '1');

    //     u = multiply(u, N);
    //     v = multiply(v, subtract(N, '1'));

    //     let next = divide(multiply(v, intPow(x, R)), multiply(u, R), 68);

    //     if (testTolerance(next, 64)) {
    //         result = add(result, next);
    //         return stripTrailingZero(roundOff(add(result, x), 64));
    //     }

    //     result = add(result, next);

    //     if (greaterThan(abs(x), '.8')) return atan(divide(x, sqRoot(subtract('1', multiply(x,x)), 72), 68));
    //     n = add(n, '1');

    // }
}

// function asinEnhanced(x: string, theta = '0') {
//     console.warn(`[arcsine]: Value of ${x} is slow to calculate. Switching to alternative Newton approximation.`);

//     let lower = '-' + roundOff(PI_DIV_2_H, 68);
//     let upper = roundOff(PI_DIV_2_H, 68);
//     let step = roundOff(PI_DIV_4, 68);
//     let currentSin = sin(theta, 68);
//     let previousDifference = subtract(x, currentSin);

//     while (true) {
//         let difference = stripTrailingZero(subtract(x, currentSin));

//         if (testTolerance(abs(difference), 64)) {
//             return stripTrailingZero(roundOff(theta, 64))
//         }

//         if (lessThan(abs(previousDifference), abs(difference))) {
//             if (greaterThan(difference, '0')) {
//                 lower = theta;
//             } else {
//                 upper = theta;
//             }
//             theta = divide(add(lower, upper), '2', 68);
//         } else {
//             const cosTheta = sqRoot(multiply(subtract('1', currentSin), add('1', currentSin)), 68);
//             if (greaterThan(abs(cosTheta), tolerance(8))) {
//                 theta = add(theta, divide(difference, cosTheta, 68));
//             } else {
//                 theta = add(theta, multiply(step, sign(difference).toString()));
//             }
//         }

//         if (testTolerance(abs(difference), 64)) {
//             return stripTrailingZero(roundOff(theta, 64));
//         }

//         currentSin = sin(theta, 128);
//         step = multiply(abs(difference), '.5');
//         previousDifference = difference;
//     }

// }

export function sinh(x: string) {
    const e = exp(x);
    return stripTrailingZero(roundOff(multiply(subtract(e, divide('1', e, 68)), '.5'), 64));
    // return stripTrailingZero(roundOff(subtract(divide(exp(x), '2', 68), divide(exp(negate(x)), '2', 68)), 64));
}

// Cosine functions

export function cos(x: string, precision = 64) {
    let negative = '';
    x = modulus(x, PI2, precision + 4);
    if(lessThan(PI_DIV_2_L, abs(x), true) && lessThan(abs(x), PI3_DIV_2_L)) negative = '-';

    const s = sin(x, precision + 4);
    return negative + sqRoot(multiply(subtract('1', s), add('1', s)), 68);
}

export function acos(x: string) {
    x = stripTrailingZero(x);
    validateIsInRange(x, 'acos');
    // return stripTrailingZero(roundOff(multiply('2', atan(sqRoot(divide(subtract('1', x), add('1', x), 72), 68))), 64));
    return stripTrailingZero(roundOff(subtract(PI_DIV_2_H, asin(x)), 64));
}

export function cosh(x: string) {
    return stripTrailingZero(roundOff(divide(add(exp(x), exp(negate(x))), '2', 68), 64));
}

// Tangant functions

export function tan(x: string) {
    const {s, c} = cosAndSin(x, 68);
    return stripTrailingZero(roundOff(divide(s, c, 68), 64));
}

export function atan(x: string) {

    let i = 1;

    while(greaterThan(abs(x),'.05')){
        x = divide(x, add('1', sqRoot(add('1', roundOff(multiply(x,x), 76)), 72)), 68);
        i = i << 1;
    }
    
    const q = multiply(x,x);
    let result = '0';
    let p = x;
    let n = 1n;
    let s = '1';
    while (true) {
        let next = divide(roundOff(multiply(s, p), 72), n.toString(), 68)
        if (testTolerance(abs(next), 64)) {
            return stripTrailingZero(roundOff(multiply((i).toString(), add(result, next)), 64));
        }
        result = add(result, next);
        n = n + 2n;
        p = roundOff(multiply(p, q), 76);
        s = negate(s);
    }
}

export function atan2(y: string, x: string) {
    let offset = '0';

    if (isExatclyZero(x) && isExatclyZero(y)) {
        return '0';
    }

    if (isExatclyZero(x) && greaterThan(y, '0')) {
        return stripTrailingZero(roundOff(PI_DIV_2_H, 64));
    }

    if (isExatclyZero(x) && lessThan(y, '0')) {
        return stripTrailingZero(roundOff(negate(PI_DIV_2_H), 64));
    }

    if (lessThan(x, '0')) {
        offset = (greaterThan(y, '0', true)) ? PI : negate(PI);
    }

    return stripTrailingZero(roundOff(add(atan(divide(y, x, 68)), offset), 64));

}

export function tanh(x: string) {
    return stripTrailingZero(roundOff(divide(sinh(x), cosh(x), 68), 64));
}

function cosAndSin(x: string, precision = 64) {
    let negative = '';
    x = modulus(x, PI2, precision + 4);
    if(lessThan(PI_DIV_2_L, abs(x), true) && lessThan(abs(x), PI3_DIV_2_L)) negative = '-';

    const s = sin(x, precision + 4);
    const c = negative + sqRoot(multiply(subtract('1', s), add('1', s)), 68);

    return {s,c}
}