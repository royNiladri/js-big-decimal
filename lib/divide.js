"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./add");
var round_1 = require("./round");
function divide(dividend, divisor, precission) {
    if (precission === void 0) { precission = 8; }
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }
    //console.log(dividend+'/'+divisor);
    dividend = dividend.toString();
    divisor = divisor.toString();
    //var pt_loc = (dividend.indexOf('.')>0?dividend.length-dividend.indexOf('.')-1:0)-(divisor.indexOf('.')>0?divisor.length-divisor.indexOf('.')-1:0);
    var pt_dvsr = divisor.indexOf('.') > 0 ? divisor.length - divisor.indexOf('.') - 1 : -1;
    divisor = add_1.trim(divisor.replace('.', ''));
    if (pt_dvsr >= 0) {
        var pt_dvnd = dividend.indexOf('.') > 0 ? dividend.length - dividend.indexOf('.') - 1 : -1;
        //if dividend has no decimal pt
        if (pt_dvnd == -1) {
            dividend = add_1.trim(dividend + (new Array(pt_dvsr + 1)).join('0'));
        }
        else {
            //if pt_dvsr>pt_dvnd -> 12.45/10.106 or 12.2/1.47 -> shift right
            if (pt_dvsr > pt_dvnd) {
                dividend = dividend.replace('.', '');
                dividend = add_1.trim(dividend + (new Array(pt_dvsr - pt_dvnd + 1)).join('0'));
            }
            else if (pt_dvsr < pt_dvnd) {
                dividend = dividend.replace('.', '');
                var loc = dividend.length - pt_dvsr + pt_dvsr;
                dividend = add_1.trim(dividend.substring(0, loc) + '.' + dividend.substring(loc));
            }
            else if (pt_dvsr == pt_dvnd) {
                dividend = add_1.trim(dividend.replace('.', ''));
            }
        }
    }
    //console.log('equivalent:'+dividend+'/'+divisor);
    var prec = 0, dl = divisor.length, rem = '0', quotent = '';
    var dvnd = dividend.substring(0, dl);
    dividend = dividend.substring(dl);
    precission = precission + 2; //-pt_loc;
    while (prec <= precission) {
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
            if (dividend[0] == '.') {
                quotent += '.';
                prec++;
                dividend = dividend.substring(1);
            }
            dvnd = dvnd + dividend.substring(0, 1);
            dividend = dividend.substring(1);
        }
    }
    //console.log(quotent);
    /*if(pt_loc>=0){
        let new_loc = (quotent.indexOf('.')?quotent.indexOf('.'):quotent.length)-pt_loc;
        quotent = quotent.replace('.', '');
        quotent = quotent.substring(0, new_loc)+'.'+quotent.substring(new_loc);
        precission = precission + pt_loc;
    }*/
    return round_1.roundOff(quotent, precission - 2);
}
exports.divide = divide;
