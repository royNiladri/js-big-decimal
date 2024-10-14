import { abs } from "../abs";
import { add } from "../add";
import { lessThan, greaterThan, equals, isOdd, isExatclyZero, isEven, isExatclyOne } from "../compareTo";
import { divide } from "../divide";
import { log } from "../logarithm";
import { multiply } from "../multiply";
import { roundOff } from "../round";
import { stripTrailingZero } from "../stripTrailingZero";
import { subtract } from "../subtract";
import { tolerance, sign } from "../utils";

const worker: Worker = self as any;

function intPow(base: string, exponent: string, precision: number | undefined = 32) {
    exponent = abs(exponent);
    let result = '1';

    while (greaterThan(exponent, '0')) {
        if (isOdd(exponent)) { result = multiply(result, base) }
        base = multiply(base, base);
        exponent = divide(exponent, 2, 2).split('.')[0];
    }

    return result
}

function nthRoot(x: number | string, n: number | string, precision = 8) {

    x = x.toString();
    n = n.toString();

    if (equals(n, '2')) {
        let guess = multiply(log(x), '-0.5');
        let nMinusOne = subtract(n, 1);
        let difference = '0'
        let lastDifference = x
        let i = 0;
        while (true) {

            let newGuess = divide(add(stripTrailingZero(divide(x, guess, precision + 2)), multiply(guess, nMinusOne)), n, precision + 2);

            difference = abs(subtract(guess, newGuess))

            if (greaterThan(difference, lastDifference)) {
                // console.log('root exit under p')
                return stripTrailingZero(roundOff(guess, precision + 1))
            }

            if (lessThan(difference, tolerance(precision - 1))) {
                // console.log('newGuess exit under p')

                return stripTrailingZero(roundOff(newGuess, precision + 1))
            }

            lastDifference = difference;
            guess = stripTrailingZero(newGuess);

            i++;
        }
        // console.log('guess exit over itt')

        // return stripTrailingZero(roundOff(guess, precision + 1))
    } else if (equals(n, '5')) {
        let x0 = '1';
        let x1 = '2';
        let x2 = '1.5';
        let i = 0;

        while (true) {
            let f0 = subtract(intPow(x0, '5', precision + 2), x);
            let f1 = subtract(intPow(x1, '5', precision + 2), x);
            let next = multiply(f1, divide(subtract(x1, x0), subtract(f1, f0), precision + 2));
            x2 = subtract(roundOff(x1, precision + 2), roundOff(next, precision + 2));

            if (lessThan(abs(subtract(x2, x1)), tolerance(precision + 1))) {
                return stripTrailingZero(roundOff(x2, precision + 1));
            }

            if (sign(f0) !== sign(f1)) {
                x1 = divide(add(x0 + x1), 2, precision + 2); // Switch to bisection method
            }

            x0 = x1;
            x1 = stripTrailingZero(roundOff(x2, precision + 2));
            i++;
        }

        // return stripTrailingZero(roundOff(x2, precision + 1))
    }

}

worker.addEventListener("message", (event) => {
    let fractionalExponent = '1';
    let tempBase = nthRoot(nthRoot(event.data.base, 5, 33), 2, 32);

    for (let i = 0; i < event.data.significand.length; i++) {
        const significandDigit = event.data.significand[i]
        const root5 = nthRoot(tempBase, 5, 33); // 2
        const root10 = (() => { return nthRoot(root5, 2, 33) })(); // 1


        if (isOdd(significandDigit)) {

            const root2 = nthRoot(tempBase, 2, 33); // 5

            switch (significandDigit) {
                case '9':
                    fractionalExponent = multiply(fractionalExponent, multiply(intPow(root5, '2', 33), root2))
                    break;
                case '7':
                    fractionalExponent = multiply(fractionalExponent, multiply(root2, root5))
                    break;
                case '5':
                    fractionalExponent = multiply(fractionalExponent, root2)
                    break;
                case '3':
                    fractionalExponent = multiply(fractionalExponent, multiply(root5, root10))
                    break;
                case '1':
                    fractionalExponent = multiply(fractionalExponent, root10)
                    break;
            }

        }

        if (isEven(significandDigit)) {
            switch (significandDigit) {
                case '8':
                    fractionalExponent = multiply(fractionalExponent, intPow(root5, '4', 33))
                    break;
                case '6':
                    fractionalExponent = multiply(fractionalExponent, intPow(root5, '3', 33))
                    break;
                case '4':
                    fractionalExponent = multiply(fractionalExponent, intPow(root5, '2', 33))
                    break;
                case '2':
                    fractionalExponent = multiply(fractionalExponent, root5)
                    break;
                case '0':
                    break;
            }
        }

        tempBase = root10;

    }

    worker.postMessage(fractionalExponent);
});