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

let currentDirection: Direction = Direction.Left;
const playerPaths: { x1: number; y1: number }[][] = [];

const savePlayerPath = (playerIndex: number, x1: number, y1: number) => {
  playerPaths[playerIndex] = [...(playerPaths[playerIndex] || []), { x1, y1 }];
};
const isFreeSquare = (x: number, y: number) => {
  console.error('isFreeSquare', x, y);
  if (x > 29) return false;
  if (y > 19) return false;
  if (x < 0) return false;
  if (y < 0) return false;
  if (
    playerPaths.some((path) => path.some(({ x1, y1 }) => x === x1 && y === y1))
  )
    return false;
  return true;
};

const canGoUp = (
  currentPosition: { x1: number; y1: number },
  direction: Direction,
) => {
  console.error('canGoUp');
  if (direction === Direction.Down) return false;
  if (!isFreeSquare(currentPosition.x1, currentPosition.y1 - 1)) return false;

  return true;
};

const canGoDown = (
  currentPosition: { x1: number; y1: number },
  direction: Direction,
) => {
  console.error('canGoDown');
  if (direction === Direction.Up) return false;
  if (!isFreeSquare(currentPosition.x1, currentPosition.y1 + 1)) return false;

  return true;
};

const canGoLeft = (
  currentPosition: { x1: number; y1: number },
  direction: Direction,
) => {
  console.error('canGoLeft');
  if (direction === Direction.Right) return false;
  if (!isFreeSquare(currentPosition.x1 - 1, currentPosition.y1)) return false;

  return true;
};

const canGoRight = (
  currentPosition: { x1: number; y1: number },
  direction: Direction,
) => {
  console.error('canGoRight');
  if (direction === Direction.Left) return false;
  if (!isFreeSquare(currentPosition.x1 + 1, currentPosition.y1)) return false;

  return true;
};

// game loop
while (true) {
  var inputs: string[] = readline().split(' ');
  const N: number = parseInt(inputs[0]); // total number of players (2 to 4).
  const P: number = parseInt(inputs[1]); // your player number (0 to 3).
  const playerPositions = [];
  for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    const x0: number = parseInt(inputs[0]); // starting X coordinate of lightcycle (or -1)
    const y0: number = parseInt(inputs[1]); // starting Y coordinate of lightcycle (or -1)
    const x1: number = parseInt(inputs[2]); // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
    const y1: number = parseInt(inputs[3]); // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
    playerPositions.push({ x0, y0, x1, y1 });
    savePlayerPath(i, x1, y1);
  }

  const me = playerPositions[P];

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');
  console.error({ me });
  // console.error(JSON.stringify({ playerPaths }, null, 2));

  if (canGoRight(me, currentDirection)) {
    currentDirection = Direction.Right;
  } else if (canGoLeft(me, currentDirection)) {
    currentDirection = Direction.Left;
  } else if (canGoUp(me, currentDirection)) {
    currentDirection = Direction.Up;
  } else if (canGoDown(me, currentDirection)) {
    currentDirection = Direction.Down;
  }

  console.log(currentDirection);
}
