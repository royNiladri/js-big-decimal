import { add } from './add';

export function subtract(number1, number2) {
	number1 = number1.toString();
	number2 = number2.toString();
	if(number2[0] == '-'){
		number2 = number2.substr(1);
	}else{
		number2 = '-' + number2;
	}
	return add(number1, number2);
}