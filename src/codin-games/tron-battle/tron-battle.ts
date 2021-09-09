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

const globalPlayerPaths: Position[][] = [];

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

const canGo = (
  direction: Direction,
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
) =>
  isPositionFree(
    occupiedPositions,
    nextPositionInDirection(currentPosition, direction),
  );

const lastPositionOfPlayer = (playerPaths: Position[][], playerIndex: number) =>
  playerPaths[playerIndex][playerPaths[playerIndex].length - 1];

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

const MAX_DEPTH = 4;

const bestMove = (
  occupiedPositions: Record<string, true>,
  isMaximizing: boolean, // I maximize, my opponent minimizes
  depth: number,
  myIndex: number,
  myLastPosition: Position,
  opponentsLastPosition: Position,
): { direction: Direction; score: number } => {
  if (depth === MAX_DEPTH) {
    const connectedPositions = countConnectedPositions(
      occupiedPositions,
      isMaximizing ? myLastPosition : opponentsLastPosition,
    );
    return {
      direction: Direction.Left,
      score: isMaximizing ? connectedPositions : -connectedPositions,
    };
  }

  const results: { score: number; direction: Direction }[] = [];

  for (const direction of Object.values(Direction)) {
    const result = canGo(
      direction,
      occupiedPositions,
      isMaximizing ? myLastPosition : opponentsLastPosition,
    )
      ? {
          score: bestMove(
            occupiedPositions,
            !isMaximizing,
            depth + 1,
            myIndex,
            isMaximizing
              ? nextPositionInDirection(myLastPosition, direction)
              : myLastPosition,
            isMaximizing
              ? opponentsLastPosition
              : nextPositionInDirection(opponentsLastPosition, direction),
          ).score,
          direction: direction,
        }
      : {
          direction: direction,
          score: isMaximizing ? -Infinity : Infinity,
        };
    results.push(result);
  }

  // sort results ascending
  results.sort((x, y) => x.score - y.score);

  if (depth === 0) {
    console.error({ results });
  }
  if (isMaximizing) {
    // if maximizing return highest score
    return results[results.length - 1];
  } else {
    // if minimizing return lowest score
    return results[0];
  }
};

const occupiedPositions: Record<string, true> = {};

// game loop
while (true) {
  var inputs: string[] = readline().split(' ');
  const N: number = parseInt(inputs[0]); // total number of players (2 to 4).
  const myIndex: number = parseInt(inputs[1]); // your player number (0 to 3).
  const playerPositions = [];
  for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    const x0: number = parseInt(inputs[0]); // starting X coordinate of lightcycle (or -1)
    const y0: number = parseInt(inputs[1]); // starting Y coordinate of lightcycle (or -1)
    const x: number = parseInt(inputs[2]); // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
    const y: number = parseInt(inputs[3]); // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
    playerPositions.push({ x0, y0, x, y });
    if (!globalPlayerPaths[i]) {
      globalPlayerPaths[i] = [{ x: x0, y: y0 }];
      occupiedPositions[`${x0},${y0}`] = true;
    }
    globalPlayerPaths[i].push({ x, y });
    occupiedPositions[`${x},${y}`] = true;
  }

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  const result = bestMove(
    occupiedPositions,
    true,
    0,
    myIndex,
    lastPositionOfPlayer(globalPlayerPaths, myIndex),
    lastPositionOfPlayer(globalPlayerPaths, myIndex === 0 ? 1 : 0),
  );
  console.error({ result });

  // console.error(JSON.stringify(globalPlayerPaths[0], null, 2));
  // console.error(
  //   'can go down',
  //   canGoDown(globalPlayerPaths, lastPositionOfPlayer(globalPlayerPaths, 0)),
  // );

  console.log(result.direction);
}
