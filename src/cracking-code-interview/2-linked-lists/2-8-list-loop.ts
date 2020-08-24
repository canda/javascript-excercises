import { LinkedList } from '../../data-structures/linked-list.js/linked-list';

export const loopStartNode = <T>(list: LinkedList<T>) => {
  // moves 1 node each step
  let slowPointer = list.firstNode;
  // moves 2 nodes each step
  let fastPointer = list.firstNode;

  // If there is a loop, slow and fast pointer will eventually be at the same node
  // When slow pointer reaches the begginng of the loop, the fast pointer will be `k` nodes ahead;
  // being `k` the number of steps elapsed in this while loop.
  // After slow pointer reaching the begginng of the loop,
  // we will make `loopSize - k` steps until the 2 pointers collide.
  while (!!fastPointer && !!fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) {
      break; //collision
    }
  }

  // There was no collision because there is no loop
  // because we reached the end of the list
  if (!fastPointer || !fastPointer.next) {
    return null;
  }

  // At this point fastPointer and slowPointer are `loopSize - k` steps
  // away from the beggining of the loop
  // We will move the slowPointer to the firstNode of the list again.
  // After `k` steps of both pointers moving 1 node at a time,
  // both pointers will reach the beginning of the loop.
  // The fastPointer because it is `loopSize - k` nodes away from the beginning;
  // and the slowPointer is at the first node and `k` is defined as
  // the number steps required to reach the beginning of the loop
  let index = 0;
  slowPointer = list.firstNode;
  while (slowPointer !== fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next;
    index++;
  }

  return { value: slowPointer.value, index };
};
