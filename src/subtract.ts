import { add } from './add';

export function subtract(number1: string, number2: string) {
	return add(number1, negate(number2));
}

export function negate(number : string){
	return (number[0] == '-')? number.substring(1): '-' + number;
}