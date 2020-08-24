// String Compression: Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2b1c5a3.
// If the "compressed" string would not become smaller than the original string, your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export const compressString = (str) => {
  const chars = str.split('');

  let compressedChars = [];
  for (let char of chars) {
    if (compressedChars[compressedChars.length - 2] === char) {
      compressedChars[compressedChars.length - 1]++;
    } else {
      compressedChars.push(char);
      compressedChars.push(1);
    }
  }

  return compressedChars.length < str.length ? compressedChars.join('') : str;
};

// O(n) time complexity
// O(n) space complexity
