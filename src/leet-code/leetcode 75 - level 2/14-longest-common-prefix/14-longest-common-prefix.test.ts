import longestCommonPrefix from './14-longest-common-prefix';

it('should find "fl" prefix', () => {
  expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toEqual('fl');
});

it('should return empty string if no common prefixes', () => {
  expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toEqual('');
});

it('should return whole word for single word input', () => {
  expect(longestCommonPrefix(['splendid'])).toEqual('splendid');
});

it('should return empty if only some repeat', () => {
  expect(longestCommonPrefix(['reflower', 'flow', 'flight'])).toEqual('');
});
