import { modulus, modulusE } from "./modulus";

describe("modulus(remainder)", function () {
  it("should modulus(7,4) = 3", function () {
    expect(modulus(7, 4)).toBe("3");
  });
  it("should modulus(-7,4) = -3", function () {
    expect(modulus(-7, 4)).toBe("-3");
  });
  it("should modulus(7,-4) = 3", function () {
    expect(modulus(7, -4)).toBe("3");
  });
  it("should modulus(-7,-4) = -3", function () {
    expect(modulus(-7, -4)).toBe("-3");
  });
  it("should modulus(-7,0) throw", function () {
    expect(() => modulus(-7, 0)).toThrowError();
  });

  it("should modulus(76457896543456%77732) = 45352", function () {
    expect(modulus("76457896543456", "77732")).toBe("45352");
  });

  it("should modulus(7.5%3.2) to throw error", function () {
    expect(() => modulus("7.5", "3.2")).toThrowError();
  });
  it("should modulus(75%3.2) to throw error", function () {
    expect(() => modulus("75", "3.2")).toThrowError();
  });
  it("should modulus(7.5%32) to throw error", function () {
    expect(() => modulus("7.5", "32")).toThrowError();
  });
});

describe("modulus(Euclidean division)", function () {
  it("should modulusE(7,4) = 3", function () {
    expect(modulusE(7, 4)).toBe("3");
  });
  it("should modulusE(-7,4) = 1", function () {
    expect(modulusE(-7, 4)).toBe("1");
  });
  it("should modulus(7,-4) = -1", function () {
    expect(modulusE(7, -4)).toBe("-1");
  });
  it("should modulus(-7,-4) = -3", function () {
    expect(modulusE(-7, -4)).toBe("-3");
  });
  it("should modulus(-7,0) throw", function () {
    expect(() => modulusE(-7, 0)).toThrowError();
  });

  it("should modulusE(76457896543456, 77732) = 45352", function () {
    expect(modulusE("76457896543456", "77732")).toBe("45352");
  });

  it("should modulusE(7.5, 3.2) to throw error", function () {
    expect(() => modulusE("7.5", "3.2")).toThrowError();
  });
  it("should modulusE(75, 3.2) to throw error", function () {
    expect(() => modulusE("75", "3.2")).toThrowError();
  });
  it("should modulusE(7.5, 32) to throw error", function () {
    expect(() => modulusE("7.5", "32")).toThrowError();
  });
});
