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

const canGoUp = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
) =>
  isPositionFree(occupiedPositions, {
    x: currentPosition.x,
    y: currentPosition.y - 1,
  });

const canGoDown = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
) =>
  isPositionFree(occupiedPositions, {
    x: currentPosition.x,
    y: currentPosition.y + 1,
  });

const canGoLeft = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
) =>
  isPositionFree(occupiedPositions, {
    x: currentPosition.x - 1,
    y: currentPosition.y,
  });

const canGoRight = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
) =>
  isPositionFree(occupiedPositions, {
    x: currentPosition.x + 1,
    y: currentPosition.y,
  });

const lastPositionOfPlayer = (playerPaths: Position[][], playerIndex: number) =>
  playerPaths[playerIndex][playerPaths[playerIndex].length - 1];

const addMovementToPlayerPaths = (
  playerPaths: Position[][],
  direction: Direction,
  playerIndex: number,
): Position[][] => {
  const newPlayerPaths = [...playerPaths];

  const lastPosition = lastPositionOfPlayer(playerPaths, playerIndex);

  let newPosition;
  switch (direction) {
    case Direction.Left:
      newPosition = { x: lastPosition.x - 1, y: lastPosition.y };
      break;
    case Direction.Right:
      newPosition = { x: lastPosition.x + 1, y: lastPosition.y };
      break;
    case Direction.Up:
      newPosition = { x: lastPosition.x, y: lastPosition.y - 1 };
      break;
    case Direction.Down:
      newPosition = { x: lastPosition.x, y: lastPosition.y + 1 };
      break;
  }

  newPlayerPaths[playerIndex] = [...playerPaths[playerIndex], newPosition];

  return newPlayerPaths;
};

const MAX_CONNECTED_POSITIONS_DEPTH = 200;

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
    if (
      !countedPositions[countedPositionIndex] &&
      isPositionFree(occupiedPositions, positionToCount)
    ) {
      countedPositions[countedPositionIndex] = true;
      count += 1;
      count += countConnectedPositions(
        occupiedPositions,
        positionToCount,
        countedPositions,
        depth + 1,
      );
    }
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

const nextRightPosition = (position: Position) => ({
  x: position.x + 1,
  y: position.y,
});
const nextLeftPosition = (position: Position) => ({
  x: position.x - 1,
  y: position.y,
});
const nextUpPosition = (position: Position) => ({
  x: position.x,
  y: position.y - 1,
});
const nextDownPosition = (position: Position) => ({
  x: position.x,
  y: position.y + 1,
});

const MAX_DEPTH = 5;

const bestMove = (
  occupiedPositions: Record<string, true>,
  isMaximizing: boolean, // I maximize, my opponent minimizes
  depth: number,
  myIndex: number,
  myLastPosition: Position,
  opponentsLastPosition: Position,
): { direction: Direction; score: number } => {
  const playerIndex = isMaximizing ? myIndex : myIndex === 0 ? 1 : 0;
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

  const leftResult = canGoLeft(
    occupiedPositions,
    isMaximizing ? myLastPosition : opponentsLastPosition,
  )
    ? {
        score: bestMove(
          occupiedPositions,
          !isMaximizing,
          depth + 1,
          myIndex,
          isMaximizing ? nextLeftPosition(myLastPosition) : myLastPosition,
          isMaximizing
            ? opponentsLastPosition
            : nextLeftPosition(opponentsLastPosition),
        ).score,
        direction: Direction.Left,
      }
    : {
        direction: Direction.Left,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const rightResult = canGoRight(
    occupiedPositions,
    isMaximizing ? myLastPosition : opponentsLastPosition,
  )
    ? {
        score: bestMove(
          occupiedPositions,
          !isMaximizing,
          depth + 1,
          myIndex,
          isMaximizing ? nextRightPosition(myLastPosition) : myLastPosition,
          isMaximizing
            ? opponentsLastPosition
            : nextRightPosition(opponentsLastPosition),
        ).score,
        direction: Direction.Right,
      }
    : {
        direction: Direction.Right,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const upResult = canGoUp(
    occupiedPositions,
    isMaximizing ? myLastPosition : opponentsLastPosition,
  )
    ? {
        score: bestMove(
          occupiedPositions,
          !isMaximizing,
          depth + 1,
          myIndex,
          isMaximizing ? nextUpPosition(myLastPosition) : myLastPosition,
          isMaximizing
            ? opponentsLastPosition
            : nextUpPosition(opponentsLastPosition),
        ).score,
        direction: Direction.Up,
      }
    : {
        direction: Direction.Up,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const downResult = canGoDown(
    occupiedPositions,
    isMaximizing ? myLastPosition : opponentsLastPosition,
  )
    ? {
        score: bestMove(
          occupiedPositions,
          !isMaximizing,
          depth + 1,
          myIndex,
          isMaximizing ? nextDownPosition(myLastPosition) : myLastPosition,
          isMaximizing
            ? opponentsLastPosition
            : nextDownPosition(opponentsLastPosition),
        ).score,
        direction: Direction.Down,
      }
    : {
        direction: Direction.Down,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const results = [leftResult, rightResult, upResult, downResult];

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

  // if (canGoRight(me)) {
  //   currentDirection = Direction.Right;
  // } else if (canGoLeft(me)) {
  //   currentDirection = Direction.Left;
  // } else if (canGoUp(me)) {
  //   currentDirection = Direction.Up;
  // } else if (canGoDown(me)) {
  //   currentDirection = Direction.Down;
  // }

  // console.log('Left');

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
