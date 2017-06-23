//var round = require('./round');

function bigDecimal(number){
    if(isNaN(number))
        throw Error("Parameter is not a number: "+number);

    value = number.toString();
}

bigDecimal.prototype.getValue = function() {
    return value;
}

bigDecimal.prototype.getPrettyValue = function(digits, separator) {
    if(!(digits || separator)){
        digits = 3;
        separator = ',';
    }else if(!(digits && separator)){
        throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
    }
        
    var len = value.indexOf('.');
    len = len>0?len:(value.length);
    var temp = '';
    for(var i=len; i>0; ){
        if(i<digits){
            digits = i;
            i = 0;
        }else
            i-=digits;
        
        temp = value.substring(i, i+digits)+((i<(len-digits) && i >= 0)?separator:'')+temp;
    }
    return temp+value.substring(len);
}

bigDecimal.prototype.round = function(precision) {
    if(!precision)
        precision = 0;
    else if(isNaN(precision))
        throw Error("Precision is not a number: "+precision);

    return roundOff(value, precision);
}

//module.exports = bigDecimal;