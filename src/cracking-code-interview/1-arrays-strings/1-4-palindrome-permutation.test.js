import { isPalindromePermutation } from './1-4-palindrome-permutation';

it('should return true for palindrome', () => {
  expect(isPalindromePermutation('asa')).toBe(true);
});

it('should return true for palindrome unsorted', () => {
  expect(isPalindromePermutation('saa')).toBe(true);
});

it('should return true for palindrome with even length', () => {
  expect(isPalindromePermutation('assa')).toBe(true);
});

it('should return true for palindrome with even length unsorted', () => {
  expect(isPalindromePermutation('aass')).toBe(true);
});

it('should return false for non palindromes', () => {
  expect(isPalindromePermutation('asd')).toBe(false);
});
