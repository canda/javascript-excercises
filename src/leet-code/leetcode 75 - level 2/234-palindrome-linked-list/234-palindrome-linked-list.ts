// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  previous?: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  if (!head) return false;
  let isOddLength = true;
  let middleToLeft = head;
  let middleToRight = head;
  let currentNode = head;

  while (!!currentNode.next) {
    currentNode.next.previous = currentNode;
    currentNode = currentNode.next;
    isOddLength = !isOddLength;
    if (isOddLength) {
      middleToLeft = middleToLeft.next;
    } else {
      middleToRight = middleToRight.next;
    }
  }

  if (middleToRight.val != middleToLeft.val) {
    return false;
  }
  while (!!middleToRight.next) {
    middleToLeft = middleToLeft.previous;
    middleToRight = middleToRight.next;
    if (middleToRight.val != middleToLeft.val) {
      return false;
    }
  }
  return true;
}

export default isPalindrome;
