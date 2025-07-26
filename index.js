function numberToWord(value, options = {}) {
    if (typeof value !== "number" || isNaN(value)) {
        return "INVALID INPUT";
    }

    const config = {
        currency: options.currency ?? "RUPEES",
        fractionalUnit: options.fractionalUnit ?? "PAISE",
        suffix: options.suffix ?? "ONLY",
        decimalPlaces:
            typeof options.decimalPlaces === "number" && options.decimalPlaces >= 0
                ? options.decimalPlaces
                : 2,
        numberFormat: options.numberFormat ?? "indian",
    };

    const isNegative = value < 0;
    value = Math.abs(value);
    if (value >= 1e10) {
        return "NUMBER OUT OF RANGE!";
    }


    let integerPart = Math.floor(value);
    const multiplier = Math.pow(10, config.decimalPlaces);
    let fraction = Math.round((value % 1) * multiplier);

    // Handle rounding overflow (e.g., 99.999 rounds to 100.00)
    if (fraction === multiplier) {
        integerPart += 1;
        fraction = 0;
    }


    const integerWords = numberToWords(integerPart, config.numberFormat);
    const hasCurrency = config.currency.trim().length > 0;
    const hasFractional = config.fractionalUnit.trim().length > 0;

    const fractionWords =
        fraction > 0
            ? numberToWords(fraction, config.numberFormat) +
            (hasFractional ? " " + config.fractionalUnit : "")
            : "";

    const full =
        (isNegative ? "NEGATIVE " : "") +
        (integerWords + (hasCurrency ? " " + (integerPart === 1 ? config.currency.replace(/S$/, "") : config.currency) : "")) +
        (fractionWords ? (hasCurrency && hasFractional ? " AND " : " ") + fractionWords : "") +
        (config.suffix ? " " + config.suffix : "");

    return full.trim().replace(/\s{2,}/g, " ");
}

function numberToWords(num, format) {
    const a = [
        "",
        "ONE",
        "TWO",
        "THREE",
        "FOUR",
        "FIVE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINE",
        "TEN",
        "ELEVEN",
        "TWELVE",
        "THIRTEEN",
        "FOURTEEN",
        "FIFTEEN",
        "SIXTEEN",
        "SEVENTEEN",
        "EIGHTEEN",
        "NINETEEN",
    ];
    const b = [
        "",
        "",
        "TWENTY",
        "THIRTY",
        "FORTY",
        "FIFTY",
        "SIXTY",
        "SEVENTY",
        "EIGHTY",
        "NINETY",
    ];

    const indianUnits = [
        [10000000, "CRORE"],
        [100000, "LAKH"],
        [1000, "THOUSAND"],
        [100, "HUNDRED"],
    ];
    const westernUnits = [
        [1000000000, "BILLION"],
        [1000000, "MILLION"],
        [1000, "THOUSAND"],
        [100, "HUNDRED"],
    ];

    if (num === 0) return "ZERO";

    let words = "";

    if (num < 20) {
        return a[num];
    }

    const units = format === "indian" ? indianUnits : westernUnits;

    for (const [value, name] of units) {
        if (num >= value) {
            words +=
                numberToWords(Math.floor(num / value), format) +
                " " +
                name +
                " ";
            num %= value;
        }
    }

    if (num >= 20) {
        words += b[Math.floor(num / 10)] + " ";
        num %= 10;
    }

    if (num > 0) {
        words += a[num] + " ";
    }

    return words.trim();
}

module.exports = numberToWord;