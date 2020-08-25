import { StackMin } from './3-2-stack-min';

describe('StackMin', () => {
  it('should return min for single node stack', () => {
    const stack = new StackMin(42);

    expect(stack.min()).toBe(42);
  });

  it('should return min for multiple node stack', () => {
    const stack = new StackMin(42);
    stack.push(41);
    stack.push(43);

    expect(stack.min()).toBe(41);
  });

  it('should return min for multiple node stack even after popping minimum node', () => {
    const stack = new StackMin(42);
    stack.push(41);
    stack.push(43);
    stack.push(41);

    expect(stack.min()).toBe(41);
    stack.pop(); // remove 41
    expect(stack.min()).toBe(41);
    stack.pop(); // remove 43
    stack.pop(); // remove 41
    expect(stack.min()).toBe(42);
  });
});
