import { add, trim } from './add';
import { roundOff } from './round';

export function divide(dividend, divisor, precission = 8) {
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }

    dividend = dividend.toString();
    divisor = divisor.toString();

    if (dividend == 0)
        return '0';

    let neg = 0;
    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        neg++;
    }
    if (dividend[0] == '-') {
        dividend = dividend.substring(1);
        neg++;
    }

    var pt_dvsr = divisor.indexOf('.') > 0 ? divisor.length - divisor.indexOf('.') - 1 : -1;

    divisor = trim(divisor.replace('.', ''));
    if (pt_dvsr >= 0) {
        let pt_dvnd = dividend.indexOf('.') > 0 ? dividend.length - dividend.indexOf('.') - 1 : -1;

        if (pt_dvnd == -1) {
            dividend = trim(dividend + (new Array(pt_dvsr + 1)).join('0'));
        } else {
            if (pt_dvsr > pt_dvnd) {
                dividend = dividend.replace('.', '');
                dividend = trim(dividend + (new Array(pt_dvsr - pt_dvnd + 1)).join('0'));
            } else if (pt_dvsr < pt_dvnd) {
                dividend = dividend.replace('.', '');
                let loc = dividend.length - pt_dvsr + pt_dvsr;
                dividend = trim(dividend.substring(0, loc) + '.' + dividend.substring(loc));
            } else if (pt_dvsr == pt_dvnd) {
                dividend = trim(dividend.replace('.', ''));
            }
        }
    }

    let prec = 0, dl = divisor.length, rem = '0', quotent = '';
    let dvnd = (dividend.indexOf('.') > -1 && dividend.indexOf('.') < dl) ? dividend.substring(0, dl + 1) : dividend.substring(0, dl);
    dividend = (dividend.indexOf('.') > -1 && dividend.indexOf('.') < dl) ? dividend.substring(dl + 1) : dividend.substring(dl);
    
    if (dvnd.indexOf('.') > -1) {
        let shift = dvnd.length - dvnd.indexOf('.') - 1;
        dvnd = dvnd.replace('.', '');
        if (dl > dvnd.length) {
            shift += dl - dvnd.length;
            dvnd = dvnd + (new Array(dl - dvnd.length + 1)).join('0');
        }
        prec = shift;
        quotent = '0.' + (new Array(shift)).join('0');

    }

    precission = precission + 2;

    while (prec <= precission) {
        let qt = 0;
        while (parseInt(dvnd) >= parseInt(divisor)) {
            dvnd = add(dvnd, '-' + divisor);
            qt++;
        }
        quotent += qt;

        if (!dividend) {
            if (!prec)
                quotent += '.';
            prec++;
            dvnd = dvnd + '0';
        } else {
            if (dividend[0] == '.') {
                quotent += '.';
                prec++;
                dividend = dividend.substring(1);
            }
            dvnd = dvnd + dividend.substring(0, 1);
            dividend = dividend.substring(1);
        }
    }

    return ((neg == 1) ? '-' : '') + trim(roundOff(quotent, precission - 2));
}