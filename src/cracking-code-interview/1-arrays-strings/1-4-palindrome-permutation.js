export const isPalindromePermutation = (str) => {
  const charCounts = {};

  const chars = str.split('');

  for (let char of chars) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  // if we only have one or don't have characters without corresponding pair,
  // then we can form a palindrome permutation.
  return (
    Object.keys(charCounts).filter((char) => charCounts[char] % 2 === 1)
      .length <= 1
  );
};

// O(n) time complexity
// O(n) space complexity
