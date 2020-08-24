import { Stack } from './stack';

describe('Stack', () => {
  it('should be able to pop first element of stack', () => {
    expect(new Stack(42).pop()).toBe(42);
  });
  it('should be able to push and pop elements', () => {
    const stack = new Stack(42);
    stack.push(43);
    stack.push(44);
    expect(stack.pop()).toBe(44);
    expect(stack.pop()).toBe(43);
    expect(stack.pop()).toBe(42);
  });
});
