const numberToWord = require("../index");

describe("flexible-currency-to-words", () => {
  // === Default Indian Format Tests ===
  test("converts number to Indian Rupees format with default options", () => {
    expect(numberToWord(254584.255)).toBe(
      "TWO LAKH FIFTY FOUR THOUSAND FIVE HUNDRED EIGHTY FOUR RUPEES AND TWENTY SIX PAISE ONLY"
    );
  });

  test("handles single rupee correctly", () => {
    expect(numberToWord(1)).toBe("ONE RUPEE ONLY");
  });

  test("handles plural rupees correctly", () => {
    expect(numberToWord(5)).toBe("FIVE RUPEES ONLY");
  });

  // === Custom Currency Western Format ===
  test("converts number to US Dollars with Western format", () => {
    expect(
      numberToWord(254584.255, {
        currency: "DOLLARS",
        fractionalUnit: "CENTS",
        numberFormat: "western",
      })
    ).toBe(
      "TWO HUNDRED FIFTY FOUR THOUSAND FIVE HUNDRED EIGHTY FOUR DOLLARS AND TWENTY SIX CENTS ONLY"
    );
  });

  test("handles various currency options", () => {
    expect(
      numberToWord(1000, {
        currency: "EUROS",
        fractionalUnit: "CENTS",
      })
    ).toBe("ONE THOUSAND EUROS ONLY");

    expect(
      numberToWord(2500.75, {
        currency: "POUNDS",
        fractionalUnit: "PENCE",
      })
    ).toBe("TWO THOUSAND FIVE HUNDRED POUNDS AND SEVENTY FIVE PENCE ONLY");

    expect(
      numberToWord(999.99, {
        currency: "YEN",
        fractionalUnit: "SEN",
      })
    ).toBe("NINE HUNDRED NINETY NINE YEN AND NINETY NINE SEN ONLY");
  });

  // === Decimal Places ===
  test("handles custom decimal places", () => {
    expect(
      numberToWord(123.456, { decimalPlaces: 0 })
    ).toBe("ONE HUNDRED TWENTY THREE RUPEES ONLY");

    expect(
      numberToWord(123.456, { decimalPlaces: 1 })
    ).toBe("ONE HUNDRED TWENTY THREE RUPEES AND FIVE PAISE ONLY");

    expect(
      numberToWord(123.456, { decimalPlaces: 4 })
    ).toBe(
      "ONE HUNDRED TWENTY THREE RUPEES AND FOUR THOUSAND FIVE HUNDRED SIXTY PAISE ONLY"
    );
  });

  test("handles high precision fractional parts", () => {
    expect(
      numberToWord(123.123456789, { decimalPlaces: 6 })
    ).toBe(
      "ONE HUNDRED TWENTY THREE RUPEES AND ONE LAKH TWENTY THREE THOUSAND FOUR HUNDRED FIFTY SEVEN PAISE ONLY"
    );
  });

  // === Rounding Behavior ===
  test("handles rounding with Math.floor (truncation)", () => {
    expect(numberToWord(123.999)).toBe(
      "ONE HUNDRED TWENTY FOUR RUPEES ONLY"
    );
    expect(numberToWord(123.994)).toBe(
      "ONE HUNDRED TWENTY THREE RUPEES AND NINETY NINE PAISE ONLY"
    );
    expect(numberToWord(123.995)).toBe(
      "ONE HUNDRED TWENTY FOUR RUPEES ONLY"
    );
  });

  // === Edge Cases ===
  test("handles zero correctly", () => {
    expect(numberToWord(0)).toBe("ZERO RUPEES ONLY");
  });

  test("handles negative numbers correctly", () => {
    expect(numberToWord(-1234.56)).toBe(
      "NEGATIVE ONE THOUSAND TWO HUNDRED THIRTY FOUR RUPEES AND FIFTY SIX PAISE ONLY"
    );
  });

  test("handles invalid inputs", () => {
    expect(numberToWord("invalid")).toBe("INVALID INPUT");
    expect(numberToWord(NaN)).toBe("INVALID INPUT");
    expect(numberToWord(null)).toBe("INVALID INPUT");
    expect(numberToWord(undefined)).toBe("INVALID INPUT");
    expect(numberToWord(Infinity)).toBe("NUMBER OUT OF RANGE!");
    expect(numberToWord( Infinity)).toBe("NUMBER OUT OF RANGE!");
  });

  test("handles numbers exceeding maximum range (10 billion)", () => {
    expect(numberToWord(10000000000)).toBe("NUMBER OUT OF RANGE!");
    expect(numberToWord(500000000000)).toBe("NUMBER OUT OF RANGE!");
  });

  test("handles numbers just below maximum range", () => {
    expect(numberToWord(9999999999)).toBe(
      "NINE HUNDRED NINETY NINE CRORE NINETY NINE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE RUPEES ONLY"
    );
  });

  test("handles numbers with no fractional part", () => {
    expect(numberToWord(1000)).toBe("ONE THOUSAND RUPEES ONLY");
  });

  test("handles numbers with only fractional part", () => {
    expect(numberToWord(0.99)).toBe("ZERO RUPEES AND NINETY NINE PAISE ONLY");
  });

  test("handles very small decimal values", () => {
    expect(numberToWord(0.01)).toBe("ZERO RUPEES AND ONE PAISE ONLY");
    expect(numberToWord(0.001)).toBe("ZERO RUPEES ONLY");
    expect(numberToWord(0.0000001)).toBe("ZERO RUPEES ONLY");
  });

  // === Custom Suffix ===
  test("handles custom suffix", () => {
    expect(numberToWord(1234.56, { suffix: "" })).toBe(
      "ONE THOUSAND TWO HUNDRED THIRTY FOUR RUPEES AND FIFTY SIX PAISE"
    );
  });

  // === Indian Format Specific Tests ===
  test("handles crore values", () => {
    expect(numberToWord(50000000)).toBe("FIVE CRORE RUPEES ONLY");
    expect(numberToWord(123456789)).toBe(
      "TWELVE CRORE THIRTY FOUR LAKH FIFTY SIX THOUSAND SEVEN HUNDRED EIGHTY NINE RUPEES ONLY"
    );
  });

  test("handles lakh values", () => {
    expect(numberToWord(500000)).toBe("FIVE LAKH RUPEES ONLY");
    expect(numberToWord(9900000)).toBe("NINETY NINE LAKH RUPEES ONLY");
  });

  test("handles thousand values", () => {
    expect(numberToWord(1234567)).toBe(
      "TWELVE LAKH THIRTY FOUR THOUSAND FIVE HUNDRED SIXTY SEVEN RUPEES ONLY"
    );
  });

  // === Western Format Specific Tests ===
  test("handles large numbers in Western format", () => {
    expect(
      numberToWord(9876543210.99, {
        currency: "DOLLARS",
        fractionalUnit: "CENTS",
        numberFormat: "western",
      })
    ).toBe(
      "NINE BILLION EIGHT HUNDRED SEVENTY SIX MILLION FIVE HUNDRED FORTY THREE THOUSAND TWO HUNDRED TEN DOLLARS AND NINETY NINE CENTS ONLY"
    );
  });

  // === Additional Edge Cases ===
  test("handles negative numbers in Western format", () => {
    expect(
      numberToWord(-1234567.89, {
        currency: "DOLLARS",
        fractionalUnit: "CENTS",
        numberFormat: "western",
      })
    ).toBe(
      "NEGATIVE ONE MILLION TWO HUNDRED THIRTY FOUR THOUSAND FIVE HUNDRED SIXTY SEVEN DOLLARS AND EIGHTY NINE CENTS ONLY"
    );
  });

  test("handles trailing zeros in integer part", () => {
    expect(numberToWord(10000)).toBe("TEN THOUSAND RUPEES ONLY");
    expect(numberToWord(1000000)).toBe("TEN LAKH RUPEES ONLY");
  });

  test("handles trailing zeros in fractional part", () => {
    expect(numberToWord(1000.10)).toBe(
      "ONE THOUSAND RUPEES AND TEN PAISE ONLY"
    );
    expect(numberToWord(100.50)).toBe(
      "ONE HUNDRED RUPEES AND FIFTY PAISE ONLY"
    );
  });

  test("handles single digit fractional part", () => {
    expect(numberToWord(100.5)).toBe(
      "ONE HUNDRED RUPEES AND FIFTY PAISE ONLY"
    );
    expect(numberToWord(100.1)).toBe(
      "ONE HUNDRED RUPEES AND TEN PAISE ONLY"
    );
  });

  test("handles empty currency fractional unit", () => {
    expect(numberToWord(123.45, { currency: "", fractionalUnit: "" })).toBe(
      "ONE HUNDRED TWENTY THREE FORTY FIVE ONLY"
    );
  });

  test("handles invalid decimalPlaces", () => {
    expect(numberToWord(123.456, { decimalPlaces:  1 })).toBe(
      "ONE HUNDRED TWENTY THREE RUPEES AND FIVE PAISE ONLY"
    );
    expect(numberToWord(123.456, { decimalPlaces: "invalid" })).toBe(
      "ONE HUNDRED TWENTY THREE RUPEES AND FORTY SIX PAISE ONLY"
    );
  });

  test("handles large crore values with thousands", () => {
    expect(numberToWord(12345678901)).toBe("NUMBER OUT OF RANGE!");
    expect(numberToWord(9876543210)).toBe(
      "NINE HUNDRED EIGHTY SEVEN CRORE SIXTY FIVE LAKH FORTY THREE THOUSAND TWO HUNDRED TEN RUPEES ONLY"
    );
  });

  test("handles teen numbers", () => {
    expect(numberToWord(11)).toBe("ELEVEN RUPEES ONLY");
    expect(numberToWord(15)).toBe("FIFTEEN RUPEES ONLY");
    expect(numberToWord(19)).toBe("NINETEEN RUPEES ONLY");
  });

  test("handles boundary values around major units", () => {
    expect(numberToWord(99999)).toBe(
      "NINETY NINE THOUSAND NINE HUNDRED NINETY NINE RUPEES ONLY"
    );
    expect(numberToWord(100000)).toBe("ONE LAKH RUPEES ONLY");
    expect(numberToWord(9999999)).toBe(
      "NINETY NINE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE RUPEES ONLY"
    );
    expect(numberToWord(10000000)).toBe("ONE CRORE RUPEES ONLY");
  });

  // === Separator Handling ===
  test("ignores separator option as it is unused", () => {
    expect(numberToWord(1234.56, { separator: "," })).toBe(
      "ONE THOUSAND TWO HUNDRED THIRTY FOUR RUPEES AND FIFTY SIX PAISE ONLY"
    );
  });
});