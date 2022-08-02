function longestCommonPrefix(strs: string[]): string {
  const dictionary: Record<string, number> = {};
  for (const word of strs) {
    for (let i = 0; i < word.length; i++) {
      const prefix = word.slice(0, i + 1);
      dictionary[prefix] = dictionary[prefix] || 0;
      dictionary[prefix] += 1;
    }
  }

  let result = '';
  let resultRepetitions = 0;
  for (const prefix in dictionary) {
    if (
      (dictionary[prefix] > resultRepetitions ||
        (resultRepetitions === dictionary[prefix] &&
          prefix.length > result.length)) &&
      dictionary[prefix] === strs.length
    ) {
      result = prefix;
      resultRepetitions = dictionary[prefix];
    }
  }
  return result;
}

export default longestCommonPrefix;
