class QueueNode<T> {
  value: any;
  next: QueueNode<T> | null;

  constructor(value: any) {
    this.value = value;
  }
}

export class Queue<T> {
  first: QueueNode<T> | null;

  constructor(firstValue: T) {
    this.first = new QueueNode(firstValue);
  }

  // loop throught each node to reach the last one and grab its value
  // we use a slow pointer prevNode to be able to unlink the last node
  pop() {
    let prevNode = this.first;
    let currentNode = this.first.next;

    if (!currentNode) {
      this.first = null;
      return prevNode.value;
    }

    while (currentNode.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    prevNode.next = null;
    return currentNode.value;
  }

  // loop through each node to reach the last one and append the value to the end
  push(value: T) {
    let lastNode = this.first;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
    lastNode.next = new QueueNode(value);
  }

  // grab the value from the first node (if set)
  // set the first node pointer to the second node
  // return the value from the previous first node
  shift() {
    const value = this.first && this.first.value;
    this.first = this.first && this.first.next;
    return value;
  }
}
