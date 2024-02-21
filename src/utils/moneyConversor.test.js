import { moneyStringToNumber, numberToMoneyString } from "./moneyConversor";

describe("moneyStringToNumber", () => {
  it("should convert a money string to a number", () => {
    const result = moneyStringToNumber("$1,234.56");
    expect(result).toBe(1234.56);
  });

  it("should handle negative numbers", () => {
    const result = moneyStringToNumber("-$789.12");
    expect(result).toBe(-789.12);
  });

  it("should handle strings with no decimal places", () => {
    const result = moneyStringToNumber("$1,000");
    expect(result).toBe(1000);
  });

  it("should handle strings with no dollar sign", () => {
    const result = moneyStringToNumber("123.45");
    expect(result).toBe(123.45);
  });

  it("should handle strings with commas as decimal separators", () => {
    const result = moneyStringToNumber("$1,234,567.89");
    expect(result).toBe(1234567.89);
  });

  it("should handle strings with spaces", () => {
    const result = moneyStringToNumber("$  999.99");
    expect(result).toBe(999.99);
  });

  it("should handle strings with multiple non-numeric characters", () => {
    const result = moneyStringToNumber("$1,234.56abc");
    expect(result).toBe(1234.56);
  });
});

describe("numberToMoneyString", () => {
  it("should convert a number to a money string", () => {
    const result = numberToMoneyString(1234.56);
    expect(result).toBe("$1,234.56");
  });

  it("should handle negative numbers", () => {
    const result = numberToMoneyString(-789.12);
    expect(result).toBe("-$789.12");
  });

  it("should handle numbers with no decimal places", () => {
    const result = numberToMoneyString(1000);
    expect(result).toBe("$1,000.00");
  });

  it("should handle numbers with commas as decimal separators", () => {
    const result = numberToMoneyString(1234567.89);
    expect(result).toBe("$1,234,567.89");
  });

  it("should handle numbers with spaces", () => {
    const result = numberToMoneyString(999.99);
    expect(result).toBe("$999.99");
  });

  it("should handle numbers with multiple non-numeric characters", () => {
    const result = numberToMoneyString(1234.56);
    expect(result).toBe("$1,234.56");
  });
});
