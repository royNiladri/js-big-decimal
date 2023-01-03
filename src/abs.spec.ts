import {abs} from './abs';

describe('abs', () => {
    it('should return the absolute value of a number', () => {
        expect(abs(-1)).toBe('1');
        expect(abs(1)).toBe('1');
    });
    it('should return the absolute value of a string', () => {
        expect(abs('-1')).toBe('1');
        expect(abs('1')).toBe('1');
    });
    it('should return the absolute value of a bigint', () => {
        expect(abs(BigInt(-1))).toBe('1');
        expect(abs(BigInt(1))).toBe('1');
    });
    // test fractions
    it('should return the absolute value of a fraction', () => {
        expect(abs('-1.1')).toBe('1.1');
        expect(abs('1.1')).toBe('1.1');
    });
    // test zero
    it('should return the absoulte of -0 as 0', () => {
        expect(abs('-0')).toBe('0');
        expect(abs('0')).toBe('0');
        expect(abs(BigInt(-0))).toBe('0');
        expect(abs(BigInt(0))).toBe('0');
        expect(abs(-0)).toBe('0');
        expect(abs(0)).toBe('0');
    });
})
