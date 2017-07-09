var divide = require('../lib/divide').divide;

describe('divide', function(){
    it('should return correct result', function(){
        let count = 100, err = 0;
        while(count-- > 0){
            let dividend = Math.round(Math.random()*(Math.pow(10, Math.floor(Math.random()*5))));
            let divisor = Math.round(Math.random()*(Math.pow(10, Math.floor(Math.random()*5))));
            if(divisor==0)
                continue;
            let jsOut = dividend/divisor;
            let myOut = parseFloat(divide(dividend, divisor));
            if(Math.abs(jsOut-myOut)>0.001){
                //console.log(`${dividend}/${divisor} = ${jsOut} != ${myOut}`);
                err++;
            }else
            {
                //console.log(`${dividend}/${divisor} = ${jsOut} == ${myOut}`);
            }
        }
        expect(err).toBe(0);
    });
    it('should do basic integer division', function(){
        expect(divide(1234, 12, 2)).toBe('102.83');
    })
})