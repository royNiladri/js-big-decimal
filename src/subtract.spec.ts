var subtract = require('./big-decimal').subtract;

describe('subtract', function () {
    it('should be defined', function () {
        expect(subtract).toBeDefined();
    });

    it('should: 12-13 = -1', function () {
        expect(subtract('12', '13')).toBe('-1');
    });

    it('should: 12.67-13 = -0.33', function () {
        expect(subtract('12.67', '13')).toBe('-0.33');
    });

    it('should: 12.67-.13 = 12.54', function () {
        expect(subtract('12.67', '.13')).toBe('12.54');
    });

    it('should: 100-12 = 88', function () {
        expect(subtract('100', '12')).toBe('88');
    });

    it('should: 126.7-13 = 113.7', function () {
        expect(subtract('126.7', '13')).toBe('113.7');
    });
    it('should: 12.67-130.7 = -118.03', function () {
        expect(subtract('12.67', '130.7')).toBe('-118.03');
    });

})