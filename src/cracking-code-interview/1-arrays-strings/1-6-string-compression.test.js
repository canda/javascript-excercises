import { compressString } from './1-6-string-compression';

it('should not compress single char', () => {
  expect(compressString('a')).toBe('a');
});

it('should compress multiple chars', () => {
  expect(compressString('aaa')).toBe('a3');
});
