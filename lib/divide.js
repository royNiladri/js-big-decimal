"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./add");
function divide(dividend, divisor, precission) {
    if (precission === void 0) { precission = 8; }
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }
    //console.log(dividend+'/'+divisor);
    dividend = dividend.toString();
    divisor = divisor.toString();
    var pt_loc = (dividend.indexOf('.') > 0 ? dividend.indexOf('.') : 0) - (divisor.indexOf('.') > 0 ? divisor.indexOf('.') : 0);
    dividend = dividend.replace('.', '');
    divisor = divisor.replace('.', '');
    var prec = 0, dl = divisor.length, rem = '0', quotent = '', maxIter = 10;
    var dvnd = dividend.substring(0, dl);
    dividend = dividend.substring(dl);
    while (prec <= precission && --maxIter) {
        //console.log(dvnd+', '+dividend);
        var qt = 0;
        while (parseInt(dvnd) >= parseInt(divisor)) {
            dvnd = add_1.add(dvnd, '-' + divisor);
            //console.log(dvnd);
            qt++;
        }
        quotent += qt;
        //console.log('---'+qt);
        if (!dividend) {
            if (!prec)
                quotent += '.';
            prec++;
            dvnd = dvnd + '0';
        }
        else {
            dvnd = dvnd + dividend.substring(0, 1);
            dividend = dividend.substring(1);
        }
    }
    return quotent;
}
exports.divide = divide;
