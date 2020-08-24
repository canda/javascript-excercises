import { LinkedList } from '../../data-structures/linked-list.js/linked-list';

export const removeDuplicates = (linkedList: LinkedList<number>) => {
  const nodesDictionary: Record<number, true> = {};
  let prevNode = linkedList.firstNode;
  nodesDictionary[prevNode.value] = true;
  let currentNode = prevNode.next;

  while (!!currentNode) {
    if (nodesDictionary[currentNode.value]) {
      // remove duplicate
      prevNode.next = currentNode.next;
    }

    // save in hash table
    nodesDictionary[currentNode.value] = true;

    // iterate next node
    prevNode = currentNode;
    currentNode = currentNode.next;
  }
};
