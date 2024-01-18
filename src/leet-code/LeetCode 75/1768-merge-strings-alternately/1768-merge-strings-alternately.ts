const mergeAlternately = (word1: string, word2: string): string => {
  const chars1 = word1.split('');
  const chars2 = word2.split('');
  const totalLength = chars1.length + chars2.length;
  let chars1Index = 0;
  let chars2Index = 0;
  const resultChars: string[] = [];
  for (let i = 0; i < totalLength; i++) {
    if (
      (i % 2 === 0 && chars1Index < chars1.length) ||
      chars2Index >= chars2.length
    ) {
      if (chars1Index < chars1.length) {
        resultChars.push(chars1[chars1Index]);
        chars1Index++;
      }
    } else {
      if (chars2Index < chars2.length) {
        resultChars.push(chars2[chars2Index]);
        chars2Index++;
      }
    }
  }
  return resultChars.join('');
};

export default mergeAlternately;
