import { describe, expect, it } from '@jest/globals';
import mergeAlternately from './1768-merge-strings-alternately';

describe('1768-merge-strings-alternately', () => {
  it('should work for abc pqr', () => {
    const input = {
      s1: 'abc',
      s2: 'pqr',
    };
    const output = 'apbqcr';
    expect(mergeAlternately(input.s1, input.s2)).toEqual(output);
  });

  it('should work for ab pqrs', () => {
    const input = {
      s1: 'ab',
      s2: 'pqrs',
    };
    const output = 'apbqrs';
    expect(mergeAlternately(input.s1, input.s2)).toEqual(output);
  });

  it('should work for abcd pq', () => {
    const input = {
      s1: 'abcd',
      s2: 'pq',
    };
    const output = 'apbqcd';
    expect(mergeAlternately(input.s1, input.s2)).toEqual(output);
  });
});
