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
  if (occupiedPositions[positionHash(position)]) return false;
  return true;
};

const positionHash = (position: Position) => `${position.x},${position.y}`;

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

let countConnectedPositionsCalls = 0;
const countConnectedPositions = (
  occupiedPositions: Record<string, true>,
  currentPosition: Position,
  countedPositions: Record<string, true> = {},
  depth = 0,
): number => {
  let count = 0;
  if (depth === 0) {
    countConnectedPositionsCalls++;
  }

  const doCount = (positionToCount: Position) => {
    if (countedPositions[positionHash(positionToCount)]) {
      return;
    }
    countedPositions[positionHash(positionToCount)] = true;
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

const MAX_TIME_TAKEN = 30;
const MAX_DEPTH = 10;

let movesCalculated = 0;
let bestMoveStartTime = 0;
const bestMove = (
  occupiedPositions: Record<string, true>,
  myLastPosition: Position,
  opponentsLastPosition: Position,
  myTurn: boolean = true, // I maximize, my opponent minimizes
  depth: number = 0,
): { direction: Direction; score: number } => {
  console.error({ depth, occupiedPositions });
  if (depth === 0) {
    movesCalculated = 0;
    countConnectedPositionsCalls = 0;
    bestMoveStartTime = Date.now();
  }
  movesCalculated++;

  if (depth === MAX_DEPTH || Date.now() - bestMoveStartTime >= MAX_TIME_TAKEN) {
    const myConnectedPositions = countConnectedPositions(
      occupiedPositions,
      myLastPosition,
    );
    const opponentConnectedPositions = countConnectedPositions(
      occupiedPositions,
      opponentsLastPosition,
    );
    return {
      direction: Direction.Left,
      score: 1 * myConnectedPositions + 600 / opponentConnectedPositions,
    };
  }

  const results: { score: number; direction: Direction }[] = [];

  for (const direction of Object.values(Direction)) {
    const result = canGo(
      direction,
      occupiedPositions,
      myTurn ? myLastPosition : opponentsLastPosition,
    )
      ? {
          score: bestMove(
            occupiedPositions,
            myTurn
              ? nextPositionInDirection(myLastPosition, direction)
              : myLastPosition,
            myTurn
              ? opponentsLastPosition
              : nextPositionInDirection(opponentsLastPosition, direction),
            !myTurn,
            depth + 1,
          ).score,
          direction: direction,
        }
      : {
          direction: direction,
          score: myTurn ? -Infinity : Infinity,
        };
    results.push(result);
  }

  // sort results ascending
  results.sort((x, y) => x.score - y.score);

  if (depth === 0) {
    console.error(
      `took ${
        Date.now() - bestMoveStartTime
      } milliseconds to calculate bestMove`,
    );
    console.error({ movesCalculated, countConnectedPositionsCalls });
    console.error({ results });
  }
  if (myTurn) {
    // if my turn, I maximize and return highest score
    return results[results.length - 1];
  } else {
    // if opponents turn, he minimizes and return lowest score
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
      occupiedPositions[positionHash({ x: x0, y: y0 })] = true;
    }
    globalPlayerPaths[i].push({ x, y });
    occupiedPositions[positionHash({ x, y })] = true;
  }

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  const result = bestMove(
    occupiedPositions,
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
