import { add } from "./add";
import { compareTo, equals, isExatclyOne, isExatclyZero, isOdd } from "./compareTo";
import { E } from "./constants";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { intPow, sqRoot } from "./pow";
import { roundOff } from "./round";
import { subtract } from "./subtract";
import { max } from "./utils";
import { validateArray, validateInteger, validatePositive } from "./validators";

export function mean(numbers: string[]): string {
    validateArray(numbers, 'mean');
    if (numbers.length === 1) return numbers[0];
    return divide(numbers.reduce((prev, curr) => {
        return add(prev, curr);
    }, '0'), numbers.length.toString());
};

export function median(numbers: string[]): string {
    validateArray(numbers, 'median');
    if (numbers.length === 1) return numbers[0];

    const n = numbers.length.toString();
    numbers = numbers.sort((a, b) => compareTo(a, b));

    if (isOdd(n)) return numbers[parseInt(subtract(divide(add(n, '1'), '2', 0), '1'))];

    let n0 = numbers[parseInt(subtract(divide(n, '2'), '1'))];
    let n1 = numbers[parseInt(divide(n, '2'))];
    return divide(add(n0, n1), '2');
};

export function mode(numbers: string[], last: boolean = false) {
    validateArray(numbers, 'mode');
    if (numbers.length === 1) return numbers[0];

    numbers = numbers.sort((a, b) => compareTo(a, b));

    const values: string[] = [];
    const counts: string[] = [];

    numbers.forEach((value) => {
        let i = values.indexOf(value);
        if (i === -1) {
            values.push(value);
            i = values.indexOf(value);
            counts[i] = '0';
        };
        counts[i] = add(counts[i], '1');
    })

    let m = (last) ? counts.lastIndexOf(max(counts)) : counts.indexOf(max(counts));

    return values[m];

};

export function variance(numbers: string[]) {
    validateArray(numbers, 'variance');
    if (numbers.length === 1) return '0';

    const m = mean(numbers);

    numbers = numbers.map((value) => {
        return intPow(subtract(value, m), '2');
    })

    return mean(numbers);
};

export function stdDv(numbers: string[]) {
    validateArray(numbers, 'stdDv');
    if (numbers.length === 1) return '0';
    return sqRoot(variance(numbers));
};

export const factorialMemmory: string[] = ['0', '1'];

export function factorial(n: string): string {
    validateInteger(n, 'factorial');
    validatePositive(n, 'factorial');

    if (isExatclyZero(n) || isExatclyOne(n)) {
        return '1';
    }

    if (factorialMemmory[n]) return factorialMemmory[n];

    const memmory = (factorialMemmory.length - 1).toString();
    let i = BigInt(memmory);
    let result = BigInt(factorialMemmory[memmory]);

    while (true) {
        if (i.toString() == n) return result.toString();

        i++;
        result = result * i
        if (!factorialMemmory[i.toString()]) factorialMemmory[i.toString()] = result.toString();
    }
}

export function subfactorial(n: string): string {
    validateInteger(n, 'subfactorial');
    validatePositive(n, 'subfactorial');

    if (isExatclyZero(n) || isExatclyOne(n)) return '1';

    return roundOff(divide(factorial(n), E))
}

