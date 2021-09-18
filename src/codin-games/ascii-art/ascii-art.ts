const letterWidth: number = parseInt(readline());
const letterHeight: number = parseInt(readline());
const inputText: string = readline();

const asciiEncodedLetterRows: string[] = [];
for (let i = 0; i < letterHeight; i++) {
  asciiEncodedLetterRows.push(readline());
}

const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?';

const asciiRowForLetter = (char: string, rowNumber: number) => {
  let letterIndex = dictionary.indexOf(char.toUpperCase());
  if (letterIndex === -1) {
    letterIndex = dictionary.indexOf('?');
  }

  return asciiEncodedLetterRows[rowNumber].slice(
    letterIndex * letterWidth,
    letterIndex * letterWidth + letterWidth,
  );
};

const resultAsciiArtRows: string[] = [];
for (let char of inputText.split('')) {
  for (let rowNumber = 0; rowNumber < letterHeight; rowNumber++) {
    resultAsciiArtRows[rowNumber] =
      (resultAsciiArtRows[rowNumber] || '') +
      asciiRowForLetter(char, rowNumber);
  }
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(resultAsciiArtRows.join('\n'));
