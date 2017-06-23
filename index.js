function roundOff(input, n){
    if(!n)
        n = 0;
    if(typeof(input) == 'number')
        input += '';

    var five = '';
    var parts = input.split('.');
    var partInt = parts[0];

    if(n == 0){
        var l = partInt.length;

        if(greaterThanFive(parts[1], partInt)){
            return formatter(increment(partInt));
        }
        return formatter(partInt);
    }

    if(!parts[1]){
        return formatter(partInt)+'.'+(new Array(n+1).join('0'));
    }else if(parts[1].length < n){
        return formatter(parseInt)+'.'+(new Array(n - parts[1].length + 1).join('0'));
    }

    var partDec = parts[1].substring(0, n);
    var rem = parts[1].substring(n);
    
    if(greaterThanFive(rem, partDec)){
        partDec = increment(partDec);
        if(partDec.length > n){
            return formatter(increment(partInt, parseInt(partDec[0])))+'.'+partDec.substring(1);
        }
    }
    return formatter(partInt)+'.'+partDec;
}

function greaterThanFive(part, pre){
    if(!part)
        return false;
    
    var five = '5' + (new Array(part.length+1).join('0'));
    return (part > five || (part == '5' && parseInt(pre[pre.length - 1])%2 == 1));
}

function increment(part, c){
    if(!c)
        c = 1;
    if(typeof(part) == 'number')
        part += '';

    var l = part.length - 1;
    var s = '';

    for(var i = l; i >= 0; i--){
        x = parseInt(part[i]) + c;
        if(x == 10){
            c = 1; x = 0;
        }else{
            c = 0;
        }
        s+=x;
    }
    if(c)
        s += c;
    
    return s.split('').reverse().join('');
}

function formatter(part){
    //return part.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return part;
}

var count = 0;
var res = [];
setInterval(function(){
    if(++count%50 == 0)
        console.log(count+", E:"+res.length);

    var n = Math.floor(Math.random()*8);
    var s = Math.floor(Math.random()*8);
    var input = Math.random()*(10^s);
    var myOut = roundOff(input, n);
    var trueOut = input.toFixed(n);
    //console.log(input+', T:'+trueOut+', M:'+myOut);
    if(Math.abs(myOut-trueOut)>Number.EPSILON){
        res.push(input+', T:'+trueOut+', M:'+myOut);
    }    
    if(res.length == 5){
        for(let t of res)
            console.log(t);
        
        clearInterval(this);
    }
}, 50);