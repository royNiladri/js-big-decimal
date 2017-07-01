var roundOff = require('../lib/round').roundOff;

var count = 0;
var res = [];
setInterval(function(){
    if(++count%50 == 0)
        console.log(count+", E:"+res.length);
    
    var n = Math.floor(Math.random()*8);
    var s = Math.floor(Math.random()*8);
    var input = Math.random()*Math.pow(10,s);
    var myOut = roundOff(input, n);
    var trueOut = input.toFixed(n);
    if(Math.abs(myOut-trueOut)>Number.EPSILON){
        res.push(input+', T:'+trueOut+', M:'+myOut);
    }    

    if(count%100 == 0)
        console.log('\t\t'+input+', T:'+trueOut+', M:'+myOut);
    
    if(res.length == 5){
        for(let t of res)
            console.log(t);
        
        clearInterval(this);
    }
}, 50);