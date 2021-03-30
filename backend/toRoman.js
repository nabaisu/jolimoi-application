function toRoman(number) {
    const romans = [
        { numeral: 'C', value: 100 },
        { numeral: 'XC', value: 90 },
        { numeral: 'L', value: 50 },
        { numeral: 'XL', value: 40 },
        { numeral: 'X', value: 10 },
        { numeral: 'IX', value: 9 },
        { numeral: 'V', value: 5 },
        { numeral: 'IV', value: 4 },
        { numeral: 'I', value: 1 },
    ]
    let result = '';
    romans.forEach(function (token) {
        while (number >= token.value) {
            result += token.numeral;
            number -= token.value;
        }
    });
    return result
}

module.exports = toRoman;