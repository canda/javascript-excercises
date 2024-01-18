import { describe } from '@jest/globals';
import gcdOfStrings from './1071-greatest-common-divisor-of-strings';

describe('gcdOfStrings', () => {
  it('should work for ABCABC, ABC', () => {
    expect(gcdOfStrings('ABCABC', 'ABC')).toBe('ABC');
  });
  it('should work for ABABAB, ABAB', () => {
    expect(gcdOfStrings('ABABAB', 'ABAB')).toBe('AB');
  });
  it('should work for ABABAB, ABAB', () => {
    expect(gcdOfStrings('LEET', 'CODE')).toBe('');
  });
});
