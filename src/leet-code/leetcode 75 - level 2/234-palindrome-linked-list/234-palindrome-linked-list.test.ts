import isPalindrome from './234-palindrome-linked-list';

describe('removeNthFromEnd', () => {
  it('returns false for empty list', () => {
    expect(isPalindrome(null)).toEqual(false);
  });

  it('returns true for single node', () => {
    expect(isPalindrome({ val: 1, next: null })).toEqual(true);
  });

  it('returns true for 2 equal nodes', () => {
    expect(isPalindrome({ val: 1, next: { val: 1, next: null } })).toEqual(
      true,
    );
  });

  it('returns false for 2 different nodes', () => {
    expect(isPalindrome({ val: 1, next: { val: 2, next: null } })).toEqual(
      false,
    );
  });

  it('returns false for 4 different nodes', () => {
    expect(
      isPalindrome({
        val: 1,
        next: { val: 2, next: { val: 2, next: { val: 4, next: null } } },
      }),
    ).toEqual(false);
  });

  it('returns true for 4 palindrome nodes', () => {
    expect(
      isPalindrome({
        val: 1,
        next: { val: 2, next: { val: 2, next: { val: 1, next: null } } },
      }),
    ).toEqual(true);
  });

  it('returns true for 5 palindrome nodes', () => {
    expect(
      isPalindrome({
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 2, next: { val: 1, next: null } } },
        },
      }),
    ).toEqual(true);
  });

  it('returns false for 5 non palindrome nodes', () => {
    expect(
      isPalindrome({
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
        },
      }),
    ).toEqual(false);
  });
});
