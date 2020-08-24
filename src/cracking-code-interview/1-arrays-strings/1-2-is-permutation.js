const isPermutation = (str1, str2) => {
  let result = true;
  const charCount = {};
  str1.split('').forEach((char) => {
    charCount[char] = (charCount[char] || 0) + 1;
  });

  str2.split('').forEach((char) => {
    if (!charCount[char]) {
      result = false;
    } else {
      charCount[char] = charCount[char] - 1;
    }
  });

  return result;
};
