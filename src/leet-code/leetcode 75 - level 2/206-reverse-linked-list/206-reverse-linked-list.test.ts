import reverseList from './206-reverse-linked-list';

describe('removeNthFromEnd', () => {
  it('returns null for empty list', () => {
    expect(reverseList(null)).toEqual(null);
  });

  it('returns same node for single node', () => {
    expect(reverseList({ val: 1, next: null })).toEqual({ val: 1, next: null });
  });

  it('returns reversed 2 nodes list', () => {
    expect(reverseList({ val: 1, next: { val: 2, next: null } })).toEqual({
      val: 2,
      next: { val: 1, next: null },
    });
  });

  it('returns reversed 3 nodes list', () => {
    expect(
      reverseList({ val: 1, next: { val: 2, next: { val: 3, next: null } } }),
    ).toEqual({ val: 3, next: { val: 2, next: { val: 1, next: null } } });
  });

  it('returns reversed 4 nodes list', () => {
    expect(
      reverseList({
        val: 1,
        next: { val: 2, next: { val: 3, next: { val: 4, next: null } } },
      }),
    ).toEqual({
      val: 4,
      next: { val: 3, next: { val: 2, next: { val: 1, next: null } } },
    });
  });
});
