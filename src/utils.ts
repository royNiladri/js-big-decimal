import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { RoundingModes } from "./roundingModes";
import { subtract } from "./subtract";
import { validateInteger } from "./validators";

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
    if (numbers.length === 0) throw Error('[max]: Empty array.');
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
    return multiply(roundOff(divide(number, step), 0, RoundingModes.FLOOR), step);
}

export function lerp(x: string, y: string, a: string = '1') {
    return add(multiply(x, subtract('1', a)), multiply(y, a));
};

export function invlerp(x: string, y: string, a: string) {
    return clamp(divide(subtract(a, x), subtract(y, x)));
};

export function random(length: number = 32) {
    length = Math.max(length, 32);

    const n = crypto.getRandomValues(new Uint32Array(length));
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let r = '.'

    for (let i = 0; i < length; i++) {
        const p = crypto.getRandomValues(new Uint32Array(10));
        let c = 10;

        while (c != 0) {
            let i = Math.floor((p[c - 1] / 4294967296) * c);
            c--;
            [digits[c - 1], digits[i]] = [digits[i], digits[c - 1]];
        }
        r += digits[Math.floor((n[i] / 4294967296) * 10)];
    }

    return r;
};


