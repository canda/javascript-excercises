// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }
  let previous = head;
  let current = head.next;
  if (!current) {
    return head;
  }
  while (!!current.next) {
    let upcoming = current.next;
    current.next = previous;
    previous = current;
    current = upcoming;
  }
  current.next = previous;
  head.next = null;
  return current;
}

export default reverseList;
