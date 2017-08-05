let big = require('./big-decimal'),
    roundOff = big.round,
    floor = big.floor,
    ceil = big.ceil;

describe('round', function () {

    it('should return integer unchanged', function () {
        expect(roundOff(123456)).toBe('123456');
    });

    it('should return float with padded zeros if second argument is non-zero and first is integer', function () {
        expect(roundOff(123456, 2)).toBe('123456.00');
    });
    it('should return float with padded zeros if second argument is non-zero and first is floating', function () {
        expect(roundOff(12345.6, 2)).toBe('12345.60');
    })
    it('should return float with padded zeros if second argument is non-zero and first is floating', function () {
        expect(roundOff('044909.987', 5)).toBe('044909.98700');
    })
    it('should return float rounded appropriately if second argument is non-zero and first is floating', function () {
        expect(roundOff('96227983951.7293581', 5)).toBe('96227983951.72936');
    })
    it("should round(87.45, -1) = 90", function(){
        expect(roundOff('87.45', -1)).toBe('90');
    })
    it("should round(84.45, -1) = 80", function(){
        expect(roundOff('84.45', -1)).toBe('80');
    })
    it("should round(87.45, -2) = 0", function(){
        expect(roundOff('87.45', -2)).toBe('0');
    })
    it("should round(87.45, -3) = 0", function(){
        expect(roundOff('87.45', -3)).toBe('0');
    })
    it("should round(87, -1) = 90", function(){
        expect(roundOff('87', -1)).toBe('90');
    })
    it("should round(82, -1) = 80", function(){
        expect(roundOff('82', -1)).toBe('80');
    })
    it("should ceil(13) = 13", function(){
        expect(ceil(13)).toBe('13');
    })
    it("should floor(13) = 13", function(){
        expect(floor(13)).toBe('13');
    })
    it("should ceil(13.3) = 14", function(){
        expect(ceil(13.3)).toBe('14');
    })
    it("should floor(13.3) = 13", function(){
        expect(floor(13.3)).toBe('13');
    })
    it("should ceil(13.8) = 14", function(){
        expect(ceil(13.8)).toBe('14');
    })
    it("should floor(13.8) = 13", function(){
        expect(floor(13.8)).toBe('13');
    })
    it("should ceil(-13.3) = -13", function(){
        expect(ceil(-13.3)).toBe('-13');
    })
    it("should floor(-13.3) = -14", function(){
        expect(floor(-13.3)).toBe('-14');
    })
    it("should ceil(-13.8) = -13", function(){
        expect(ceil(-13.8)).toBe('-13');
    })
    it("should floor(-13.8) = -14", function(){
        expect(floor(-13.8)).toBe('-14');
    })
})