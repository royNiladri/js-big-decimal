import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { negate, subtract } from "./subtract";
import { validateInteger, validatePositive } from "./validators";

export function sigma(n: number | string, limit: number | string, fn: (n: number | string, ...args) => any, ...args: any): string {

    n = n.toString();
    limit = limit.toString();

    validateInteger(n);
    validateInteger(limit);
    validatePositive(n);
    validatePositive(limit);

    let result = '0';

    while (greaterThan(limit, subtract(n, '1'))) {
        result = add(result, fn(limit, ...args));
        limit = subtract(limit, '1');
    }

    return result

}

export function alternatingSeries(n: number | string, limit: number | string, fn: (n: number | string) => any, _sign: number | string = '1'): string {

    n = n.toString();
    limit = limit.toString();
    _sign = sign(_sign.toString()).toString();

    if (lessThan(n, '1')) {
        throw new Error('[alternatingSeries]: Argument n is less than 1');
    }

    validateInteger(n);
    validateInteger(limit);
    validatePositive(limit);

    let result = '0';
    while (true) {

        const next = multiply(_sign, fn(n))

        if (lessThan(abs(next), tolerance(limit))) return result;

        result = add(result, next);
        _sign = negate(_sign)
        n = add(n, '1');
    }
}

export function tolerance(precision: number | string) {
    precision = precision.toString();
    validateInteger(precision.toString());
    if (isExatclyZero(precision)) return '0';
    if (precision[0] == '-') return '1'.padEnd(Number(abs(precision)) + 1, '0');
    return '0.'.padEnd(Number(abs(precision)) + 1, '0') + '1';
}

export function isAproxZero(number: string | number, precision: number = 8) {
    precision = Math.max(1, precision);
    number = abs(number.toString());
    if (isExatclyZero(number)) return true;
    if (lessThan(number, tolerance(precision - 1), true)) return true;
    return false;
}

export function isAproxOne(number: string, percision: number = 8) {
    percision = Math.max(1, percision)
    number = abs(number);

    if (isExatclyOne(number)) return true;
    if (lessThan(abs(subtract('1', number)), tolerance(percision - 1), true)) return true;

    return false;
}

export function sign(number: string) {
    if (isExatclyZero(number)) return 0;
    return (number[0] == '-') ? -1 : 1;
}

export function testTolerance(target: string, precision: number) {
    return (RegExp(`^([0]{1}\\.[0]{${precision + 2},}[\\d]{1})`).test(target) || target == '0');
}

export function min(numbers: string[]) {
    if (numbers.length === 0) throw Error('[Min]: Empty array.');
    if (numbers.length === 1) return numbers[0];
    return numbers.reduce((prev, curr) => {
        if (lessThan(prev, curr, true)) return prev;
        return curr;
    }, numbers[0]);
}

export function max(numbers: string[]) {
    if (numbers.length === 0) throw Error('[Min]: Empty array.');
    if (numbers.length === 1) return numbers[0];
    return numbers.reduce((prev, curr) => {
        if (greaterThan(prev, curr, true)) return prev;
        return curr;
    }, numbers[0]);
}

export function clamp(n: string, x: string = '0', y: string = '1') {
    return min([y, max([x, n])]);
}

export function step(number: string, step: string = number) {
    return multiply(roundOff(divide(number, step)), step);
}

export function lerp(x: string, y: string, a: string = '1') {
    return add(multiply(x, subtract('1', a)), multiply(y, a));
};

export function invlerp(x: string, y: string, a: string) {
    return clamp(divide(subtract(a, x), subtract(y, x)));
};

export function random(length: number = 32) {
    length = Math.max(length, 32);

    const n = crypto.getRandomValues(new Uint32Array(length + 10));
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let r = '.'
    // let c = 10;

    // while (c != 0) {
    //     let i = Math.floor((n[length - c] / 4294967296) * c);
    //     c--;
    //     [digits[c], digits[i]] = [digits[i], digits[c]];
    // }

    for (let i = 0; i < length; i++) {
        let c = 10;

        while (c != 0) {
            let i = Math.floor((n[length - c] / 4294967296) * c);
            c--;
            [digits[c], digits[i]] = [digits[i], digits[c]];
        }
        r += digits[Math.floor((n[i] / 4294967296) * 10)];
    }

    return r;
};


