// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return null;
  if (n === 0) return head;

  let previousToRemoveNode: ListNode | null = head;
  let currentNode = head;
  for (let i = 0; i < n; i++) {
    currentNode = currentNode.next;
  }

  // we are trying to remove the head from the list
  if (!currentNode) {
    return head.next;
  }

  while (!!currentNode.next) {
    currentNode = currentNode.next;
    previousToRemoveNode = previousToRemoveNode.next;
  }

  // previousToRemoveNode is now the actually the node before to the one to be removed
  previousToRemoveNode.next = previousToRemoveNode.next.next;

  return head;
}

export default removeNthFromEnd;
