import { LinkedList } from '../../data-structures/linked-list.js/linked-list';
import { removeDuplicates } from './2-1-remove-duplicates';

describe('removeDuplicates', () => {
  it('should not remove anything for unique values', () => {
    const list = new LinkedList(42);
    list.appendToTail(43);
    list.appendToTail(44);

    removeDuplicates(list);

    expect(list.firstNode.value).toBe(42);
    expect(list.firstNode.next.value).toBe(43);
    expect(list.firstNode.next.next.value).toBe(44);
    expect(list.firstNode.next.next.next).toBe(null);
  });

  it('should not remove anything for unique values', () => {
    const list = new LinkedList(42);
    list.appendToTail(42);
    list.appendToTail(43);
    list.appendToTail(43);
    list.appendToTail(44);
    list.appendToTail(44);

    removeDuplicates(list);

    expect(list.firstNode.value).toBe(42);
    expect(list.firstNode.next.value).toBe(43);
    expect(list.firstNode.next.next.value).toBe(44);
    expect(list.firstNode.next.next.next).toBe(null);
  });
});
