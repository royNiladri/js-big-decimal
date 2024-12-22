import { abs } from "./abs";
import { greaterThan, isExatclyZero, lessThan } from "./compareTo";

export function validateInteger(number: string, label?: string) {
    if (number.includes('.')) {
        throw Error(`${(label)?`[${label}]: `:''}Non-integers not supported`);
    }
}

export function validatePositive(number: string, label?: string) {
    if (number[0] == '-') {
        throw Error(`${(label)?`[${label}]: `:''}Negatives not supported`);
    }
}

export function validateGTZero(number: string, label?: string) {
    if (lessThan(number, '0', true)) {
        throw Error(`${(label)?`[${label}]: `:''}Argument x must be greater than 0`);
    }
}

export function validateIsInRange(number: string, label?: string) {
    if (greaterThan(abs(number), '1')) {
        throw Error(`${(label)?`[${label}]: `:''}Argument x is out of range`);
    }
}

export function validateDivideByZero(number: string, label?: string) {
    if (isExatclyZero(number)) {
        throw Error(`${(label)?`[${label}]: `:''}Cannot divide by 0`);
    }
}

export function validateArray(array: string[], label?: string) {
    if (array.length === 0) {
        throw Error(`${(label)?`[${label}]: `:''}Empty array`);
    }
}