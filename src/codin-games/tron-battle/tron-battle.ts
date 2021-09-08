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

const isPositionFree = (playerPaths: Position[][], position: Position) => {
  if (position.x > 29) return false;
  if (position.y > 19) return false;
  if (position.x < 0) return false;
  if (position.y < 0) return false;
  if (
    playerPaths.some((path) =>
      path.some(({ x, y }) => x === position.x && y === position.y),
    )
  )
    return false;
  return true;
};

const canGoUp = (playerPaths: Position[][], currentPosition: Position) =>
  isPositionFree(playerPaths, {
    x: currentPosition.x,
    y: currentPosition.y - 1,
  });

const canGoDown = (playerPaths: Position[][], currentPosition: Position) =>
  isPositionFree(playerPaths, {
    x: currentPosition.x,
    y: currentPosition.y + 1,
  });

const canGoLeft = (playerPaths: Position[][], currentPosition: Position) =>
  isPositionFree(playerPaths, {
    x: currentPosition.x - 1,
    y: currentPosition.y,
  });

const canGoRight = (playerPaths: Position[][], currentPosition: Position) =>
  isPositionFree(playerPaths, {
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

const possibleDirections = (
  playerPaths: Position[][],
  playerIndex: number,
): number => {
  let possibilities = 0;
  if (canGoLeft(playerPaths, lastPositionOfPlayer(playerPaths, playerIndex)))
    possibilities++;
  if (canGoRight(playerPaths, lastPositionOfPlayer(playerPaths, playerIndex)))
    possibilities++;
  if (canGoUp(playerPaths, lastPositionOfPlayer(playerPaths, playerIndex)))
    possibilities++;
  if (canGoDown(playerPaths, lastPositionOfPlayer(playerPaths, playerIndex)))
    possibilities++;

  return possibilities;
};

const MAX_DEPTH = 10;

const bestMove = (
  playerPaths: Position[][],
  isMaximizing: boolean, // I maximize, my opponent minimizes
  depth: number,
  myIndex: number,
): { direction: Direction; score: number } => {
  const playerIndex = isMaximizing ? myIndex : myIndex === 0 ? 1 : 0;
  if (depth === MAX_DEPTH) {
    return {
      direction: Direction.Left,
      score: depth * possibleDirections(playerPaths, myIndex),
    };
  }

  const leftResult = canGoLeft(
    playerPaths,
    lastPositionOfPlayer(playerPaths, playerIndex),
  )
    ? {
        score: bestMove(
          addMovementToPlayerPaths(playerPaths, Direction.Left, playerIndex),
          !isMaximizing,
          depth + 1,
          myIndex,
        ).score,
        direction: Direction.Left,
      }
    : {
        direction: Direction.Left,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const rightResult = canGoRight(
    playerPaths,
    lastPositionOfPlayer(playerPaths, playerIndex),
  )
    ? {
        score: bestMove(
          addMovementToPlayerPaths(playerPaths, Direction.Right, playerIndex),
          !isMaximizing,
          depth + 1,
          myIndex,
        ).score,
        direction: Direction.Right,
      }
    : {
        direction: Direction.Right,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const upResult = canGoUp(
    playerPaths,
    lastPositionOfPlayer(playerPaths, playerIndex),
  )
    ? {
        score: bestMove(
          addMovementToPlayerPaths(playerPaths, Direction.Up, playerIndex),
          !isMaximizing,
          depth + 1,
          myIndex,
        ).score,
        direction: Direction.Up,
      }
    : {
        direction: Direction.Up,
        score: isMaximizing ? -Infinity : Infinity,
      };

  const downResult = canGoDown(
    playerPaths,
    lastPositionOfPlayer(playerPaths, playerIndex),
  )
    ? {
        score: bestMove(
          addMovementToPlayerPaths(playerPaths, Direction.Down, playerIndex),
          !isMaximizing,
          depth + 1,
          myIndex,
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
    }
    globalPlayerPaths[i].push({ x, y });
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

  const result = bestMove(globalPlayerPaths, true, 0, myIndex);
  console.error({ result });

  // console.error(JSON.stringify(globalPlayerPaths[0], null, 2));
  // console.error(
  //   'can go down',
  //   canGoDown(globalPlayerPaths, lastPositionOfPlayer(globalPlayerPaths, 0)),
  // );

  console.log(result.direction);
}
