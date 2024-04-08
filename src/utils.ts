import { abs } from "./abs";
import { add } from "./add";
import { compareTo, isExatclyOne, isExatclyZero, lessThan } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { subtract } from "./subtract";

export const factorial = (n: number | string): string => {

    n = n.toString();

    validateInteger(n);
    validatePositive(n);

    if (isExatclyZero(n) || isExatclyOne(n)) {
        return '1';
    }

    let result = n;

    while(!isExatclyZero(n)){

        if(isExatclyOne(n)){
            return result;
        }

        let next = subtract(n,'1');
        result = multiply(result, next);
        n = next;
    }

    return result

}

function sigma(n: number | string, limit: number | string, fn: (n:number|string, ...args) => any, ...args:any): string {

    n = n.toString();
    limit = limit.toString();

    validateInteger(n);
    validateInteger(limit);
    validatePositive(n);
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

export function tolerance(percision: number | string){
    percision = percision.toString();
    validateInteger(percision);
    if(percision == '0') return '0';
    if(percision.startsWith('-')) return `1${new Array(Number(-percision)).join('0')}`;
    return `0.${new Array(Number(percision) - 1).join('0')}1`
}

export function Euler(percision: number = 32) {
    percision = Math.max(16, percision)
    return roundOff(sigma(0, percision, (n: string | number)=>{
        return divide('1', factorial(n), percision + 1)
    }), percision);
}

export function isAproxZero(number: string | number, percision: number = 8) {
    percision = Math.max(1, percision)
    number = abs(number.toString());

    if(isExatclyZero(number)) return true;
    if(lessThan(number, tolerance(percision), true)) return true;

    return false;
}

export function isAproxOne(number: string | number, percision: number = 8) {
    percision = Math.max(1, percision)
    number = abs(number.toString());

    if(isExatclyOne(number)) return true;
    if(lessThan(abs(subtract('1', number)), tolerance(percision), true)) return true;

    return false;
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


