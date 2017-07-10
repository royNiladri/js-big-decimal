var divide = require('../lib/divide').divide;

describe('divide', function(){
    it('should return correct result', function(){
        let count = 1000, err = 0;
        while(count-- > 0){
            let dividend = (Math.random()*(Math.pow(10, Math.floor(Math.random()*10)))).toFixed(5);
            let divisor = (Math.random()*(Math.pow(10, Math.floor(Math.random()*10))));
            if(divisor==0){
                count++;
                continue;
            }
            let jsOut = dividend/divisor;
            let myOut = parseFloat(divide(dividend, divisor, 5));
            if(isNaN(myOut) || Math.abs(jsOut-myOut)>0.00001){
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
    it('should do basic floating point division', function(){
        expect(divide(12.34, 12, 2)).toBe('1.03');
    })
    it('should do basic floating point division', function(){
        expect(divide(29629629362962961839.48344234, 12345678901234567890, 2)).toBe('2.40');
    })
})