import { LinkedList } from './linked-list';

it('should be able to create a list with single node', () => {
  expect(new LinkedList(42).firstNode.value).toBe(42);
});

it('should be able to append nodes', () => {
  const list = new LinkedList(42);
  list.appendToTail(43);
  list.appendToTail(44);

  expect(list.firstNode.next.value).toBe(43);
  expect(list.firstNode.next.next.value).toBe(44);
});
