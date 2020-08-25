export class StackNode<T> {
  value: T;
  next: StackNode<T> | null;

  constructor(value: any, next?: StackNode<T>) {
    this.value = value;
    this.next = next || null;
  }
}

export class Stack<T> {
  top: StackNode<T> | null;

  constructor(firstValue: T) {
    this.top = new StackNode(firstValue);
  }

  pop() {
    const lastTop = this.top;
    this.top = lastTop.next;

    return lastTop.value;
  }

  push(value: T) {
    const lastTop = this.top;
    this.top = new StackNode(value, lastTop);
  }
}
