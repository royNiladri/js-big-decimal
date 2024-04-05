import { abs } from "./abs";
import { add } from "./add";
import { compareTo, isNotZero, isOne, isZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { subtract } from "./subtract";

export const factorial = (n: number | string): string => {

    n = n.toString();

    validateInteger(n);
    validatePositive(n);

    if (isZero(n) || isOne(n)) {
        return '1';
    }

    let result = n;

    while(isNotZero(n)){

        if(isOne(n)){
            return result;
        }

        let next = subtract(n,'1');
        result = multiply(result, next);
        n = next;
    }

    return result

}

export const sigma = (n: number | string, limit: number | string, fn: (n:number|string, ...args) => any, ...args:any): string => {

    n = n.toString();
    limit = limit.toString();

    validateInteger(n);
    validateInteger(n);
    validatePositive(limit);
    validatePositive(limit);

    let result = '0';
    while(compareTo(limit, subtract(n,'1')) === 1){

        if(compareTo(limit, n) === -1){
            return result;
        }

        let next = subtract(limit,'1');
        result = add(result, fn(limit, ...args));
        limit = next;
    }

    return result

}

export function tolerance(percision){ return `0.${new Array(percision - 1).join('0')}1`}

export function Euler(percision: number = 32) {
    return roundOff(sigma(0, percision, (n: string | number)=>{
        return divide('1', factorial(n), percision + 1)
    }), percision);
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

function isAproxZero(number: string | number, percision: number = 8) {
    number = abs(number.toString());

    if(isZero(number)) return true;
    if(lessThan(number, tolerance(percision), true)) return true;

    return false;
}

function isAproxOne(number: string | number, percision: number = 8) {
    number = abs(number.toString());

    if(isOne(number)) return true;
    if(lessThan(subtract('1', number), tolerance(percision), true)) return true;

    return false;
}

