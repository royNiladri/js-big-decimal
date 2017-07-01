var roundOff = require('../lib/round').roundOff;

describe('round', function () {

    it('should return integer unchanged', function () {
        expect(roundOff(123456)).toBe('123456');
    });

    it('should return float with padded zeros is second argument is non-zero and first is integer', function () {
        expect(roundOff(123456, 2)).toBe('123456.00');
    })
})