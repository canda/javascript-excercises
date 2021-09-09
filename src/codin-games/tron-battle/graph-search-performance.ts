/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

type Position = { x: number; y: number };

const MAX_CONNECTED_POSITIONS_DEPTH = 10000000;

const isPositionFree = (
  occupiedPositions: Record<string, true>,
  position: Position,
) => {
  if (position.x > 29) return false;
  if (position.y > 19) return false;
  if (position.x < 0) return false;
  if (position.y < 0) return false;
  if (occupiedPositions[`${position.x},${position.y}`]) return false;
  return true;
};

const countConnectedPositions = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
  countedPositions: Record<string, true> = {},
  depth = 0,
): number => {
  if (depth === MAX_CONNECTED_POSITIONS_DEPTH) {
    return 0;
  }
  let count = 0;

  const doCount = (positionToCount: Position) => {
    const countedPositionIndex = `${positionToCount.x},${positionToCount.y}`;
    if (countedPositions[countedPositionIndex]) {
      return;
    }
    countedPositions[countedPositionIndex] = true;
    if (!isPositionFree(occupiedPositions, positionToCount)) {
      return;
    }
    count += 1;
    count += countConnectedPositions(
      occupiedPositions,
      positionToCount,
      countedPositions,
      depth + 1,
    );
  };

  // UP
  doCount({ x: currentPosition.x, y: currentPosition.y - 1 });
  // DOWN
  doCount({ x: currentPosition.x, y: currentPosition.y + 1 });
  // LEFT
  doCount({ x: currentPosition.x - 1, y: currentPosition.y });
  // RIGHT
  doCount({ x: currentPosition.x + 1, y: currentPosition.y });

  return count;
};

const start = Date.now();
console.log(countConnectedPositions({}, { x: 10, y: 10 }));
const taken = Date.now() - start;
console.log('taken', taken);

console.log(Object.values(Direction));

export {};
