import { abs } from './abs';
import { pad } from './add';
import {stripTrailingZero} from './stripTrailingZero';

export function compareTo(number1 : string, number2 : string) {
	let negative = false;

	[number1, number2] = [number1, number2].map(n => stripTrailingZero(n));

	if(number1[0] == '-' && number2[0] != "-"){
		return -1;
	}else if(number1[0] != '-' && number2[0] == '-'){
		return 1;
	}else if(number1[0] == '-' && number2[0] == '-'){
		number1 = number1.substr(1);
		number2 = number2.substr(1);
		negative = true;
	}

	[number1, number2] = pad(number1, number2);


	if(number1.localeCompare(number2) == 0){
		return 0;
	}
	for(let i = 0 ; i < number1.length ; i++){
		if(number1[i] == number2[i]){
			continue;
		}else if(number1[i] > number2[i]){
			if(negative){
				return -1;
			}else{
				return 1;
			}
		}else{
			if(negative){
				return 1;
			}else{
				return -1;
			}
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

export function isZero(number: string) {
    return (compareTo(stripTrailingZero(abs(number)), '0') === 0)
}

export function isOne(number: string) {
    return (compareTo(stripTrailingZero(abs(number)), '1') === 0)
}

export function isNotZero(number: string) {
    return !isZero(number)
}

export function isNotOne(number: string) {
    return !isOne(number)
}