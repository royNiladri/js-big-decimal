import { add } from "./add";
import { compareTo, isOdd } from "./compareTo";
import { divide } from "./divide";
import { intPow, sqRoot } from "./pow";
import { subtract } from "./subtract";
import { max } from "./utils";

export function mean(numbers: string[]) {
    if (numbers.length === 0) throw Error('[Mean]: Empty array.');
    if (numbers.length === 1) return numbers[0];
    return divide(numbers.reduce((prev, curr) => {
        return add(prev, curr);
    }, '0'), numbers.length.toString());
};

export function median(numbers: string[]) {
    if (numbers.length === 0) throw Error('[Median]: Empty array.');
    if (numbers.length === 1) return numbers[0];

    const n = numbers.length.toString();
    numbers = numbers.sort((a, b) => compareTo(a, b));

    if (isOdd(n)) return numbers[parseInt(divide(add(n, '1'), 2))];

    let n0 = numbers[parseInt(divide(n, 2))];
    let n1 = numbers[parseInt(add(divide(n, 2), '1'))];
    return divide(add(n0, n1), 2);
};

export function mode(numbers: string[], last: boolean = false) {
    if (numbers.length === 0) throw Error('[Mode]: Empty array.');
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
    if (numbers.length === 0) throw Error('[Variance]: Empty array.');
    if (numbers.length === 1) return '0';

    const m = mean(numbers);
    
    numbers = numbers.map((value) => {
        return intPow(subtract(value, m), '2');
    })

    return mean(numbers);
};

export function stdDv(numbers: string[]) {
    if (numbers.length === 0) throw Error('[Standard Deviation]: Empty array.');
    if (numbers.length === 1) return '0';
    return sqRoot(variance(numbers));
};

