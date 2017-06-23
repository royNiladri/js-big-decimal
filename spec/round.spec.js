describe('round', ()=>{
    var roundOff = require('../src/round');

    it('should return integer unchanged', ()=>{
        expect(roundOff(123456)).toBe('123456');
    });
    
    it('should return float with padded zeros is second argument is non-zero and first is integer', ()=>{
        expect(roundOff(123456, 2)).toBe('123456.00');
    })
})