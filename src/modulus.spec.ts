import { modulus, modulusE } from "./modulus";

describe("modulus(remainder)", function () {
  
  describe('Basic operations', function () {

    it("should modulus(7,4) = 3", function () {
      expect(modulus(7, 4)).toBe("3");
    });
  
    it("should modulus(32.6, 7) = 4.6", function () {
      expect(modulus(32.6, 7)).toBe("4.6");
    });
  
    it("should modulus(-7, 4) = 1", function () {
      expect(modulus(-7, 4)).toBe("-3");
    });
  
    it("should modulus(-32.6, 7) = -4.6", function () {
      expect(modulus(-32.6, 7)).toBe("-4.6");
    });
  
    it("should modulus(7, -4) = 3", function () {
      expect(modulus(7, -4)).toBe("3");
    });
  
    it("should modulus(32.6, -7) = 4.6", function () {
      expect(modulus(32.6, -7)).toBe("4.6");
    });
  
    it("should modulus(-7, -4) = -3", function () {
      expect(modulus(-7, -4)).toBe("-3");
    });
  
    it("should modulus(-32.6, -7) = -4.6", function () {
      expect(modulus(-32.6, -7)).toBe("-4.6");
    });
  
    it("should modulus(-7,0) throw", function () {
      expect(() => modulus(-7, 0)).toThrowError();
    });
  
    it("should modulus(76457896543456, 77732) = 45352", function () {
      expect(modulus("76457896543456", "77732")).toBe("45352");
    });
  })

  describe('Mantissa', function () {

    it("should modulus(7.5) = 0.5", function () {
      expect(modulus("7.5")).toBe("0.5")
    });

    it("should modulus(-7.5) = 0.5", function () {
      expect(modulus("-7.5")).toBe("-0.5")
    });

    it("should modulus(7.2) = 0.2", function () {
      expect(modulus("7.2")).toBe("0.2")
    });

    it("should modulus(-7.2) = -0.2", function () {
      expect(modulus("-7.2")).toBe("-0.2")
    });
  })

  describe('Non-integer Base Error', function () {

    it("should modulus(7.5%3.2) to throw error", function () {
      expect(() => modulus("7.5", "3.2")).toThrowError();
    });

    it("should modulus(75%3.2) to throw error", function () {
      expect(() => modulus("75", "3.2")).toThrowError();
    });
  })

});

describe("modulus(Euclidean division)", function () {

  describe('Basic operations', function () {

    it("should modulusE(7,4) = 3", function () {
      expect(modulusE(7, 4)).toBe("3");
    });
  
    it("should modulusE(32.6, 7) = 4.6", function () {
      expect(modulusE(32.6, 7)).toBe("4.6");
    });
  
    it("should modulusE(-7, 4) = 1", function () {
      expect(modulusE(-7, 4)).toBe("1");
    });
  
    it("should modulusE(-32.6, 7) = 2.4", function () {
      expect(modulusE(-32.6, 7)).toBe("2.4");
    });
  
    it("should modulus(7, -4) = -1", function () {
      expect(modulusE(7, -4)).toBe("-1");
    });
  
    it("should modulusE(32.6, -7) = 2.4", function () {
      expect(modulusE(32.6, -7)).toBe("-2.4");
    });
  
    it("should modulus(-7, -4) = -3", function () {
      expect(modulusE(-7, -4)).toBe("-3");
    });
  
    it("should modulusE(-32.6, -7) = -4.6", function () {
      expect(modulusE(-32.6, -7)).toBe("-4.6");
    });
  
    it("should modulusE(-7, 0) throw", function () {
      expect(() => modulusE(-7, 0)).toThrowError();
    });
  
    it("should modulusE(76457896543456, 77732) = 45352", function () {
      expect(modulusE("76457896543456", "77732")).toBe("45352");
    });
  })

  describe('Mantissa', function () {

    it("should modulusE(7.5) = 0.5", function () {
      expect(modulusE("7.5")).toBe("0.5")
    });

    it("should modulusE(-7.5) = 0.5", function () {
      expect(modulusE("-7.5")).toBe("0.5")
    });

    it("should modulusE(7.2) = 0.2", function () {
      expect(modulusE("7.2")).toBe("0.2")
    });

    it("should modulusE(-7.2) = -0.2", function () {
      expect(modulusE("-7.2")).toBe("0.8")
    });

  })

  describe('Non-integer Base', function () {

    it("should modulusE(7.5%3.2) to throw error", function () {
      expect(() => modulusE("7.5", "3.2")).toThrowError();
    });

    it("should modulusE(75%3.2) to throw error", function () {
      expect(() => modulusE("75", "3.2")).toThrowError();
    });
  })

});

