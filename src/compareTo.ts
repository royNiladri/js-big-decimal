import { pad } from './add';

export function compareTo(number1 : string, number2 : string) {
	let negative = false;
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