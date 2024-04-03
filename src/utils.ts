import { add } from "./add";
import { compareTo } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { roundOff } from "./round";
import { subtract } from "./subtract";

export const factorial = (n: number | string): string => {

    n = n.toString();

    validateInteger(n);
    validatePositive(n);

    if (isEaxactlyZero(n) || isEaxactlyOne(n)) {
        return '1';
    }

    let result = n;

    while(!isEaxactlyZero(n)){

        if(isEaxactlyOne(n)){
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

export function Euler(percision: number = 32) {
    return roundOff(sigma(0, percision, (n: string | number)=>{
        return divide('1', factorial(n), percision + 1)
    }), percision);
}

function validateInteger(oparand: string) {
    if (oparand.includes('.')) {
        throw new Error('Non-integers not supported');
    }
}

function validatePositive(oparand: string) {
    if (oparand.includes('-')) {
        throw new Error('Negatives not supported');
    }
}

function isEaxactlyZero(oparand: string) {
    return (compareTo(oparand, '0') === 0)
}

function isEaxactlyOne(oparand: string) {
    return (compareTo(oparand, '1') === 0)
}