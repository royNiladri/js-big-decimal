var compareTo = require('./big-decimal').compareTo;

describe('compareTo', function () {
    it('should be defined', function () {
        expect(compareTo).toBeDefined();
    });


    it('should: 12 , 13 = -1', function () {
        expect(compareTo('12', '13')).toBe(-1);
    });

    it('should: 12 , -13 = 1', function () {
        expect(compareTo('12', '-13')).toBe(1);
    });

    it('should: 12.12, 13.94 = -1', function () {
        expect(compareTo('12.12', '13.94')).toBe(-1);
    });

    it('should: 12, -135 = 1', function () {
        expect(compareTo('12', '-135')).toBe(1);
    });

    it('should: 12.67, 13 = -1', function () {
        expect(compareTo('12.67', '13')).toBe(-1);
    });

    it('should: -12.67, 13 = -1', function () {
        expect(compareTo('-12.67', '13')).toBe(-1);
    });

    it('should: 12.67, -13 = 1', function () {
        expect(compareTo('12.67', '-13')).toBe(1);
    });

    it('should: -12.67, -13 = 1', function () {
        expect(compareTo('-12.67', '-13')).toBe(1);
    });

    it('should: 12.67, .13 = 1', function () {
        expect(compareTo('12.67', '.13')).toBe(1);
    });

    it('should: 100, -12 = 1', function () {
        expect(compareTo('100', '-12')).toBe(1);
    });

    it('should: 126.7, -13 = 1', function () {
        expect(compareTo('126.7', '-13')).toBe(1);
    });
    it('should: 12.67, -12.67 = 1', function () {
        expect(compareTo('12.67', '-12.67')).toBe(1);
    });
    it('should: 12.67, 12.67 = 0', function () {
        expect(compareTo('12.67', '12.67')).toBe(0);
    });
    it('should: 12.67, 12.6700 = 0', function () {
        expect(compareTo('12.67', '12.6700')).toBe(0);
    });
    it('should: -12.67, -12.6700 = 0', function () {
        expect(compareTo('-12.67', '-12.6700')).toBe(0);
    });
    it('should: 0.67, .6700 = 0', function () {
        expect(compareTo('0.67', '.6700')).toBe(0);
    });

})