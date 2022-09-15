import removeNthFromEnd from './19-remove-nth-node-from-end-of-list';

describe('removeNthFromEnd', () => {
  it('returns null if head is null', () => {
    expect(removeNthFromEnd(null, 0)).toEqual(null);
  });

  it('returns 3 nodes intact if n = 0', () => {
    expect(
      removeNthFromEnd(
        { val: 1, next: { val: 2, next: { val: 3, next: null } } },
        0,
      ),
    ).toEqual({ val: 1, next: { val: 2, next: { val: 3, next: null } } });
  });

  it('solves trivial 3 nodes', () => {
    expect(
      removeNthFromEnd(
        { val: 1, next: { val: 2, next: { val: 3, next: null } } },
        1,
      ),
    ).toEqual({ val: 1, next: { val: 2, next: null } });
  });

  it('removes middle node', () => {
    expect(
      removeNthFromEnd(
        { val: 1, next: { val: 2, next: { val: 3, next: null } } },
        2,
      ),
    ).toEqual({ val: 1, next: { val: 3, next: null } });
  });

  it('returns empty head if n = list length', () => {
    expect(removeNthFromEnd({ val: 1, next: null }, 1)).toEqual(null);
  });

  it('can remove the first element', () => {
    expect(
      removeNthFromEnd({ val: 1, next: { val: 2, next: null } }, 2),
    ).toEqual({ val: 2, next: null });
  });
});
