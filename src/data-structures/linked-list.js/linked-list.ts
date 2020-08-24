class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  firstNode: ListNode<T>;

  constructor(firstValue: T) {
    this.firstNode = new ListNode(firstValue);
  }

  appendToTail(value: T) {
    const end = new ListNode(value);
    let previous = this.firstNode;
    while (previous.next) {
      previous = previous.next;
    }
    previous.next = end;
  }
}
