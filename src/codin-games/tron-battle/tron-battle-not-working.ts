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

const MAX_POSITIONS_DEPTH = 20;
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
  if (depth === MAX_POSITIONS_DEPTH) {
    return 0;
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

const mapPlayerConnectedPositions = (
  playerPaths: Position[][],
  occupiedPositions: Record<string, true>,
) =>
  playerPaths.map((_path, playerIndex) =>
    countConnectedPositions(
      occupiedPositions,
      lastPositionOfPlayer(playerPaths, playerIndex),
    ),
  );

const MAX_DEPTH = 4;

let movesCalculated = 0;
let endingMovesCalculated = 0;
let bestMoveStartTime = 0;
const bestMove = (
  occupiedPositions: Record<string, true>,
  playerPaths: Position[][],
  playerTurn: number,
  depth: number = 0,
): { direction: Direction; score: number[] } => {
  if (depth === 0) {
    movesCalculated = 0;
    countConnectedPositionsCalls = 0;
    bestMoveStartTime = Date.now();
    endingMovesCalculated = 0;
  }
  movesCalculated++;

  const newOccupiedPositions: Record<string, true> = {
    ...occupiedPositions,
  };
  for (let playerIndex = 0; playerIndex < playerPaths.length; playerIndex++) {
    newOccupiedPositions[
      positionHash(lastPositionOfPlayer(playerPaths, playerIndex))
    ] = true;
  }

  if (depth === MAX_DEPTH) {
    endingMovesCalculated++;

    return {
      direction: Direction.Left,
      score: mapPlayerConnectedPositions(playerPaths, newOccupiedPositions),
      // only for debugging purposes
      _depth: depth,
    } as { direction: Direction; score: number[] };
  }

  const results: { score: number[]; direction: Direction }[] = [];

  const currentPlayerPosition = lastPositionOfPlayer(playerPaths, playerTurn);
  for (const direction of Object.values(Direction)) {
    const nextPosition = nextPositionInDirection(
      currentPlayerPosition,
      direction,
    );
    const newPlayerPaths = [...playerPaths];
    newPlayerPaths[playerTurn] = [...newPlayerPaths[playerTurn], nextPosition];
    const nextPlayerTurn =
      playerTurn + 1 === playerPaths.length ? 0 : playerTurn + 1;

    let result;
    if (canGo(direction, newOccupiedPositions, currentPlayerPosition)) {
      result = {
        ...bestMove(
          newOccupiedPositions,
          newPlayerPaths,
          nextPlayerTurn,
          depth + 1,
        ),
        direction: direction,
      };
    } else {
      result = {
        direction: direction,
        score: mapPlayerConnectedPositions(newPlayerPaths, occupiedPositions),
        // only for debugging purposes
        _depth: depth,
      } as { score: number[]; direction: Direction };
      result.score[playerTurn] = 0;
    }
    results.push(result);
  }

  // for now we'll only consider the connected positions for the current player, without worrying if anybody else dies
  // sort results descending
  results.sort((x, y) => y.score[playerTurn] - x.score[playerTurn]);

  if (depth === 0) {
    console.error(
      `took ${
        Date.now() - bestMoveStartTime
      } milliseconds to calculate bestMove`,
    );
    console.error({
      movesCalculated,
      countConnectedPositionsCalls,
      endingMovesCalculated,
    });
    console.error(JSON.stringify(results, null, 2));
  }

  return results[0];
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

  const result = bestMove(occupiedPositions, globalPlayerPaths, myIndex);
  console.error({ result });

  console.log(result.direction);
}
