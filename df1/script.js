document.addEventListener('DOMContentLoaded', () => {
    const arabicInput = document.getElementById('arabicInput');
    const romanInput = document.getElementById('romanInput');
    const resultDiv = document.getElementById('result');

    const romanNumeralsMap = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    const romanNumeralsArray = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    function convertArabicToRoman(num) {
        if (num < 1 || num > 3999) {
            return 'Número fora do intervalo (1-3999)';
        }

        let result = '';
        for (const { value, numeral } of romanNumeralsArray) {
            while (num >= value) {
                result += numeral;
                num -= value;
            }
        }
        return result;
    }

    function convertRomanToArabic(roman) {
        roman = roman.toUpperCase().trim();
        if (!/^[MDCLXVI]+$/.test(roman)) {
            return 'Formato romano inválido';
        }

        let result = 0;
        let i = 0;
        while (i < roman.length) {
            const twoChars = roman.substring(i, i + 2);
            if (romanNumeralsMap[twoChars]) {
                result += romanNumeralsMap[twoChars];
                i += 2;
            } else {
                const oneChar = roman.substring(i, i + 1);
                if (romanNumeralsMap[oneChar]) {
                    result += romanNumeralsMap[oneChar];
                    i += 1;
                } else {
                    return 'Formato romano inválido'; // Should not happen with regex validation
                }
            }
        }

        // Basic validation for Roman numeral rules (e.g., no IIII, VV)
        // This is a simplified check and might not catch all invalid Roman numerals
        if (convertArabicToRoman(result) !== roman && result <= 3999) {
             return 'Número romano inválido ou malformado';
        }

        if (result < 1 || result > 3999) {
            return 'Número fora do intervalo (1-3999)';
        }

        return result;
    }

    arabicInput.addEventListener('input', () => {
        const arabicValue = parseInt(arabicInput.value, 10);
        if (isNaN(arabicValue) || arabicInput.value === '') {
            romanInput.value = '';
            resultDiv.textContent = '';
            return;
        }

        const romanResult = convertArabicToRoman(arabicValue);
        romanInput.value = romanResult;
        resultDiv.textContent = `Romano: ${romanResult}`;
    });

    romanInput.addEventListener('input', () => {
        const romanValue = romanInput.value;
        if (romanValue === '') {
            arabicInput.value = '';
            resultDiv.textContent = '';
            return;
        }

        const arabicResult = convertRomanToArabic(romanValue);
        arabicInput.value = (typeof arabicResult === 'number') ? arabicResult : '';
        resultDiv.textContent = `Arábico: ${arabicResult}`;
    });
});