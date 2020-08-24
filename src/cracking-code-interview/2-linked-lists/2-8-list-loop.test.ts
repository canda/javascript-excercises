import { LinkedList } from '../../data-structures/linked-list.js/linked-list';
import { loopStartNode } from './2-8-list-loop';

describe('loopStartNode', () => {
  it('should return null for non looped nodes', () => {
    const list = new LinkedList(42);
    list.appendToTail(43);
    list.appendToTail(44);
    expect(loopStartNode(list)).toBe(null);
  });

  it('should the first node for 2 linked nodes', () => {
    const list = new LinkedList(42);
    list.appendToTail(43);
    list.firstNode.next.next = list.firstNode;
    expect(loopStartNode(list)).toEqual({ value: 42, index: 0 });
  });

  it('should the third node for this example', () => {
    const list = new LinkedList(0);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    list.appendToTail(4);
    list.appendToTail(5);
    list.appendToTail(6);
    list.appendToTail(7);
    list.appendToTail(8);
    // 8 => 4
    list.firstNode.next.next.next.next.next.next.next.next =
      list.firstNode.next.next.next.next;
    expect(loopStartNode(list)).toEqual({ value: 4, index: 4 });
  });
});
