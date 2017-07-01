var add = require('../lib/add').add;

describe('add', function () {
    it('should be defined', function () {
        expect(add).toBeDefined();
    });

    it('should: 12+13 = 25', function () {
        expect(add('12', '13')).toBe('25');
    });

    it('should: 12-13 = -1', function () {
        expect(add('12', '-13')).toBe('-1');
    });

    it('should: 12.12+13.94 = 26.06', function () {
        expect(add('12.12', '13.94')).toBe('26.06');
    });

    it('should: 12-135 = -123', function () {
        expect(add('12', '-135')).toBe('-123');
    });

    it('should: 12.67+13 = 25.67', function () {
        expect(add('12.67', '13')).toBe('25.67');
    });

    it('should: -12.67+13 = 0.33', function () {
        expect(add('-12.67', '13')).toBe('0.33');
    });

    it('should: 12.67-13 = -0.33', function () {
        expect(add('12.67', '-13')).toBe('-0.33');
    });

    it('should: -12.67-13 = -0.33', function () {
        expect(add('-12.67', '-13')).toBe('-25.67');
    });

    it('should: 12.67+.13 = 12.80', function () {
        expect(add('12.67', '.13')).toBe('12.80');
    });
})