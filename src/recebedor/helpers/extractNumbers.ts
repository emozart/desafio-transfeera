export function extractNumbers(text: string) {
  let extractedNumbers = '';
  for (const char of text) {
    if (/\d/.test(char)) {
      extractedNumbers += char;
    }
  }
  return extractedNumbers;
}
