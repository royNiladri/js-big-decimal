import { abs } from './abs';
import { pad } from './add';
import {stripTrailingZero} from './stripTrailingZero';

export function compareTo(number1 : string, number2 : string) {
	let negative = false;

	[number1, number2] = [number1, number2].map(n => stripTrailingZero(n));

	// Early escapes

	// If num 1 is negative and num 2 is positive
	if(number1[0] == '-' && number2[0] != "-") return -1;

	// If num 2 is negative and num 1 is positive
	if(number1[0] != '-' && number2[0] == '-') return 1;
	

	if(number1[0] == '-' && number2[0] == '-'){
		number1 = number1.substring(1);
		number2 = number2.substring(1);
		negative = true;
	}


	let decimal1 = number1.indexOf('.');
	let decimal2 = number2.indexOf('.');

	// If both numbers dont have decimals, compare lengths
	if(decimal1 == -1 && decimal1 == decimal2) {
		if(number1.length > number2.length) return (negative)? -1: 1;
		if(number1.length < number2.length) return (negative)? 1: -1;
	}

	// If num 1 has no decimal, and num 2 has, then compare integer length to the decimal index of num 2
	if(decimal1 == -1 && decimal2 !== -1){
		if(number1.length < decimal2) return (negative)? 1: -1;
		if(number1.length > decimal2) return (negative)? -1: 1;
	}

	// If num 1 has a decimal, and num 2 has none, then compare integer length to the decimal index of num 1
	if(decimal1 !== -1 && decimal2 == -1){
		if(number2.length < decimal1) return (negative)? 1: -1;
		if(number2.length > decimal1) return (negative)? -1: 1;
	}	

	[number1, number2] = pad(number1, number2);

	// If equal
	if(number1.localeCompare(number2) == 0) return 0;

	for(let i = 0 ; i < number1.length ; i++){
		if(number1[i] == number2[i]){
			continue;
		} else if(number1[i] > number2[i]){
			return (negative)? -1: 1;
		} else {
			return (negative)? 1: -1;
		}
	}
	return 0;
}

// Wrapper functions

export function lessThan(left: string, right: string, orEquals: boolean = false){
	return (orEquals)? (compareTo(left, right) === 0 || compareTo(left, right) === -1): (compareTo(left, right) === -1)
}

export function greaterThan(left: string, right: string, orEquals: boolean = false){
	return (orEquals)? (compareTo(left, right) === 0 || compareTo(left, right) === 1): (compareTo(left, right) === 1)
}

export function equals(left: string, right: string){
	return (compareTo(stripTrailingZero(left), stripTrailingZero(right)) === 0)
}

export function isExatclyZero(number: string) {
    return equals(stripTrailingZero(abs(number)), '0')
}

export function isExatclyOne(number: string) {
    return equals(stripTrailingZero(abs(number)), '1')
}

export function isEven(number: string) {
    return /[02468]{1}$/.test(number.split('.')[0])
}

export function isOdd(number: string) {
    return /[13579]{1}$/.test(number.split('.')[0])
}