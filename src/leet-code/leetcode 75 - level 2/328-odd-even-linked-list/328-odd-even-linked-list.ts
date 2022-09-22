// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const separateLists = (head: ListNode) => {
  let oddHead = head;
  let evenHead = head.next;

  let currentNode = head.next.next;
  let currentOddNode = oddHead;
  let currentEvenNode = evenHead;
  let oddFlag = true;

  // separate odd and even nodes in separate lists
  while (currentNode !== null) {
    if (oddFlag) {
      currentOddNode.next = currentNode;
      currentOddNode = currentNode;
    } else {
      currentEvenNode.next = currentNode;
      currentEvenNode = currentNode;
    }
    oddFlag = !oddFlag;
    currentNode = currentNode.next;
  }
  currentOddNode.next = null;
  currentEvenNode.next = null;

  return { oddHead, evenHead };
};

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;

  const { oddHead, evenHead } = separateLists(head);
  let currentNode = oddHead;
  // set currentNode as the last node of the odd list
  while (currentNode.next !== null) {
    currentNode = currentNode.next;
  }

  currentNode.next = evenHead;

  return oddHead;
}

export default oddEvenList;
