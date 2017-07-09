var multiply = require('../lib/multiply').multiply;

describe('multiply', function () {
    it('should be defined', function () {
        expect(multiply).toBeDefined();
    });

    it('should: 12 * 13 = 156', function () {
        expect(multiply('12', '13')).toBe('156');
    });

    it('should: 12 * 0 = 0', function () {
        expect(multiply('12', '0')).toBe('0');
    });

    it('should: 13 * 130 = 1690', function () {
        expect(multiply('13', '130')).toBe('1690');
    });

    it('should: 13.0 * 0.00130 = 0.000169', function () {
        expect(multiply('0.13', '0.00130')).toBe('0.000169');
    });

    it('should: 0.5 * 0.2 = 0.1', function () {
        expect(multiply('0.5', '0.2')).toBe('0.1');
    });

    it('should: 0.05 * 0.02 = 0.001', function () {
        expect(multiply('0.05', '0.02')).toBe('0.001');
    });

    it('should: 0.5 * 0.02 = 0.01', function () {
        expect(multiply('0.5', '0.02')).toBe('0.01');
    });


    it('should: -13.0 * 0.00130 = -0.000169', function () {
        expect(multiply('-0.13', '0.00130')).toBe('-0.000169');
    });

    it('should: 0.5 * -0.2 = -0.1', function () {
        expect(multiply('0.5', '-0.2')).toBe('-0.1');
    });

    it('should: -0.05 * -0.02 = 0.001', function () {
        expect(multiply('-0.05', '-0.02')).toBe('0.001');
    });

    it('should: -12 * 13 = -156', function () {
        expect(multiply('-12', '13')).toBe('-156');
    });

    it('should: -12 * 0 = 0', function () {
        expect(multiply('-12', '0')).toBe('0');
    });

    it('should: 12 * -0 = 0', function () {
        expect(multiply('12', '-0')).toBe('0');
    });


    it('should: -12 * -0 = 0', function () {
        expect(multiply('-12', '-0')).toBe('0');
    });
    it('should: -0.0000005 * 13 = -0.0000065', function () {
        expect(multiply('-0.0000005', '13')).toBe('-0.0000065');
    });
})