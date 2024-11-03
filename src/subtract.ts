import { add } from './add';

export function subtract(number1, number2) {
	number1 = number1.toString();
	number2 = negate(number2.toString());
	return add(number1, number2);
}

export function negate(number : string){
	return (number[0] == '-')? number.substring(1): '-' + number;
}