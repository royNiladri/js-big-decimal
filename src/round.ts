export function roundOff(input: number | string, n: number = 0) {
    if (typeof (input) == 'number')
        input = input.toString();

    let neg = false;
    if (input[0] === '-') {
        neg = true;
        input = input.substring(1);
    }

    let parts = input.split('.'),
        partInt = parts[0],
        partDec = parts[1];

    //handle case of -ve n
    if (n < 0) {
        n = -n;
        if (partInt.length <= n)
            return '0';
        else {
            let prefix = partInt.substr(0, partInt.length - n);
            input = prefix + '.' + partInt.substr(partInt.length - n) + partDec;
            prefix = roundOff(input);
            return (neg ? '-' : '') + prefix + (new Array(n + 1).join('0'));
        }
    }


    if (n == 0) {
        let l = partInt.length;

        if (greaterThanFive(parts[1], partInt)) {
            return (neg ? '-' : '') + increment(partInt);
        }
        return (neg ? '-' : '') + partInt;
    }

    if (!parts[1]) {
        return (neg ? '-' : '') + partInt + '.' + (new Array(n + 1).join('0'));
    } else if (parts[1].length < n) {
        return (neg ? '-' : '') + partInt + '.' + parts[1] + (new Array(n - parts[1].length + 1).join('0'));
    }

    partDec = parts[1].substring(0, n);
    let rem = parts[1].substring(n);

    if (rem && greaterThanFive(rem, partDec)) {
        partDec = increment(partDec);
        if (partDec.length > n) {
            return increment(partInt, parseInt(partDec[0])) + '.' + partDec.substring(1);
        }
    }
    return (neg ? '-' : '') + partInt + '.' + partDec;
}

function greaterThanFive(part: string, pre: string) {
    if (!part)
        return false;

    let five = '5' + (new Array(part.length + 1).join('0'));
    return (part > five || (part == '5' && parseInt(pre[pre.length - 1]) % 2 == 1));
}

function increment(part, c: number = 0) {
    if (!c)
        c = 1;
    if (typeof (part) == 'number')
        part.toString();

    let l = part.length - 1,
        s = '';

    for (let i = l; i >= 0; i--) {
        let x = parseInt(part[i]) + c;
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