import { abs } from "./abs";
import { add } from "./add";
import { greaterThan, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { multiply } from "./multiply";
import { negate, subtract } from "./subtract";

export const factorial = (n: number | string): string => {

    n = n.toString();

    validateInteger(n);
    validatePositive(n);

    if (isExatclyZero(n) || isExatclyOne(n)) {
        return '1';
    }

    let result = n;

    while(true){

        if(isExatclyOne(n)){
            return result;
        }

        let next = subtract(n,'1');
        result = multiply(result, next);
        n = next;
    }
}

export function sigma(n: number | string, limit: number | string, fn: (n:number|string, ...args) => any, ...args:any): string {

    n = n.toString();
    limit = limit.toString();

    validateInteger(n);
    validateInteger(limit);
    validatePositive(n);
    validatePositive(limit);

    let result = '0';

    while(greaterThan(limit, subtract(n,'1'))){
        result = add(result, fn(limit, ...args));
        limit = subtract(limit,'1');
    }

    return result

}

export function alternatingSeries(n: number | string, limit: number | string, fn: (n:number|string) => any, _sign: number | string = '1'): string {

    n = n.toString();
    limit = limit.toString();
    _sign = sign(_sign).toString();

    if(lessThan(n, '1')){
        throw new Error('[alternatingSeries]: Argument n is less than 1');
    }

    validateInteger(n);
    validateInteger(limit);
    validatePositive(limit);

    let result = '0';
    while(true){

        const next = multiply(_sign, fn(n))

        if(lessThan(abs(next), tolerance(limit))){
            return result;
        }

        result = add(result, next);
        _sign = negate(_sign)
        n = add(n,'1');
    }
}

export function tolerance(precision: number | string){
    precision = precision.toString();
    validateInteger(precision);
    if(precision == '0') return '0';
    if(precision.startsWith('-')) return `1${new Array(Number(-precision)).join('0')}`;
    return `0.${new Array(Number(precision) - 1).join('0')}1`
}

export function isAproxZero(number: string | number, precision: number = 8) {
    precision = Math.max(1, precision)
    number = abs(number.toString());

    if(isExatclyZero(number)) return true;
    if(lessThan(number, tolerance(precision), true)) return true;

    return false;
}

export function isAproxOne(number: string | number, precision: number = 8) {
    precision = Math.max(1, precision)
    number = abs(number.toString());

    if(isExatclyOne(number)) return true;
    if(lessThan(abs(subtract('1', number)), tolerance(precision), true)) return true;

    return false;
}

export function sign(number: string | number){
    number = number.toString();
    if(isExatclyZero(number)) return 0;
    if(number.includes('-')) return -1;
    return 1;
}

function validateInteger(number: string) {
    if (number.includes('.')) {
        throw new Error('Non-integers not supported');
    }
}

function validatePositive(number: string) {
    if (number.includes('-')) {
        throw new Error('Negatives not supported');
    }
}


