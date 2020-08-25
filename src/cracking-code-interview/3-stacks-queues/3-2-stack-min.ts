import { Stack, StackNode } from '../../data-structures/stack/stack';

export class StackMin extends Stack<number> {
  minValue: number;
  minValuesStack: Stack<{ minValue: number; node: StackNode<number> }>;

  constructor(firstValue: number) {
    super(firstValue);
    this.minValuesStack = new Stack({ minValue: firstValue, node: this.top });
  }

  min = () => {
    return this.minValuesStack.top.value.minValue;
  };

  push = (value: number) => {
    super.push(value);

    if (value < this.min()) {
      this.minValuesStack.push({ minValue: value, node: this.top });
    }
  };

  pop = () => {
    if (this.top === this.minValuesStack.top.value.node) {
      this.minValuesStack.pop();
    }
    return super.pop();
  };
}
