import { abs } from "./abs";
import { add } from "./add";
import { lessThan, equals, greaterThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { pow } from "./pow";
import { roundOff } from "./round";
import { subtract } from "./subtract";
import { E_ROOTS_FOR_POW } from "./tables/e";
import { tolerance } from "./utils";

export const E = roundOff('2.718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264', 257);
export const LN2 = '0.693147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687541993981020570685733685520235758130557032670751635075961930727570828371435190307038623891673471123350115364507330239120475172681574932065155524734063903421';
export const LOG2E = '1.44269504088896340735992468100188';
export const LN10 = '2.30258509299404568392825848336901';
export const LOG10E = '0.43429448190325182766805360691429';

export function Euler(precision: number = 32) {
    precision = Math.max(16, precision)
    let result = '1';
    let n = '1';
    let f = '1';

    while(true){
        f = multiply(f, n);
        const next = divide('1', f, precision + 2)

        if(lessThan(abs(next), tolerance(precision))){
            return roundOff(result, precision);
        }

        result = add(result, next);
        n = add(n,'1');
    }
}

export function exp(exponent: number | string) {
    exponent = exponent.toString();
    const remainder = exponent.split('.')[1];
    let result = pow(E, abs(exponent).split('.')[0], 33);
    let fractionalExponent = '1';

    if (remainder) {
        for (let i = 0; i < Math.min(33,remainder.length); i++) {
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
    let term = divide(subtract(x, '1'), add(x, '1'), 33);
    let i = 0;
    while (true) {
        i++
        let iteration = subtract(multiply('2', i), '1');
        let next = multiply(divide('1', iteration, 33), pow(term, iteration));
        if (lessThan(next, tolerance(33))) {
            return roundOff(multiply('2', add(result, next)), 32);
        }
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
        x = divide(x, 2, 33);
        result = add(result, '1');
    }
    return roundOff(add(result, divide(ln(x), LN2,33)), 32);
}

export function log(base: string | number) {
    base = base.toString();
    return roundOff(multiply(ln2(base), LN2), 32);
}

export function log10(base: string | number) {
    base = base.toString();
    return divide(log(base), LN10, 32);
}