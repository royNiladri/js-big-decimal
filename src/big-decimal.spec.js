describe('big-decimal', function() {
    //var bigDecimal = require('./big-decimal');

    it('should be defined', function() {
        expect(bigDecimal).toBeDefined();
    });

    it('should return same value after creating Object', function() {
        var n = new bigDecimal(12.34);
        expect(n.getValue()).toBe('12.34');
    });

    it('should not take non-numeric argument', function() {
        try{
            var n = new bigDecimal('notAnumber');
            expect(true).toBe(false);
        }catch(e){
            expect(e.toString()).toMatch('Parameter is not a number');
        }
    });

    it('should round off 12.678 to 12.68 if precision is set to 2', function() {
        var n = new bigDecimal('12.678');
        expect(n.round(2)).toBe('12.68');
    });

    it('should round off 12.678 to 13 if precision is not passed', function() {
        var n = new bigDecimal('12.678');
        expect(n.round()).toBe('13');
    });

    it('should round off 12.2678 to 12 if precision is set to 0', function() {
        var n = new bigDecimal('12.2678');
        expect(n.round(0)).toBe('12');
    });

    it('should round off to throw error if precision is not a number', function() {
        try{
            var n = new bigDecimal('12.2678');
            var r = n.round('zero');
            expect(true).toBeFalsy();
        }catch(e){
            expect(e).toMatch('Precision is not a number');
        }
    });

    it('should transform 1567866522.26567 to 1,567,866,522.26567 if pretty is required', function() {
        var n = new bigDecimal('1567866522.26567');
        expect(n.getPrettyValue()).toBe('1,567,866,522.26567');
    });

    it('should transform 1234567890123456 to 1234-5678-9012-3456 if pretty is required', function() {
        var n = new bigDecimal('1234567890123456');
        expect(n.getPrettyValue(4, '-')).toBe('1234-5678-9012-3456');
    });
})