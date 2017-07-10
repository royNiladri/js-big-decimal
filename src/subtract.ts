import { add } from './add';

export function subtract(number1, number2) {
	number1 = number1.toString();
	number2 = number2.toString();
	number2 = negate(number2);
	return add(number1, number2);
}

export function negate(number : string){
	if(number[0] == '-'){
		number = number.substr(1);
	}else{
		number = '-' + number;
	}
	return number;
}