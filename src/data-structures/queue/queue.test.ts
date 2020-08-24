import { Queue } from './queue';

describe('Queue', () => {
  it('should be able to pop first element', () => {
    expect(new Queue(42).pop()).toBe(42);
  });
  it('should be able to push and shift/remove elements from first', () => {
    const queue = new Queue(42);
    queue.push(43);
    queue.push(44);
    expect(queue.shift()).toBe(42);
    expect(queue.shift()).toBe(43);
    expect(queue.shift()).toBe(44);
  });
  it('should be able to push and pop elements', () => {
    const queue = new Queue(42);
    queue.push(43);
    queue.push(44);
    expect(queue.pop()).toBe(44);
    expect(queue.pop()).toBe(43);
    expect(queue.pop()).toBe(42);
  });
});
