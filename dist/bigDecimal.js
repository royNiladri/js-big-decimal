var add = (function () {
    function add(number1, number2) {

        var neg = 0, ind = -1;

        //check for negatives
        if (number1[0] == '-') {
            neg++;
            ind = 1;
            number1 = number1.substring(1);
        }
        if (number2[0] == '-') {
            neg++;
            ind = 2;
            number2 = number2.substring(1);
        }

        var parts1 = number1.split('.'),
            parts2 = number2.split('.');

        var li = Math.max(parts1[0].length, parts2[0].length),
            ld1 = parts1[1] ? parts1[1].length : 0,
            ld2 = parts2[1] ? parts2[1].length : 0,
            ld = Math.max(ld1, ld2);

        if (neg == 1) {
            if (ind == 1)
                number1 = compliment(number1);
            else
                number2 = compliment(number2);
        }

        var res = addCore(number1, number2);

        if (!neg)
            return trim(res);
        else if (neg == 2)
            return ('-' + trim(res));
        else {
            if (res.length == li + ld + 1 + (ld ? 1 : 0))
                return trim(res.substring(1));
            else
                return ('-' + trim(compliment(res)));
        }
    }

    function compliment(number) {
        var s = '',
            l = number.length,
            dec = number.split('.')[1],
            ld = dec ? dec.length : 0;

        for (var i = 0; i < l; i++) {
            if (number[i] >= '0' && number[i] <= '9')
                s += (9 - parseInt(number[i]));
            else
                s += number[i];
        }

        var one = (ld > 0) ? ('0.' + (new Array(ld)).join('0') + '1') : '1';

        return addCore(s, one);
    }

    function trim(number) {
        var parts = number.split('.');

        if (!parts[0])
            parts[0] = '0';

        while (parts[0][0] == '0' && parts[0].length > 1)
            parts[0] = parts[0].substring(1);

        return parts[0] + (parts[1] ? ('.' + parts[1]) : '');
    }

    function addCore(number1, number2) {
        var parts1 = number1.split('.'),
            parts2 = number2.split('.');

        //pad integral part
        var length1 = parts1[0].length,
            length2 = parts2[0].length;

        if (length1 > length2) {
            parts2[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts2[0] ? parts2[0] : '');
        } else {
            parts1[0] = (new Array(Math.abs(length1 - length2) + 1)).join('0') + (parts1[0] ? parts1[0] : '');
        }

        //pad fractional part
        var length1 = parts1[1] ? parts1[1].length : 0,
            length2 = parts2[1] ? parts2[1].length : 0;
        if (length1 || length2) {
            if (length1 > length2) {
                parts2[1] = (parts2[1] ? parts2[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
            } else {
                parts1[1] = (parts1[1] ? parts1[1] : '') + (new Array(Math.abs(length1 - length2) + 1)).join('0');
            }
        }

        number1 = parts1[0] + ((parts1[1]) ? ('.' + parts1[1]) : '');
        number2 = parts2[0] + ((parts2[1]) ? ('.' + parts2[1]) : '');

        var sum = ''
        carry = 0;

        for (var i = number1.length - 1; i >= 0; i--) {
            if (number1[i] === '.') {
                sum = '.' + sum;
                continue;
            }
            var temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
            sum = (temp % 10) + sum;
            carry = parseInt(temp / 10);
        }

        return carry ? ('1' + sum) : sum;
    }

    return add;

})();

var bigDecimal = (function () {
    bigDecimal = function (number) {

        validate = function (number) {
            if (number) {
                number = number.toString();
                if (isNaN(number) || number.indexOf('e') > -1)
                    throw Error("Parameter is not a number: " + number);

                if (number[0] == '+')
                    number = number.substring(1);
            } else
                number = '0';

            return number;
        }

        var value = '0';
        value = validate(number);

        bigDecimal.prototype.getValue = function () {
            return value;
        }

        bigDecimal.prototype.getPrettyValue = function (digits, separator) {
            if (!(digits || separator)) {
                digits = 3;
                separator = ',';
            } else if (!(digits && separator)) {
                throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
            }

            var len = value.indexOf('.');
            len = len > 0 ? len : (value.length);
            var temp = '';
            for (var i = len; i > 0;) {
                if (i < digits) {
                    digits = i;
                    i = 0;
                } else
                    i -= digits;

                temp = value.substring(i, i + digits) + ((i < (len - digits) && i >= 0) ? separator : '') + temp;
            }
            return temp + value.substring(len);
        }

        bigDecimal.prototype.round = function (precision) {
            if (!precision)
                precision = 0;
            else if (isNaN(precision))
                throw Error("Precision is not a number: " + precision);

            return roundOff(value, precision);
        }

        bigDecimal.add = function (number1, number2) {
            number1 = validate(number1);
            number2 = validate(number2);
            return add(number1, number2);
        }
    }

    return bigDecimal;
})();

var roundOff = (function () {
    function roundOff(input, n) {
        if (!n)
            n = 0;
        if (typeof (input) == 'number')
            input += '';

        var five = '';
        var parts = input.split('.');
        var partInt = parts[0];

        if (n == 0) {
            var l = partInt.length;

            if (greaterThanFive(parts[1], partInt)) {
                return increment(partInt);
            }
            return partInt;
        }

        if (!parts[1]) {
            return partInt + '.' + (new Array(n + 1).join('0'));
        } else if (parts[1].length < n) {
            return parseInt + '.' + (new Array(n - parts[1].length + 1).join('0'));
        }

        var partDec = parts[1].substring(0, n);
        var rem = parts[1].substring(n);

        if (greaterThanFive(rem, partDec)) {
            partDec = increment(partDec);
            if (partDec.length > n) {
                return increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
            }
        }
        return partInt + '.' + partDec;
    }

    function greaterThanFive(part, pre) {
        if (!part)
            return false;

        var five = '5' + (new Array(part.length + 1).join('0'));
        return (part > five || (part == '5' && parseInt(pre[pre.length - 1]) % 2 == 1));
    }

    function increment(part, c) {
        if (!c)
            c = 1;
        if (typeof (part) == 'number')
            part += '';

        var l = part.length - 1;
        var s = '';

        for (var i = l; i >= 0; i--) {
            x = parseInt(part[i]) + c;
            if (x == 10) {
                c = 1; x = 0;
            } else {
                c = 0;
            }
            s += x;
        }
        if (c)
            s += c;

        return s.split('').reverse().join('');
    }

    return roundOff;
})();

//module.exports = roundOff;
/*require('./round');
angular.module('big-nubmer.round-off', [])
    .filter('round-off', function(){
        return roundOff(input, n);
    });*/