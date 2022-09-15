import reverseList from '../206-reverse-linked-list/206-reverse-linked-list';

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  if (!head) return false;
  if (!head.next) return true;
  let isOddLength = true;
  let middleToLeft = head;
  let middleToRight = head.next;
  let currentNode = head.next;

  while (!!currentNode.next) {
    currentNode = currentNode.next;
    isOddLength = !isOddLength;
    if (isOddLength) {
      middleToLeft = middleToLeft.next;
    } else {
      middleToRight = middleToRight.next;
    }
  }

  const originalMiddleToLeft = middleToLeft;
  const originalMiddleToLeftNext = middleToLeft.next;
  middleToLeft.next = null;

  // reverse first half of the list
  reverseList(head);

  const restoreOriginalList = () => {
    reverseList(originalMiddleToLeft);
    originalMiddleToLeft.next = originalMiddleToLeftNext;
  };

  if (middleToRight.val != middleToLeft.val) {
    restoreOriginalList();
    return false;
  }
  while (!!middleToRight.next) {
    middleToLeft = middleToLeft.next;
    middleToRight = middleToRight.next;
    if (middleToRight.val != middleToLeft.val) {
      restoreOriginalList();
      return false;
    }
  }
  restoreOriginalList();
  return true;
}

export default isPalindrome;
