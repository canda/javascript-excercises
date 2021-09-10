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

const nextPositionInDirection = (position: Position, direction: Direction) => {
  const nextPosition = { ...position };
  switch (direction) {
    case Direction.Left:
      nextPosition.x -= 1;
      break;
    case Direction.Right:
      nextPosition.x += 1;
      break;
    case Direction.Up:
      nextPosition.y -= 1;
      break;
    case Direction.Down:
      nextPosition.y += 1;
      break;
    default:
      throw new Error(`Invalid direction ${direction}`);
  }
  return nextPosition;
};

const countConnectedPositions = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
  countedPositions: Record<string, true> = {},
  depth = 0,
): number => {
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

  for (const direction of Object.values(Direction)) {
    doCount(nextPositionInDirection(currentPosition, direction));
  }

  return count;
};
const start = Date.now();
const result = countConnectedPositions(
  { '1,1': true, '2,2': true },
  { x: 10, y: 10 },
);
const taken = Date.now() - start;
console.log({ result });
console.log('taken', taken);

console.log(Object.values(Direction));

export {};
