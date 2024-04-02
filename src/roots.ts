import { add } from "./add";
import { compareTo } from "./compareTo";
import { divide } from "./divide";
import { multiply } from "./multiply";
import { pow } from "./pow";
import { stripTrailingZero } from "./stripTrailingZero";
import { subtract } from "./subtract";

export function nthRoot(x: number | string, n: number | string, percision = 8) {

    x = x.toString();
    n = n.toString();

    validate(n);

    let guess = '1';
    let nMinusOne = subtract(n, 1);
    let tolerance = pow(10, -percision);
    let percisionMax = Number(multiply(percision, 2));

    let i = 0;
    while (i < percision) {

        let newGuess = divide(add(stripTrailingZero(divide(x, pow(guess, nMinusOne)!, percisionMax)), multiply(guess, nMinusOne)), n, percisionMax);

        if (compareTo(subtract(pow(newGuess, n),x), tolerance!) == -1) {
            return newGuess
        }

        guess = newGuess;

        i++;
    }

    return guess
}

export function sqRoot(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return nthRoot(base, 2, percision);
}

export function cubeRoot(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    return nthRoot(base, 3, percision);
}

export function root10(base: string|number, percision = 32) {
    percision = Math.max(percision, 32);
    const root5 = nthRoot(base, 5, percision);
    return sqRoot(root5, percision);
}

function validate(oparand: string) {
    if (oparand.includes('.')) { // or oparand.includes('.')
        throw new Error('Modulus of non-integers not supported');
    }
}